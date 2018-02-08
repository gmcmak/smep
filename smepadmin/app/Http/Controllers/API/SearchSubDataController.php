<?php

namespace App\Http\Controllers\API;

use App\Explore as Explore;
use App\Consumer;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;
use Route;
use DateTime;
use Elasticsearch;


class SearchSubDataController extends Controller
{
    private $client;

    public function __construct(Request $request){
        $id = $request->id;
        $token = $request->token;  
        $data = Consumer::with('modules')->where([
            ['id', '=', $id],
            ['deleted', '=', '0'],
            ['status', '=', '1']
        ])->get(['authentication_code']);
        $generatedCode = md5($data[0]->authentication_code);
        
        if($generatedCode != $token){
           return response()->json(['error'=>0]);
           exit;
        }

        $this->client = Elasticsearch\ClientBuilder::create()
                    ->setHosts(["localhost:9200"])
                    ->build();

    }


    public function index($searchText,$sortOrder,$type,$size,$from,$content_type,$content_dates,$from_date,$to_date,$as_q_1,$as_q_2,$as_ty_1,$as_ty_2,$as_op,$id,$token){
        
        if($searchText != ' '){
            $q = $searchText;
        }else{
            $q = '';
        }
        $sortOrder = $sortOrder;
        $type = $type;
        $from = $from;
        $size = $size;
        $_GET['as_q_1'] = $as_q_1;
        $_GET['as_ty_1'] = $as_ty_1;
        $_GET['as_q_2'] = $as_q_2;
        $_GET['as_ty_2'] = $as_ty_2;
        $_GET['as_op'] = $as_op;
        $_GET['content_type'] = $content_type;
        $_GET['content_dates'] = $content_dates;
        $_GET['from_date'] = $from_date;
        $_GET['to_date'] = $to_date;

        $orderBy = "";
        if($sortOrder == 'n'){
            $orderBy = 'desc';
        }
        if($sortOrder == 'o'){
            $orderBy = 'asc';
        }

        
        $content_type = NULL;
        if(isset($_GET['content_type'])){
            if($_GET['content_type'] != "null" && $_GET['content_type'] != "" && $_GET['content_type'] != " "){
                $content_type = $_GET['content_type'];
            }
        }

       
        $content_dates = NULL;
        $fromAndToActive = 0;
        $advancedSearch = 0;
        $as_q_1 = "";
        $as_ty_1 = "";
        $as_q_2 = "";
        $as_ty_2 = "";
        $as_op = "";
        if(isset($_GET['content_dates'])){
            if($_GET['content_dates'] != "null" && $_GET['content_dates'] != "" && $_GET['content_dates'] != " "){
                    $content_dates = $_GET['content_dates'];
                    if($content_dates == "All"){
                        $content_dates = "All";
                    }

                    if($content_dates == "Last 3 Months"){
                        $from_date = date('Y-m-d');

                        $datetime = Datetime::createFromFormat('Y-m-d', $content_dates);
                        $datetime->modify('-3 months');                
                        $to_date = $datetime->format('Y-m-d');
                    }
                    if($content_dates == "Last 6 Months"){
                        $from_date = date('Y-m-d');

                        $datetime = Datetime::createFromFormat('Y-m-d', $content_dates);
                        $datetime->modify('-6 months');                
                        $to_date = $datetime->format('Y-m-d');
                    }            
                    if($content_dates == "All"){
                        $content_dates = "All";
                    }              
                    $toDateQuery = "";          
                    if($content_dates == 0){
                        $fromAndToActive = 1;
                    }

                    $advancedSearch = 1;
                    //advanced search query expload
                    $as_q_1 = $_GET['as_q_1'];
                    $as_ty_1 = $_GET['as_ty_1'];
                    $as_q_2 = $_GET['as_q_2'];
                    $as_ty_2 = $_GET['as_ty_2'];

                    $queryPart2 = "";
                    if($as_ty_2 == 'null'){
                        $queryPart2="";
                    }else{
                        if($as_q_2 != 'null'){
                            $queryPart2= $as_ty_2.":".$as_q_2;
                        }
                    }

                    $as_op = $_GET['as_op'];
                    if($as_op == 'null'){
                        $as_op = "";
                    }
                    $contentMerge = "";
                    if($content_type == "All"){
                        $contentMerge = "content_type:'Book' OR content_type:'Case Study' OR content_type:'Article'";
                    }        
                    if($content_type == "Book"){
                        $contentMerge = "content_type:'Book'";
                    }  
                    if($content_type == "Case Study"){
                        $contentMerge = "content_type:'Case Study'";
                    }  
                    if($content_type == "Article"){
                        $contentMerge = "content_type:'Article'";
                    }                                          
            }
        }

        if($fromAndToActive == 1){
            
            $from_date = NULL;
            if(isset($_GET['from_date'])){
                if($_GET['from_date'] != "null" && $_GET['from_date'] != "" && $_GET['from_date'] != " "){
                    $from_date = $_GET['from_date'];
                }
            }
            
            $to_date = NULL;
            if(isset($_GET['to_date'])){
                if($_GET['to_date'] != "null" && $_GET['to_date'] != "" && $_GET['to_date'] != " "){
                    $to_date = $_GET['to_date'];
                }
            }
        }



        if(isset($q)){


            $params = array();
            $params['index'] = 'smart';
            $params['type']  = $type;
            $params['size'] = $size;
            $params['from']  = $from; 

            $params['body']['query']['query_string'] = array(
                "query"=> "(url:$q OR title:$q OR description:$q OR keywords:$q OR content_type:$q OR author:$q)"
            );        

            if(isset($_GET['content_type'])){
                if($_GET['content_type'] != "null" && $_GET['content_type'] != "" && $_GET['content_type'] != " "){
                    $params['body'] = array();
                    $params['body']['query']['query_string'] = array(
                        "query"=> "(url:$q OR title:$q OR description:$q OR keywords:$q OR author:$q) AND (content_type:$content_type)"
                    );              
                }
            }

            if($advancedSearch == 1){
                if($content_dates != "All"){
                    $contentDateQuery = "AND publishedDate:[$from_date TO $to_date]";
                }else{
                    $contentDateQuery = "";
                }
                $params['body'] = array();
                $params['body']['query']['query_string'] = array(
                    "query"=> "($as_ty_1:$as_q_1 $as_op $queryPart2) AND ($contentMerge) $contentDateQuery"
                );   
            }


            if($orderBy != ""){
                $params['sort']= 'publishedDate:'.$orderBy;
            }
            

        // echo "<pre>";
        // print_r($params);
        // echo "</pre>";

            $query = $this->client->search($params);

        }


        echo json_encode($query);
    }


    public function relatedSearch($searchText){
        $data = array(
            'How to '.$searchText, 
            'Images '.$searchText, 
            'Define '.$searchText,
            'News '.$searchText,
            'Videos '.$searchText
        );
        echo json_encode($data);        
    }

    /**
    *
    */
    public function getExplore($id, $token, $language){
        $language = $language."_tag";
        $explore = Explore::where([
            ['deleted', '=', '0'],
            ['status', '=', '1'],
            ['parent_id', '=', '0'],
        ])->get(['id','parent_id',$language]);

       $mainMenu = array(); 
       foreach($explore as $item){
            $mainMenuItem = $item[$language];
            $exploreSub = Explore::where([
                ['deleted', '=', '0'],
                ['status', '=', '1'],
                ['parent_id', '=', $item['id']],
            ])->get(['id','parent_id',$language]);
               
            $subMenus = array();
            foreach($exploreSub as $subItem){
                $subMenus[] = $subItem[$language];
            }   
            $subMenusItems = $subMenus;
            $mainMenu[] = array(
                    'mainMenu' => $mainMenuItem,
                    'subMenu' => $subMenusItems
                );      
       } 

       return json_encode($mainMenu);

    }

    public function insertSocialLoginData($socialId,$mediaType,$socialEmail){
        DB::table('sm_front_social_authentication')->insert(
            array(
                    'social_id' => $socialId,
                    'media' => $mediaType,
                    'email' => $socialEmail
                )
        );        
    }

    public function insertSocialUserKeywords($socialId, $keyword){
        DB::table('sm_front_user_keywords')->insert(
            array(
                    'social_id' => $socialId,
                    'keyword' => $keyword
                )
        );  
    }

    public function getSocialUserKeywords($socialId){
        $results = DB::table('sm_front_user_keywords')->where('social_id', $socialId)->orderBy('user_keyword_id', 'desc')->skip(0)->take(10)->get();
        $data = array();
        foreach($results as $row){
            $data[]=$row->keyword;
        }
        $data = array_unique($data);
        echo json_encode($data);
    }

    public function updateRatings($rate,$recordId,$type){
        $params = array();
        $params['index'] = 'smart';
        $params['type']  = $type;

        $params['body']['query']['query_string'] = array(
            "query"=> "(id:$recordId)"
        );        

        $query = $this->client->search($params);

        $currentRate = $query['hits']['hits'][0]['_source']['rate'];
        $currentRatedBy = $query['hits']['hits'][0]['_source']['ratedBy'];

        $updatedRate = $currentRate*$currentRatedBy;
        $updatedRate = $updatedRate+$rate;
        $updatedRate = $updatedRate/($currentRatedBy+1);
        $updatedRate = floor($updatedRate);

        // update rate
        $indexed = $this->client->update([
            'index'=>'smart',
            'type'=> $type,
            'id'=> $recordId,
            'body'=> [
                'doc' => [
                'rate'=>$updatedRate,
                'ratedBy'=>$currentRatedBy+1
                ]
            ]
        ]);
    }

}