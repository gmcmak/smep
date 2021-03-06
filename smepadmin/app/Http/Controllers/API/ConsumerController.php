<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Consumer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;

class ConsumerController extends Controller
{
    public function index(){
        $consumer = Consumer::with('modules')->where('deleted', [0])->get();
        return response()->json(['success'=>$consumer]);
    }

    /**
    * @param array $request post data
    * @return message
    */
    public function insertConsumer(Request $request){
      // $modules = $request->input('modules');
      // $moduleArray = explode(",",$modules);
      // return response()->json(['success'=>$moduleArray[1]]);

      $validator = Validator::make($request->all(), [
        'name' => 'required',
        'url' => 'required|url',
        'status' => 'required|boolean'
      ]);

      if($validator->fails()){
        return response()->json(['error'=>$validator->errors()], 401);
      }
      else{
        $name = $request->input('name');
        $url = $request->input('url');
        $authentication = md5($name.$url.time());
        $modules = $request->input('modules');
        $moduleArray = explode(",",$modules);
        $status = $request->input('status');
        //$modules = array(3,5,6); //array for take the permission list

        $table = new Consumer();
        $table->name = $name;
        $table->url = $url;
        $table->authentication_code = $authentication;
        $table->status = $status;
        $table->save();
        if($table->save()){
          $data = $table->modules()->attach($moduleArray);
            return response()->json(['success'=>'Successfully inserted', 'error'=>0]);
        }
        else{
          return response()->json(['success'=>'Error occured', 'error'=>1]);
        }
      }
    }

    /**
    * view consumer details
    */
    public function viewConsumer(){
      $data = DB::table('consumers')->where('deleted', 0)->get();
      if($data){
        return response()->json($data);
      }
      else{
        return response()->json(['error'=>'Error']);
      }
    }

    /**
    * @param id
    * @return data set or message
    */
    public function editConsumer($id){
      $data = Consumer::with('modules')->where('id', [$id])->get();
      if($data){
        return response()->json(['success'=>$data]);
      }
      else{
        return response()->json(['error'=>'Error']);
      }
    }

    /**
    * @param array $request post data and id
    * @return message
    */
    public function updateConsumer(Request $request, $id){
      $validator = Validator::make($request->all(), [
        'name' => 'required',
        'url' => 'required|url',
        'status' => 'required'
      ]);

      if($validator->fails()){
        return response()->json(['error'=>$validator->errors()], 401);
      }
      else{
        try{

            $update = [
            'name' => $request->input('name'),
            'url' => $request->input('url'),
            'status' => $request->input('status'),
            'updated_at' => now()
            ];

          $table = new Consumer();
          $modules = $request->input('modules');
          $moduleArray = explode(",",$modules);
          //$modules = array(6);

          $updateCon = DB::table('consumers')->whereIn('id', [$id])->update($update);

          $consumer = Consumer::find($id);
          $consumer->modules()->detach();
          $table->id = $id;
          $updateModules = $table->modules()->attach($moduleArray);
          return response()->json(['success'=>'Successfully updated', 'error'=>0]);
        }
        catch(\Illuminate\Database\QueryException $ex){
            return response()->json(['success'=>'Error occured', 'error'=>1]);
        }
      }
    }

    /**
    * @param id
    * @return message
    */
    public function deleteConsumer($id){
      $update = ['deleted' => 1];
      $data = DB::table('consumers')->where('id', [$id])->update($update);
      if($data){
        $consumer = Consumer::find($id);
        $consumer->modules()->detach();
        return response()->json(['success'=>'Deleted successfully', 'error'=>0]);
      }
      else{
        return reponse()->json(['success'=>'Error occured', 'error'=>1]);
      }
    }

    /**
    * @param id and status
    * @return message
    */
    public function statusConsumer($id, $status){
      $update = ['status'=>$status];
      $data = DB::table('consumers')->whereIn('id', [$id])->update($update);
      if($data){
        if($status == 1){
          return response()->json(['success'=>'Succesfully enabled', 'error'=>0]);
        }
        else{
          return response()->json(['success'=>'Successfully disabled', 'error'=>0]);
        }
      }
      else{
        return response()->json(['success'=>'Error occued', 'error'=>1]);
      }
    }
}
