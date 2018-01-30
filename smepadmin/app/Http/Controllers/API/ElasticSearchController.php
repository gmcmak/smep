<?php

namespace App\Http\Controllers\API;

use App\Explore as Explore;
use App\Content;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;
use Route;
use DateTime;


class ElasticSearchController extends Controller
{
    /**
     *  Push data to elastic search
     */
    public function index(){
    	$content_data = Content::with('keyword','category','explore', 'type', 'author')->where(['status'=>1])->get();

        foreach($content_data as $row){

           echo "<br/>";
           echo "--------------------";
           echo "<br/>"; 
           echo $row->type->elastic_name;
           echo "<br/>";           
           echo $row->title;
           echo "<br/>";
           echo $row->description;
           echo "<br/>"; 
           echo $row->id;
           echo "<br/>";
           echo $row->url;
           echo "<br/>";
           echo $row->video_url;
           echo "<br/>";
           //echo $row->freeform_keyword;
           //echo "<br/>";
           $keywords = ""; 
           foreach($row->keyword as $key){
                $keywords .= $key->en_name.", ";
                $keywords .= $key->si_name.", ";
                $keywords .= $key->ta_name.", ";
           }  
           echo $keywords."".$row->freeform_keyword;
           echo "<br/>";           
           $categories = ""; 
           foreach($row->category as $cat){
                $categories .= $cat->en_name.", ";
                $categories .= $cat->si_name.", ";
                $categories .= $cat->ta_name.", ";
           }  
           echo $categories;
           echo "<br/>";
           $authors = "";
           foreach($row->author as $au){
                $authors .= $au->en_name.", ";
                $authors .= $au->si_name.", ";
                $authors .= $au->ta_name.", ";            
           }
           echo $authors;
           echo "<br/>";    
           $dt = new DateTime($row->created_at);
           $date = $dt->format('Y-m-d'); 
           echo $date;                  

        }


        // $params = array();
        // $params['index'] = 'smart';
        // $params['type']  = $type;
        // $params['size'] = $size;
        // $params['from']  = $from; 

        // $params['body']['query']['query_string'] = array(
        //     "query"=> "(url:$q OR title:$q OR description:$q OR keywords:$q OR content_type:$q OR author:$q)"
        // );        

        // if(isset($_GET['content_type'])){
        //     if($_GET['content_type'] != "null" && $_GET['content_type'] != "" && $_GET['content_type'] != " "){
        //         $params['body'] = array();
        //         $params['body']['query']['query_string'] = array(
        //             "query"=> "(url:$q OR title:$q OR description:$q OR keywords:$q OR author:$q) AND (content_type:$content_type)"
        //         );              
        //     }
        // }



    	//return response()->json(['success'=>$content_data]);
    }
}


// {
//     "_index": "smart",
//     "_type": "all",
//     "_id": "4",
//     "_version": 9,
//     "found": true,
//     "_source": {
//         "id": "4",
//         "url": "https://www.pwc.lk/academy/",
//         "title": "PwC's Academy",
//         "description": "PwC Srilanka's training academy provides international level corporate coaching \r\n\t\t\t\tand training courses on strategic planning, leadership, and business strategy. We have been developing our own people for over 100 years and our ability to recruit, retain and grow talent has made us one of the largest and most successful professional services firms in the world.\r\nIt is this deep experience of developing young professionals right through to successful business leaders that is built into all PwC’s Academy programmes. ",
//         "keywords": "academy, sri lanka, training",
//         "content_type": "Book",
//         "author": "M A Silva",
//         "rate": 2,
//         "ratedBy": 12,
//         "datePublished": "2017-04-15'T'09:15:10",
//         "publishedDate": "2017-04-15"
//     }
// }