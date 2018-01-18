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
    	$content_data = Content::with('keyword','category','explore')->where(['submission_id'=>$id])->get();
    	return response()->json(['success'=>$content_data]);
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

    		try{
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
	    		$category = array(1,4,5,6);
	    		$explore = array(3,5);

	    		$content_update = DB::table('contents')->where(['id'=>$id, 'submission_id'=>$submission_id])->update($content_update_data);

	    		if($content_update){
	    			$content_table_id = Content::find($id);
		    		$content_table_id->keyword()->detach();
		    		$insert_keywords = $content_table_id->keyword()->attach($keyword);
		    		$content_table_id->explore()->detach();
		    		$insert_explore = $content_table_id->explore()->attach($explore);
		    		$content_table_id->category()->detach();
		    		$insert_categories = $content_table_id->category()->attach($category);
		    		
		    		return response()->json(['success'=>'Successfully inserted', 'error'=>0]);
	    		}
	    		else{
	    			return response()->json(['success'=>'Error occured', 'error'=>1]);
	    		}
	    		
    		}
    		catch(\Illuminate\Database\QueryException $ex){
    			return response()->json(['success'=>'Error occured', 'error'=>1]);
    		}
    		
    	}
    }
}
