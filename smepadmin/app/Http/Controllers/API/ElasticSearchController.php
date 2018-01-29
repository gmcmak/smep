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



class ElasticSearchController extends Controller
{
    public function index(){
    	$content_data = Content::with('keyword','category','explore', 'type')->where(['status'=>1])->get();

        foreach($content_data as $row){
           echo $row->title;
           echo "<br/>";
           echo $row->description;

           echo $row->id;

           echo $row->url;

           echo $row->video_url;

           echo $row->freeform_keyword;

           foreach($row->keyword as $key){
                echo $key->en_name;
                echo $key->si_name;
                echo $key->ta_name;
           }  

           foreach($row->category as $cat){
                echo $cat->en_name;
                echo $cat->si_name;
                echo $cat->ta_name;
           }  

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



    	return response()->json(['success'=>$content_data]);
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