<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Explore as Explore;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;

class ExploreController extends Controller
{

    public $successStatus = 200;

    public function index(){
        $explore = Explore::where([
            ['deleted', '=', '0'],
        ])->get();
        return response()->json(['success'=>$explore]);
    }

    /**
     * add explore     
     * @param  array $request post data
     * @return 1 or errors
     */ 
    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'parent_id' => 'integer',
            'en_tag' => 'required',
            'si_tag' => 'required',
            'ta_tag' => 'required',
            'status' => 'required|boolean',
            'deleted' => 'required|boolean'
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);            
        }
        else{
            $table = new Explore();
            $table->en_tag = $request->input('en_tag');
            $table->si_tag = $request->input('si_tag');
            $table->ta_tag = $request->input('ta_tag');
            $table->status = $request->input('status');
            $table->deleted = $request->input('deleted');
            $table->save();
        }
        if($table->save()){
            return response()->json(['success' => 'Successfully inserted', 'error'=>0]);
        }
        else{
            return response()->json(['success' => 'Error occured', 'error'=>1]);
        }      
    }

    /**
     * Explore update request
     * @param  array $request post data
     * @return 1 or errors
     */
    public function updateRecord($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'parent_id' => 'integer',
            'en_tag' => 'required',
            'si_tag' => 'required',
            'ta_tag' => 'required',
            'status' => 'required',
            'deleted' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);            
        }
        $input = $request->all();
        $this->update($id, $input);
        return response()->json(['success'=>'Successfully updated', 'error'=>0], $this->successStatus);  
    }

    /**
     * view a record
     */
    public function edit($id)
    {
        $explore = Explore::where([
            ['deleted', '=', '0'],
            ['id', '=', $id]
        ])->get();
        return response()->json(['success'=>$explore]);    
    } 

    /**
     * Create a new explore instance after a verify validity.
     *
     * @param  array  $data
     * @return \App\Explore
     */
    protected function create(array $data)
    {
        return Explore::create([
            'parent_id' => $data['parent_id'],
            'en_tag' => $data['en_tag'],
            'si_tag' => $data['si_tag'],
            'ta_tag' => $data['ta_tag'],
            'status' => $data['status'],
            'deleted' => $data['deleted']
        ]);
    }    

    /**
     * Update an explore instance after a verify validity.
     *
     * @param  array  $data
     * @return \App\Explore
     */
    protected function update($id, array $data)
    {
        return Explore::where('id', $id)->update([
            'parent_id' => $data['parent_id'],
            'en_tag' => $data['en_tag'],
            'si_tag' => $data['si_tag'],
            'ta_tag' => $data['ta_tag'],
            'status' => $data['status'],
            'deleted' => $data['deleted']
        ]);
    }     

    /**
     * @param id
     * @return delete status
     */
    public function delete($id){
        $explore = Explore::find($id);
        if($explore != null){
            if($explore->delete()){
                return response()->json(['success'=>'Successfully deleted', 'error'=>0], $this->successStatus);  
            }else{
                return response()->json(['success'=>'Error occured', 'error'=>1], 401);
            }
        }else{
            return response()->json(['success'=>'Error occured', 'error'=>1], 401);
        }

    }

    /**
    * @param id and status
    * @return message
    */
    public function statusExplore($id, $status){

      $update = [
        'status' => $status
      ];
      $data = DB::table('explores')->where('id', [$id])->update($update);
      if($data){
        if($status == 1){
          return response()->json(['success'=>'Successfully enabled', 'error'=>0]);
        }
        else{
          return response()->json(['success'=>'successfully disabled', 'error'=>0]);
        }
      }
      else{
        return response()->json(['success'=>'Error occured', 'error'=>1]);
      }
    }
}
