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