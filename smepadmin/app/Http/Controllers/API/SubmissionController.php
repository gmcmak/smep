<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Submission;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;

class SubmissionController extends Controller
{
    /**
    * add submissions
    */
    public function addSubmission(Request $request){
    	$validator = Validator::make($request->all(), [
    		'user_id' => 'required',
    		'name' => 'required',
    		'url' => 'required|url',
    		'level' => 'required|boolean',
    		'status' => 'required|boolean'
    	]);

    	if($validator->fails()){
    		return response()->json(['error'=>$validator->error()], 401);
    	}

    	else{
    		$table = new Submission();
    		$table->user_id = $request->input('user_id');
    		$table->name = $request->input('name');
    		$table->url = $request->input('url');
    		$table->level = $request->input('level');
    		$table->status = $request->input('status');
    		$table->created_at = now();
    		$table->updated_at = now();
    		$table->save();

    		if($table->save()){
    			return response()->json(['success'=>'Successfully added', 'error'=>0]);
    		}
    		else{
    			return response()->json(['success'=>'Error occured', 'error'=>1]);
    		}
    	}
    }

    /**
    * view submissions
    */
    public function viewSubmission($user_id){
    	$table = new Submission();
    	$data = DB::table('submissions')->where(['user_id'=>$user_id])->get();
    	if($data){
    		return response()->json(['success'=>$data]);
    	}
    	else{
    		return response()->json(['error'=>'Error occured']);
    	}
    }

    /**
    * update submission
    */
    public function updateSubmission(request $request, $id, $user_id){
    	$validator = Validator::make($request->all(), [
    		'name' => 'required'
    	]);
    	if($validator->fails()){
    		return response()->json(['error'=>$validator->error(), 'error'=>1], 401);
    	}
    	else{
    		try{
    			$table = new Submission();
    			$update = array(
    				'name'=>$request->input('name'),
    				'updated_at'=>now()
    			);
    			$data = DB::table('submissions')->where(['id'=>$id,'user_id'=>$user_id])->update($update);
    			return response()->json(['success'=>'Successfully updated', 'error'=>0]);
    		}
    		catch(\Illuminate\Database\QueryException $ex){
        		return response()->json(['success'=>'Error occured', 'error'=>1]);
      		}
    	}
    }
   }
