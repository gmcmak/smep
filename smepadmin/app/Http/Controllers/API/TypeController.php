<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Type;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Validation\Rule;
use Validator;

class TypeController extends Controller
{
    //get type details
    public function getType(){
    	$table = new Type();
    	$data = DB::table('types')->get();
    	return response()->json(['success'=>$data]);
    }

    //insert type details
    public function insertType(Request $request){
    	$validator = Validator::make($request->all(), [
    		'name' => 'required',
    		'description' => 'required',
            'elastic_name' => 'required'
    	]);

    	if($validator->fails()){
    		return response()->json(['success'=>'Validation Error', 'error'=>1]);
    	}

    	else{
    		$table = new Type();
    		$table->name = $request->input('name');
    		$table->description = $request->input('description');
            $table->elastic_name = $request->input('elastic_name');
    		$table->created_at = now();
    		$table->updated_at = now();
    		$table->save();

    		if($table->save()){
    			return response()->json(['success'=>'Successfully inserted', 'error'=>0]);
    		}
    		else{
    			return response()->json(['success'=>'Error occured', 'error'=>1]);
    		}
    	}
    }

    //get type details for update
    public function editType($id){
    	$table = new Type();
    	$editData = DB::table('types')->where(['id'=>$id])->get();
    	return response()->json(['success'=>$editData]);
    }

    //update type details
    public function updateType(Request $request, $id){
    	$validator = Validator::make($request->all(), [
    		'name' => 'required',
    		'description' => 'required',
            'elastic_name' => 'required'
    	]);

    	if($validator->fails()){
    		return response()->json(['success'=>'Validation Error', 'error'=>1]);
    	}

    	else{
    		
    		try{

    			$update = [
    			'name' => $request->input('name'),
    			'description' => $request->input('description'),
                'elastic_name' => $request->input('elastic_name'),
    			'updated_at' => now()
    			];

    			$updateType = DB::table('types')->where(['id'=>$id])->update($update);
    			return response()->json(['success'=>'Successfully updated', 'error'=>0]);
    		}
    		catch(\Illuminate\Database\QueryException $ex){
    			return response()->json(['success'=>'Error occured', 'error'=>1]);
    		}
    	}
    }
}
