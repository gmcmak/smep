<?php

namespace App\Http\Controllers\API;

use App\Institute;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;

class InstituteController extends Controller
{   
    public function index(){
        $institute = Institute::with('instituteUsers')->where('id', [14])->get();
        return response()->json($institute);
    }

    /**
    * @param array $request post data
    * @return message
    */
    public function insertInstitute(Request $request){
    	$validator = Validator::make($request->all(), [
    		'name' => 'required',
    		'registration_number' => 'required',
    		'registered_date' => 'required',
    		'contact_number' => 'required|numeric',
    		'email' => 'required|email',
    		'address' => 'required',
    		'status' => 'required|boolean',
            'deleted' => 'required|boolean',
            'user_name' => 'required',
            'user_email' => 'required|email',
            'user_password' => 'required',
            'user_c_password' => 'required|same:user_password',
            'user_status' => 'required',
            'user_name_with_initials' => 'required',
            'user_gender' => 'required',
            'user_nic' => 'required',
            'user_mobile' => 'required',
            'user_designation' => 'required',
            'user_birthday' => 'required'
    	]);
    	if($validator->fails()){
    		return response()->json(['error'=>$validator->errors()], 401);
    	}
    	else{
    		$table = new Institute();
    		$table->name = $request->input('name');
    		$table->registration_number = $request->input('registration_number');
    		$table->registered_date = $request->input('registered_date');
    		$table->contact_number = $request->input('contact_number');
    		$table->email = $request->input('email');
    		$table->address = $request->input('address');
    		$table->status = $request->input('status');
            $table->deleted = $request->input('deleted');
            $table->created_at = now();
            $table->updated_at = now();
    		$table->save();

    		if($table->save()){
                $user_details = array(
                    'name' => $request->input('user_name'),
                    'email' => $request->input('user_email'),
                    'password' => bcrypt($request->input('user_password')),
                    'status' => $request->input('user_status'),
                    'name_with_initials' => $request->input('user_name_with_initials'),
                    'gender' => $request->input('user_gender'),
                    'nic' => $request->input('user_nic'),
                    'mobile' => $request->input('user_mobile'),
                    'designation' => $request->input('user_designation'),
                    'birthday' => $request->input('user_birthday'),
                    'created_at' => now(),
                    'updated_at' => now(),
                    'role_id' => 5
                );

                $insert_user_id = $table->users()->insertGetId($user_details);
                $id = array($insert_user_id); 
                $data = $table->instituteUsers()->attach($id);
    			return response()->json(['success'=>'Successfully inserted', 'error'=>0]);
    		}
    		else{
    			return response()->json(['success'=>'Error occured', 'error'=>1]);
    		}
    	}
    }

    /**
    * @return dataset or message
    */
    public function viewInstitute(){
    	$table = new Institute();
    	$viewData = DB::table('institutes')->where('deleted', 0)->get();
    	if($viewData){
    		return response()->json(['success'=>$viewData]);
    	}
    	else{
    		return response()->json(['error'=>'Error occured']);
    	}
    }

    /**
    * @param get id data
    * @return dataset or message
    */
    public function editInstitute($id){
    	//$editData = DB::table('institutes')->where('id', [$id])->get();
        $editData = Institute::with(
            array('instituteUsers' => function($query){
                $query->where('role_id', 5); 
            })
        )->where([['id', '=', $id],])->get();
    	if($editData){
    		return response()->json(['success'=>$editData]);
    	}
    	else{
    		return response()->json(['error'=>'Error occured']);
    	}
    }

    /**
    * @param $request post data and get id
    * @return dataset or message
    */
    public function updateInstitute(Request $request, $id){
    	$validator = Validator::make($request->all(), [
    		'name' => 'required',
    		'registration_number' => 'required',
    		'registered_date' => 'required|date',
    		'contact_number' => 'required|numeric',
    		'email' => 'required|email',
    		'address' => 'required',
    		'status' => 'required|boolean',
            'user_name' => 'required',
            'user_email' => 'required|email',
            // 'user_password' => 'required',
            // 'user_c_password' => 'required|same:user_password',
            'user_status' => 'required',
            'user_name_with_initials' => 'required',
            'user_gender' => 'required',
            'user_nic' => 'required',
            'user_mobile' => 'required',
            'user_designation' => 'required',
            'user_birthday' => 'required|date'
    	]);
    	if($validator->fails()){
    		return response()->json(['success'=>$validator->errors(), 'error'=>1], 401);
    	}
    	else{

            try{

                $update = [
                'name' => $request->input('name'),
                'registration_number' => $request->input('registration_number'),
                'registered_date' => $request->input('registered_date'),
                'contact_number' => $request->input('contact_number'),
                'email' => $request->input('email'),
                'address' => $request->input('address'),
                'status' => $request->input('status'),
                'updated_at' => now()
                ];

            $username = $request->input('user_name');
            $updateData = DB::table('institutes')->whereIn('id', [$id])->update($update);
           
           $user_name = $request->input('user_name');
           $user_email = $request->input('user_email');
           //$user_password = bcrypt($request->input('user_password'));
           $user_status = $request->input('user_status');
           $user_name_with_initials = $request->input('user_name_with_initials');
           $user_gender = $request->input('user_gender');
           $user_nic = $request->input('user_nic');
           $user_mobile = $request->input('user_mobile');
           $user_designation = $request->input('user_designation');
           $user_birthday = $request->input('user_birthday');

            $editData = Institute::with(
                array('instituteUsers' => function($query) use ($user_name,$user_email,$user_status,$user_name_with_initials,$user_gender,$user_nic,$user_mobile,$user_designation,$user_birthday){
                    $query->where('role_id', 5)->update([
                        'name' => $user_name,
                        'email' => $user_email,
                        //'password' => $user_password,
                        'status' => $user_status,
                        'name_with_initials' => $user_name_with_initials,
                        'gender' => $user_gender,
                        'nic' => $user_nic,
                        'mobile' => $user_mobile,
                        'designation' => $user_designation,
                        'birthday' => $user_birthday
                    ]); 
                })
            )->where([['id', '=', $id],])->get();

            return response()->json(['success'=>'Successfully updated', 'error'=>0]);

            }
            catch(\Illuminate\Database\QueryException $ex){
                return response()->json(['success'=>'Error occured', 'error'=>1]);
            }	
    	}
    }

    /**
    * @param get id
    * @return message
    */
    public function deleteInstitute($id){
    	$update = ['deleted' => 1];
    	$deleteInstitute = DB::table('institutes')->whereIn('id', [$id])->update($update);
    	if($deleteInstitute){

            $deleteInstituteUser = Institute::with(
                array('instituteUsers' => function($query){
                    $query->where('role_id', 5)->update([
                        'deleted' => 1
                    ]); 
                })
            )->where([['id', '=', $id],])->get();

    		return response()->json(['success'=>'Successfully deleted', 'error'=>0]);
    	}
    	else{
    		return response()->json(['success'=>'Error occured', 'error'=>1], 401);
    	}
    }     

    /**
    * @param get id and status data
    * @return message
    */
    public function statusInstitute($id, $status){
    	$update = ['status' => $status];
        $data = DB::table('institutes')->where('id', $id)->update($update);
          if($data){
            if($status == 1){
              return response()->json(['success'=>'Successfully enabled', 'error'=>0]);
            }
            else{
              return response()->json(['success'=>'Successfully disabled', 'error'=>0]);
            }
          }
          else{
            return response()->json(['error'=>'Error occured', 'error'=>1]);
          }
    }

     /**
    * get all authorizers data assigned to institute
    */
    public function viewInstituteAuthorizer($id){
        $authorizersData = Institute::with(
            array('instituteUsers' => function($query){
                $query->where(['role_id'=>4, 'deleted'=>0]); 
            }, 'instituteUsers.subjectAreas')
        )->where('id', [$id])->get();

        if($authorizersData){
            return response()->json(['success'=>$authorizersData, 'error'=>0]);
        }
        else{
            return response()->json(['error'=>'Error occured', 'error'=>1]);
        }
    }

    /**
    * add authorizer as user
    **/
    public function insertInstituteAuthorizer($nic,$institute_id){
        $table = new Institute();
        $authorizer_table = new User();
        $authorizer_id = DB::table('users')->where(['role_id'=>4, 'nic'=>$nic])->pluck('id');

        $checkEmpty = $authorizer_id->isEmpty();

        if($checkEmpty == false){

            $table->id = $institute_id;

            //check record is available or not
            $findRecord = $table->instituteUsers()->find(['user_id'=>$authorizer_id, 'institute_id'=>$institute_id]);
            $checkFindRecord = $findRecord->isEmpty();

            if($checkFindRecord == true){
                $data = $table->instituteUsers()->attach($authorizer_id);  
                return response()->json(['success'=>'Successfully added', 'error'=>0]);
            }

            else{
                return response()->json(['success'=>'Authorizer is already added', 'error'=>1]);
            }

        }
        else{
            return response()->json(['success'=>'No authorizer for entered nic','error'=>1]);
        }
    }

    /**
    * remove added authorizers
    */
    public function removeInstituteAuthorizer($user_id, $institute_id){
        $table = new Institute();

        $institute = Institute::find($institute_id);

        $removeAuthorizer = $institute->instituteUsers()->detach($user_id);

        return response()->json(['success'=>'Successfully removed', 'error'=>0]); 
    }

    /**
    * get all providers data assigned to institute
    */
    public function viewInstituteProvider($id){
        $providersData = Institute::with(
            array('instituteUsers' => function($query){
                $query->where(['role_id'=>3, 'deleted'=>0]); 
            }, 'instituteUsers.subjectAreas')
        )->where('id', [$id])->get();
        if($providersData){
            return response()->json(['success'=>$providersData, 'error'=>0]);
        }
        else{
            return response()->json(['error'=>'Error occured']);
        }
    }

    /**
    * add provider as user
    **/
    public function insertInstituteProvider($nic,$institute_id){
        $table = new Institute();
        $authorizer_table = new User();
        $provider_id = DB::table('users')->where(['role_id'=>3, 'nic'=>$nic])->pluck('id');

        $checkEmpty = $provider_id->isEmpty();

        if($checkEmpty == false){

            $table->id = $institute_id;

            //check record is available or not
            $findRecord = $table->instituteUsers()->find(['user_id'=>$provider_id, 'institute_id'=>$institute_id]);
            $checkFindRecord = $findRecord->isEmpty();

            if($checkFindRecord == true){
                $data = $table->instituteUsers()->attach($provider_id);  
                return response()->json(['success'=>'Successfully added', 'error'=>0]);
            }

            else{
                return response()->json(['success'=>'Provider is already added', 'error'=>1]);
            }

        }
        else{
            return response()->json(['success'=>'No provider for entered nic','error'=>1]);
        }
    }

    /**
    * remove added providers
    */
    public function removeInstituteProvider($user_id, $institute_id){
        $table = new Institute();

        $institute = Institute::find($institute_id);

        $removeProvider = $institute->instituteUsers()->detach($user_id);

        return response()->json(['success'=>'Successfully removed', 'error'=>0]);
        
    }

}
