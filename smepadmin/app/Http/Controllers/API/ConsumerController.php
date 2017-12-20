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
      $modules = $request->input('modules');
      return response()->json(['success'=>$modules[0]]);
      // $validator = Validator::make($request->all(), [
      //   'name' => 'required',
      //   'url' => 'required|url',
      //   'status' => 'required'
      // ]);

      // if($validator->fails()){
      //   return response()->json(['error'=>$validator->errors()], 401);
      // }
      // else{
      //   $name = $request->input('name');
      //   $url = $request->input('url');
      //   $status = $request->input('status');
      //   $authentication = md5($name.$url.time());
      //   //$modules = array(3,5,6); //array for take the permission list
      //   $modules = $request->input('module');

      //   $table = new Consumer();
      //   $table->name = $name;
      //   $table->url = $url;
      //   $table->authentication_code = $authentication;
      //   $table->status = $status;
      //   $table->save();
      //   if($table->save()){
      //     $data = $table->modules()->attach($modules);
      //       return response()->json(['success'=>'Successfully inserted']);
      //   }
      //   else{
      //     return response()->json(['error'=>'Error occured']);
      //   }
      // }
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
        return response()->json($data);
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
            'status' => $request->input('status')
            ];

          $table = new Consumer();
          $modules = array(6);

          $updateCon = DB::table('consumers')->whereIn('id', [$id])->update($update);

          $consumer = Consumer::find($id);
          $consumer->modules()->detach();
          $table->id = $id;
          $updateModules = $table->modules()->attach($modules);
          return response()->json(['success'=>'Successfully updated']);
        }
        catch(\Illuminate\Database\QueryException $ex){
            return response()->json($ex->getMessage());
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
        return response()->json(['success'=>'Deleted successfully']);
      }
      else{
        return reponse()->json(['error'=>'Error']);
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
          return response()->json(['success'=>'Succesfully enabled']);
        }
        else{
          return response()->json(['success'=>'Successfully disabled']);
        }
      }
      else{
        return response()->json(['error'=>'Error']);
      }
    }
}
