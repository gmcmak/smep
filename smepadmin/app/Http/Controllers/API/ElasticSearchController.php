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
use Elasticsearch;



class ElasticSearchController extends Controller
{
    /**
     *  Push data to elastic search
     */
    public function index(){
    	$content_data = Content::with('keyword','category','explore', 'type', 'author')->where(['status'=>1])->get();

        $client = Elasticsearch\ClientBuilder::create()
                    ->setHosts(["localhost:9200"])
                    ->build();

        foreach($content_data as $row){

            $elasticId = $row->id+1000;
            $fullDate = str_replace(" ", "T", $row->created_at);
            $keywords = ""; 
            foreach($row->keyword as $key){
                $keywords .= $key->en_name.", ";
                $keywords .= $key->si_name.", ";
                $keywords .= $key->ta_name.", ";
            }  
            $categories = ""; 
            foreach($row->category as $cat){
                $categories .= $cat->en_name.", ";
                $categories .= $cat->si_name.", ";
                $categories .= $cat->ta_name.", ";
            }  
            $authors = "";
            foreach($row->author as $au){
                $authors .= $au->en_name.", ";
                $authors .= $au->si_name.", ";
                $authors .= $au->ta_name.", ";            
            }
            $dt = new DateTime($row->created_at);
            $date = $dt->format('Y-m-d'); 

            $params = array();
            $params['index'] = 'smart';
            $params['type']  = $row->type->elastic_name;
            $params['id']  = $elasticId;
            $params['body']  = array(
                "id"=> $elasticId,
                "url"=> $row->url,
                "title"=> $row->title,
                "video"=> $row->video_url,
                "description"=> $row->description,
                "keywords"=> $keywords."".$row->freeform_keyword,
                "content_type"=> $categories,
                "author"=> $authors,
                "rate"=> 0,
                "ratedBy"=> 0,
                "datePublished"=> $fullDate,
                "publishedDate"=> $date            
            );

            $response = $client->index($params);

       }
    }
}


