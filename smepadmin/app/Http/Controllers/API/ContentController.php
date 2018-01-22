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
    		//'url' => 'required|url',
    		'title' => 'required',
    		'type' => 'required',
    		'keyword' => 'required',
    		'category' => 'required',
    		'explore' => 'required'
    	]);

    	if($validator->fails()){
    		return response()->json(['success'=>'Issue of validation', 'error'=>1], 401);
    	}
    	else{

    		try{
    			$content_table = new Content();

    			if(is_null($request->input('video_url'))){
    				$videoUrl = '';
    			}
    			else{
    				$videoUrl = $request->input('video_url');
    			}

    			if(is_null($request->input('freeform_keyword'))){
    				$freeformKeyword = '';
    			}
    			else{
    				$freeformKeyword = $request->input('freeform_keyword');
    			}

    			if(is_null($request->input('description'))){
    				$description1 = '';
    			}
    			else{
    				$description1 = $request->input('description');
    			}

	    		$content_update_data = [
	    			'title' => $request->input('title'),
	    			'description' => $description1,
	    			'video_url' => $videoUrl,
	    			'type_id' => $request->input('type'),
	    			'freeform_keyword' => $freeformKeyword,
	    			'status' => $request->input('status'),
	    			'updated_at' => now()
	    		];

	    		$keyword = $request->input('keyword');
	    		$keywordArray = explode(",",$keyword);

	    		$category = $request->input('category');
	    		$categoryArray = explode(",",$category);

	    		$explore = $request->input('explore');
	    		$exploreArray = explode(",",$explore);

	    		$content_update = DB::table('contents')->where(['id'=>$id, 'submission_id'=>$submission_id])->update($content_update_data);

	    		if($content_update){
	    			$content_table_id = Content::find($id);
		    		$content_table_id->keyword()->detach();
		    		$insert_keywords = $content_table_id->keyword()->attach($keywordArray);
		    		$content_table_id->explore()->detach();
		    		$insert_explore = $content_table_id->explore()->attach($exploreArray);
		    		$content_table_id->category()->detach();
		    		$insert_categories = $content_table_id->category()->attach($categoryArray);
		    		
		    		return response()->json(['success'=>'Successfully inserted', 'error'=>0]);
	    		}
	    		else{
	    			return response()->json(['success'=>'Error occured', 'error'=>1]);
	    		}
	    		
    		}
    		catch(\Illuminate\Database\QueryException $ex){
    			return response()->json(['success'=>'Error occured1', 'error'=>1]);
    		}
    		
    	}
    }

    public function getContentAll($user_id, $type_id){
    	$content_data = Content::with(array(
    			'submission' => function($query) use ($user_id){
    				$query->where(['user_id'=> $user_id]);
    			}, 'category', 'keyword', 'explore'
    		))->where(['type_id'=>$type_id])->get();

    	return response()->json(['success'=>$content_data]);
    }

    //get content data to specific user
    public function getContentInfo($user_id, $type_id, $status_id){
    	$content_data = Content::with(array(
    			'submission' => function($query) use ($user_id){
    				$query->where(['user_id'=> $user_id]);
    			}, 'category', 'keyword', 'explore'
    		))->where(['type_id'=>$type_id, 'status'=>$status_id])->get();

    	return response()->json(['success'=>$content_data]);
    }

    //get content details count
    public function getContentCount($user_id, $type_id){
    	$content_count = Content::with(array(
    			'submission' => function($query) use ($user_id){
    				$query->where(['user_id'=> $user_id]);
    			}
    		))->where(['type_id'=>$type_id])->count();

    	return response()->json(['success'=>$content_count, 'type_id'=>$type_id]);
    }

    //get content approve,reject,pending,all count
    public function getContentAllCount($user_id, $type_id, $status_id){
    	$content_count = Content::with(array(
    			'submission' => function($query) use ($user_id){
    				$query->where(['user_id'=> $user_id]);
    			}
    		))->where(['type_id'=>$type_id, 'status'=>$status_id])->count();

    	return response()->json(['success'=>$content_count, 'type_id'=>$type_id]);
    }

}
