<?php

namespace App\Http\Controllers\API;
use App\Module;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Validator;

class ModuleController extends Controller
{
    public $successStatus = 200;

    /**
     * add module
     * @param  array $request post data
     * @return 1 or errors
     */
    public function addModule(Request $request){
      $validator = Validator::make($request->all(), [
        'moduleName' => 'required'
      ]);

      if($validator->fails()){
        return response()->json(['error'=>$validator->errors()], 401);
      }
      else{
        $table = new Module();
        $table->module_name = $request->input('moduleName');
        $table->save();

        if($table->save()){
          return response()->json(['success'=>'Successfully inserted']);
        }
        else{
          return response()->json(['error'=>'Error occured']);
        }
      }
    }

    /*
    * view module details
    */
    public function viewModule(){
      $data = DB::table('modules')->get();
      if($data){
        return response()->json(['success'=>$data]);
      }
      else{
        return response()->json(['error'=>'Error occured']);
      }
    }

    /**
     * @param id
     * Get module data for update
     */
    public function getModule($id){

      $data = DB::table('modules')->where('id', [$id])->get();
      if($data){
        return response()->json(['success'=>$data]);
      }
      else{
        return response()->json(['error'=>'Error occured']);
      }
    }

    /**
     * Module update request
     * @param  array $request post data and id
     * @return 1 or errors
     */
    public function updateModule(Request $request, $id){
      $validator = Validator::make($request->all(), [
        'moduleName' => 'required'
      ]);

      if($validator->fails()){
        return response()->json(['error'=>$validator->errors()], 401);
      }
      else{
        try{

            $update = [
              'module_name' => $request->input('moduleName'),
              'updated_at' => now()
            ];

            $data = DB::table('modules')->whereIn('id', [$id])->update($update);

            return response()->json(['success'=>'Successfully updated']);
        }
        catch(\Illuminate\Database\QueryException $ex){
            return response()->json($ex->getMessage());
        }
      }
    }

    /**
     * @param array $request post data and id
     * @return delete status
     */
    public function deleteModule($id){

        $data = DB::table('modules')->WHERE('id', $id)->delete();

        if($data){
          return response()->json(['success'=>'Successfully deleted']);
        }
        else{
          return response()->json(['error'=>'Error occured']);
        }
    }
}
