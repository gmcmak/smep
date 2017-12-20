<?php

namespace App\Http\Controllers\API;
use App\Author;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;

class AuthorController extends Controller
{
    public $successStatus = 200;

    /**
    * @param array $request post data
    * @return message
    */
    public function insertAuthor(Request $request){
      $validator = Validator::make($request->all(), [
        'en_name' => 'required',
        'si_name' => 'required',
        'ta_name' => 'required'
      ]);

      if($validator->fails()){
        return response()->json(['error'=>$validator->errors()], 401);
      }
      else{
        $table = new Author();
        $table->en_name = $request->input('en_name');
        $table->si_name = $request->input('si_name');
        $table->ta_name = $request->input('ta_name');
        $table->created_at = now();
        $table->updated_at = now();
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
    *
    * @return data set or error message
    */
    public function viewAuthor(){
      $table = new Author();
      $data = DB::table('authors')->get();
      if($data){
        return response()->json(['success'=>$data]);
      }
      else{
        return response()->json(['error'=>'Error occured']);
      }

    }

    /**
    * @param id
    * @return data set or error message
    */
    public function editAuthor($id){
      $data = DB::table('authors')->where('id', [$id])->get();
      if($data){
        return response()->json(['success'=>$data]);
      }
      else{
        return response()->json(['error'=>'Error occured']);
      }
    }

    /**
    * @param array $request post data and id
    * @return 0 or 1
    */
    public function updateAuthor(Request $request, $id){
      $validator = Validator::make($request->all(), [
        'en_name' => 'required',
        'si_name' => 'required',
        'ta_name' => 'required'
      ]);
      if($validator->fails()){
        return response()->json(['error'=>$validator->errors()], 401);
      }
      try{
        $en_name = $request->input('en_name');
        $si_name = $request->input('si_name');
        $ta_name = $request->input('ta_name');
        $update = [
          'en_name' => $en_name,
          'si_name' => $si_name,
          'ta_name' => $ta_name
        ];
        $data = DB::table('authors')->whereIn('id', [$id])->update($update);
        return response()->json(['success'=>'Successfully updated']);
      }
      catch(\Illuminate\Database\QueryException $ex){
        return response()->json($ex->getMessage());
      }
    }

    /**
    * @param id
    * @return 0 or 1
    */
    public function deleteAuthor($id){

      $data = DB::table('authors')->whereIn('id', [$id])->delete();

      if($data){
        return response()->json(['success'=>'Successfully deleted']);
      }
      else{
        return response()->json(['error'=>'Error ocuured']);
      }
    }
}
