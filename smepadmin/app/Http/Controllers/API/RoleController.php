<?php

namespace App\Http\Controllers\API;
use App\Role;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;

class RoleController extends Controller
{   
    public $successStatus = 200;

    /**
     * add new role
     * @param  array $request post data
     * @return 1 or errors
     */
    public function insertRole(Request $request){
      $table = new Role();

      $validator = Validator::make($request->all(), [
           'name' => 'required',
           'status' => 'required|boolean'
       ]);

       if ($validator->fails()) {
         return response()->json(['error'=>$validator->errors()], 401);
       }
       else{
         $table->name = $request->input('name');
         $table->status = $request->input('status');
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

    /*
    * view roles' details
    */
    public function viewRoles(){
      $data = DB::table('roles')->where('deleted', 0)->get();
      if($data){
        return response()->json(['success'=>$data]);
      }
      else{
        return response()->json(['error'=>'Error occured']);
      }
      }

    /**
    * @param id
    * @return 1 or 0
    */
    public function editRole($id){
      $data = DB::table('roles')->where('id', [$id])->get();
      if($data){
        return response()->json(['success'=>$data]);
      }
      else{
        return response()->json(['error'=>'Error occured']);
      }
    }

    /**
    * @param array $request post data
    * @return 1 or 0
    */
    public function updateRole(Request $request, $id){

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'status' => 'required|boolean'
        ]);

        if($validator->fails()){
          return response()->json(['error'=>$validator->errors()], 401);
        }
        else{
          try{
            $table = new Role();

            $update = [
              'name' => $request->input('name'),
              'status' => $request->input('status'),
              'updated_at' => now()
            ];

            $data = DB::table('roles')->whereIn('id', [$id])->update($update);
            return response()->json(['success'=>'Successfully updated', 'error'=>0]);
          }
          catch(\Illuminate\Database\QueryException $ex){
            return response()->json(['success'=>'Error occured', 'error'=>1]);
          }
        }
    }

    /**
     * @param id
     * @return delete status
     */
    public function deleteRole($id){

      $update = [
        'deleted' => 1
      ];

      $data = DB::table('roles')->whereIn('id', [$id])->update($update);

      if($data){
        return response()->json(['success'=>'Successfully deleted', 'error'=>0]);
      }
      else{
        return response()->json(['success'=>'Error occured', 'error'=>1]);
      }
    }

    /**
    * @param array get data
    * @return message
    */
    public function statusRole($id, $status){
      $update = [
        'status' => $status
      ];
      $data = DB::table('roles')->where('id', $id)->update($update);
      if($data){
        if($status == 1){
          return response()->json(['success'=>'Successfully enabled', 'error'=>0]);
        }
        else{
          return response()->json(['success'=>'Successfully disabled', 'error'=>0]);
        }
      }
      else{
        return response()->json(['success'=>'Error occured', 'error'=>1]);
      }
    }

}
