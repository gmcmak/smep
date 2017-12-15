<?php

namespace App\Http\Controllers\API;
use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;

class CategoryController extends Controller
{
    public $successStatus = 200;

    /**
    * @param array $request post data
    * @return 0 or 1
    */
    public function insertCategory(Request $request){
      $validator = Validator::make($request->all(), [
        'en_name' => 'required',
        'si_name' => 'required',
        'ta_name' => 'required',
        'status' => 'required|boolean'
      ]);
      if($validator->fails()){
        return response()->json(['error'=>$request->errors()], 401);
      }
      else{
        $table = new Category();
        $table->en_name = $request->input('en_name');
        $table->si_name = $request->input('si_name');
        $table->ta_name = $request->input('ta_name');
        $table->status = $request->input('status');
        $table->save();
        if($table->save()){
          return response()->json(['success'=>'Successfully inserted']);
        }
        else{
          return response()->json(['error'=>'Error occured']);
        }
      }
    }

    /**
    * @return data set or 0
    */
    public function viewCategory(){
      $table = new Category();
      $data = DB::table('categories')->where('deleted', 0)->get();
      if($data){
        return response()->json(['success'=>$data]);
      }
      else{
        return response()->json(['error'=>'Error occured']);
      }
    }

    /**
    * @param id
    * @return data set or 0
    */
    public function editCategory($id){
      $data = DB::table('categories')->where('id', [$id])->get();
      if($data){
        return response()->json($data);
      }
      else{
        return response()->json(['error'=>'Error occured']);
      }
    }

    /**
    * @param array and id
    * return message
    */
    public function updateCategory(Request $request, $id){
      $validator = Validator::make($request->all(), [
        'en_name' => 'required',
        'si_name' => 'required',
        'ta_name' => 'required',
        'status' => 'required|boolean'
      ]);

      if($validator->fails()){
        return response()->json(['error'=>$validator->errors()], 401);
      }
      else{
        try{

          $update = [
          'en_name' => $request->input('en_name'),
          'si_name' => $request->input('si_name'),
          'ta_name' => $request->input('ta_name'),
          'status' => $request->input('status'),
          'updated_at' => now()
          ];

          $data = DB::table('categories')->whereIn('id', [$id])->update($update);
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
    public function deleteCategory($id){
      $update = ['deleted'=>1];
      $data = DB::table('categories')->whereIn('id', [$id])->update($update);
      if($data){
        return response()->json(['success'=>'Successfully deleted']);
      }
      else{
        return response()->json(['error'=>'Error occured']);
      }
    }

    /**
    * @param id and status
    * @return message
    */
    public function statusCategory($id, $status){

      $update = [
        'status' => $status
      ];
      $data = DB::table('categories')->where('id', [$id])->update($update);
      if($data){
        if($status == 1){
          return response()->json(['success'=>'Successfully enabled']);
        }
        else{
          return response()->json(['success'=>'successfully disabled']);
        }
      }
      else{
        return response()->json(['error'=>'Error occured']);
      }
    }
}
