<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;

class PassportController extends Controller
{

    public $successStatus = 200;

    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->accessToken;
            $success['name'] =  $user->name;
            return response()->json(['success' => $success], $this->successStatus);
        }
        else{
            return response()->json(['error'=>'Unauthorised'], 401);
        }
    }

    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
            'status'=>'required|boolean',
            'deleted'=>'required|boolean',
            'name_with_initials'=>'required',
            'gender'=>'required',
            'nic'=>'required',
            'mobile'=>'required',
            'designation'=>'required',
            'birthday'=>'required',
            'role_id' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);            
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $user->createToken('MyApp')->accessToken;
        $success['name'] =  $user->name;
        $success['message'] = "User has been added";

        return response()->json(['success'=>$success], $this->successStatus);
    }

    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function getDetails()
    {
        // $user = Auth::user();
        $user = Auth::user()::with('role', 'highestEducation.country', 'professionalEducations.country','institues','subjectAreas')->find(Auth::user()->id);
       // $user = Auth::user()::with('role', 'highestEducation.country', 'professionalEducations.country','institues')->get();
        // $user = Auth::user();
        // $user->roles;
        return response()->json(['success' => $user], $this->successStatus);
    }

    /**
     * get all users' detals
     */
    public function getAllUsers()
    {
        $user = Auth::user();
        //$user = Auth::user()::with('role', 'highestEducation.country', 'professionalEducations.country','institues','subjectAreas')->find(Auth::user()->id);
        $user = Auth::user()::with('role', 'highestEducation', 'professionalEducations','institues', 'subjectAreas')->get();
        // $user = Auth::user();
        // $user->roles;
        return response()->json(['success' => $user], $this->successStatus);
    }

    /**
    * @param get id
    * @return \Illuminate\Http\Response
    */
    public function editDetails($id){
        // $user = Auth::user()::with('role', 'highestEducation.country', 'professionalEducations.country','institues')->where('id', [$id])->get();
        $user = Auth::user()->where('id', [$id])->get();
        return response()->json(['success' => $user], $this->successStatus);
    }

    /**
    * @param array $request post data and id
    * @return \Illuminate\Http\Response
    */
    public function updateDetails(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            // 'password' => 'required',
            // 'c_password' => 'required|same:password',
            'status'=>'required|boolean',
            'deleted'=>'required|boolean',
            'name_with_initials'=>'required',
            'gender'=>'required',
            'nic'=>'required',
            'mobile'=>'required',
            'designation'=>'required',
            'birthday'=>'required',
            'role_id' => 'required'
        ]);
        if($validator->fails()){
            return response()->json(['error'=>$validator->errors()], 401);
        }
        else{

            $update = [
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                //'password' => bcrypt($request->input('password')),
                'status' => $request->input('status'),
                'deleted' => $request->input('deleted'),
                'name_with_initials' => $request->input('name_with_initials'),
                'gender' => $request->input('gender'),
                'nic' => $request->input('nic'),
                'mobile' => $request->input('mobile'),
                'designation' => $request->input('designation'),
                'birthday' => $request->input('birthday'),
                'role_id' => $request->input('role_id'),
                'updated_at' => now()
            ];

            $updateDetails = DB::table('users')->whereIn('id', [$id])->update($update);

            if($updateDetails){
                return response()->json(['success'=>'Successfully updated']);
            }
            else{
                return response()->json(['error'=>'Error occured']);
            }
        }
    }

    /**
    * @param get id
    * @return \Illuminate\Http\Response
    */
    public function deleteDetails($id){
        $update = ['deleted'=>1];
        $delete = DB::table('users')->where('id', [$id])->update($update);
        if($delete){
            return response()->json(['success'=>'Successfully deleted']);
        }
        else{
            return response()->json(['error'=>'Error occured']);
        }
    }

    /**
    * @param get id
    * @return \Illuminate\Http\Response
    */
    public function statusDetails($id,$status){
        $update = ['status'=>$status];
        $updateStatus = DB::table('users')->where('id', $id)->update($update);
        if($updateStatus){
            if($status==1){
                return response()->json(['success'=>'Successfully enabled']);
            }
            else{
                return response()->json(['success'=>'Successfully disabled']);
            }
        }
        else{
            return response()->json(['error'=>'Error occured']);
        }
    }
}