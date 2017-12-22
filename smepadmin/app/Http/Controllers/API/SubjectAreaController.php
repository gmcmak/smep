<?php

namespace App\Http\Controllers\API;

use App\Subject_area;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;

class SubjectAreaController extends Controller
{
    /**
    * @param array $request post data
    * @return message
    */
    public function insertSubjectArea(Request $request){
    	$validator = Validator::make($request->all(), [
    		'name' => 'required',
    		'description' => 'required'
    	]);

    	if($validator->fails()){
    		return response()->json(['error'=>$validator->errors()], 401);
    	}
    	else{
    		$table = new Subject_area();
    		$table->name = $request->input('name');
    		$table->description = $request->input('description');
            $table->created_at = now();
            $table->updated_at = now();
    		$table->save();
    		if($table->save()){
    			return response()->json(['success'=>'successfully inserted']);
    		}
    		else{
    			return response()->json(['error'=>'Error occured']);
    		}
    	}
    }

    /**
    * @return data
    */
    public function viewSubjectArea(){
    	$getData = DB::table('subject_areas')->get();
    	if($getData){
    		return response()->json(['success'=>$getData]);
    	}
    	else{
    		return response()->json(['error'=>'Error occured'], 401);
    	}
    }

    /**
    * @param get id
    * @return data set or message
    */
    public function editSubjectArea($id){
    	$getData = DB::table('subject_areas')->where('id', $id)->get();
    	if($getData){
    		return response()->json(['success'=>$getData]);
    	}
    	else{
    		return response()->json(['error'=>'Error occured']);
    	}
    }

    /**
    * @param array $request post data and get id
    * @return data set or message
    */
    public function updateSubjectArea(Request $request, $id){
    	$validator = Validator::make($request->all(), [
    		'name' => 'required',
    		'description' => 'required'
    	]);

    	if($validator->fails()){
    		return response()->json(['error'=>$validator->errors()], 401);
    	}
    	else{
            try{
                $update = [
                    'name' => $request->input('name'),
                    'description' => $request->input('description'),
                    'updated_at' => now()
                ];

                $updateData = DB::table('subject_areas')->whereIn('id', [$id])->update($update);
                return response()->json(['success'=>'Successfully updated']);

            }
            catch(\Illuminate\Database\QueryException $ex){
                return response()->json($ex->getMessage());
            }
    	}
    }

    /**
    * @param get id
    * @return message
    */
    public function deleteSubjectArea($id){
    	$deleteData = DB::table('subject_areas')->where('id', [$id])->delete();
    	if($deleteData){
    		return response()->json(['success'=>'Successfully deleted']);
    	}
    	else{
    		return response()->json(['error'=>'Error occured']);
    	}
    }
}
