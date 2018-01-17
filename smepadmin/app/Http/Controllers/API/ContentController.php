<?php

namespace App\Http\Controllers\API;

use App\Content;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Validation\Rule;
use Validator;

class ContentController extends Controller
{
    //get content details
    public function getContent($id){

    	$table = new Content();
    	$data = DB::table('contents')->where(['submission_id'=>$id])->get();
    	return response()->json(['success'=>$data]);
    }

    //add content details
    public function addContent(Request $request, $id,$submission_id){
    	$validator = Validator::make($request->all(), [
    		'url' => 'required|url',
    		'title' => 'required',
    		'type' => 'required',
    		// 'keyword' => 'required',
    		// 'category' => 'required',
    		// 'explore' => 'required'
    	]);

    	if($validator->fails()){
    		return response()->json(['error'=>$validator->error()], 401);
    	}
    	else{
    		$content_table = new Content();

    		$content_update_data = [
    			'title' => $request->input('title'),
    			'description' => $request->input('description'),
    			'video_url' => $request->input('video_url'),
    			'type' => $request->input('type'),
    			'freeform_keyword' => $request->input('freeform_keyword'),
    			'status' => $request->input('status'),
    			'updated_at' => now()
    		];

    		$keyword = array(1,3);
    		$category = array(1,3,4);
    		$explore = array(3,5);

    		$content_update = DB::table('contents')->where(['id'=>$id, 'submission_id'=>$submission_id])->update($content_update_data);
    		$content_table_id = Content::find($id);
    		$insert_keywords = $content_table_id->keyword()->attach($keyword);
    		$insert_explore = $content_table_id->explore()->attach($explore);
    		//$insert_categories = $content_table_id->category()->attach($category);
    		

    		return response()->json(['success'=>'Successfully inserted']);
    	}
    }
}
