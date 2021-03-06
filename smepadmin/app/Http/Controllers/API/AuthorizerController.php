<?php

namespace App\Http\Controllers\API;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;

class AuthorizerController extends Controller
{	
    /**
    * get authorizer's details
    */
    public function index($id){
        $authorizer = User::with('highestEducation','professionalEducations','institues')->where('id', [$id])->get();
        return response()->json($authorizer);
    }

	/**
	* @param array $request post data
	* @return message
	*/
    public function insertAuthorizer(Request $request){

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
            'highest_qualification' => 'required',
            'highest_university' => 'required',
            'highest_grade' => 'required',
            'highest_year' => 'required',
            'country_id' => 'required'
    	]);

    	if($validator->fails()){
    		return response()->json(['error'=>$validator->errors()], 401);
    	}
    	else{

    		$role_id = 4;
    		$user_table = new User();

    		$user_table->name = $request->input('name');
    		$user_table->email = $request->input('email');
    		$user_table->password = bcrypt($request->input('password'));
    		$user_table->name_with_initials = $request->input('name_with_initials');
    		$user_table->gender = $request->input('gender');
    		$user_table->nic = $request->input('nic');
    		$user_table->mobile = $request->input('mobile');
    		$user_table->designation = $request->input('designation');
    		$user_table->birthday = $request->input('birthday');
    		$user_table->role_id = $role_id;
            $user_table->created_at = now();
            $user_table->updated_at = now();
    		$user_table->save();

    		$highest_edu_quali = array(
    			['user_id' => $user_table->id,
    			'qualification'=> $request->input('highest_qualification'),
    			'university' => $request->input('highest_university'),
    			'grade' => $request->input('highest_grade'),
    			'year' => $request->input('highest_year'),
    			'country_id' => $request->input('country_id'),
    			'created_at' => now(),
    			'updated_at' => now()]
    		);

            $proff_edu_quali = array();
            $subject_area = array();

            if(!empty($request->input('pro_qualification_1')) || !empty($request->input('pro_institute_1')) || !empty($request->input('pro_grade_1')) || !empty($request->input('pro_country_1')) || !empty($request->input('pro_year_1')))
            {
                $proff_edu_quali1 = array(
                    'user_id' => $user_table->id,
                    'qualification' => $request->input('pro_qualification_1'),
                    'university' => $request->input('pro_institute_1'),
                    'grade' => $request->input('pro_grade_1'),
                    'year' => $request->input('pro_year_1'),
                    'created_at' => now(),
                    'updated_at' => now(),
                    'country_id' => $request->input('pro_country_1')
                );

                $proff_edu_quali[0] = $proff_edu_quali1;
            }

            if(!empty($request->input('pro_qualification_2')) || !empty($request->input('pro_institute_2')) || !empty($request->input('pro_grade_2')) || !empty($request->input('pro_country_2')) || !empty($request->input('pro_year_2')))
            {
                $proff_edu_quali2 = array(
                    'user_id' => $user_table->id,
                    'qualification' => $request->input('pro_qualification_2'),
                    'university' => $request->input('pro_institute_2'),
                    'grade' => $request->input('pro_grade_2'),
                    'year' => $request->input('pro_year_2'),
                    'created_at' => now(),
                    'updated_at' => now(),
                    'country_id' => $request->input('pro_country_2')
                );

                $proff_edu_quali[1] = $proff_edu_quali2;
            }

            if(!empty($request->input('pro_qualification_3')) || !empty($request->input('pro_institute_3')) || !empty($request->input('pro_grade_3')) || !empty($request->input('pro_country_3')) || !empty($request->input('pro_year_3')))
            {
                $proff_edu_quali3 = array(
                    'user_id' => $user_table->id,
                    'qualification' => $request->input('pro_qualification_3'),
                    'university' => $request->input('pro_institute_3'),
                    'grade' => $request->input('pro_grade_3'),
                    'year' => $request->input('pro_year_3'),
                    'created_at' => now(),
                    'updated_at' => now(),
                    'country_id' => $request->input('pro_country_3')
                );

                $proff_edu_quali[2] = $proff_edu_quali3;
            }

            if(!empty($request->input('expert1'))){
                $subject_area[0] = $request->input('expert1');
            }

            if(!empty($request->input('expert2'))){
                $subject_area[1] = $request->input('expert2');
            }

            if(!empty($request->input('expert3'))){
                $subject_area[2] = $request->input('expert3');
            }

    		if($user_table->save()){
    			$insert_highest_quali = $user_table->highestEducation()->insert($highest_edu_quali);
    			$insert_proff_quali = $user_table->professionalEducations()->insert($proff_edu_quali);
    			$insert_subject_areas = $user_table->subjectAreas()->attach($subject_area);
    			return response()->json(['success'=>'Successfully inserted', 'error'=>0]);
    		}
    		else{
    			return response()->json(['success'=>'Error occured', 'error'=>1], 401);
    		}
    	}
    }

    /*
    * get all authorizers' details
    */
    public function viewAuthorizers(){
        $authorizerDetails = User::with('highestEducation','professionalEducations','institues', 'subjectAreas')->where(['role_id'=>4, 'deleted'=>0])->get();
        return response()->json(['success'=>$authorizerDetails]);
    }

    /**
    * @param get id
    * @return dataset or message
    */
    public function editAuthorizer($id){
        $authorizerDetails = User::with('highestEducation','professionalEducations','institues', 'subjectAreas')->where('id',[$id])->get();
        return response()->json(['success'=>$authorizerDetails]);
    }

    /**
    * @param array $request post data and get id
    * @return message
    */
    public function updateAuthorizer(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'status'=>'required|boolean',
            'deleted'=>'required|boolean',
            'name_with_initials'=>'required',
            'gender'=>'required',
            'nic'=>'required',
            'mobile'=>'required',
            'designation'=>'required',
            'birthday'=>'required',
            'highest_qualification' => 'required',
            'highest_university' => 'required',
            'highest_grade' => 'required',
            'highest_year' => 'required',
            'country_id' => 'required'
        ]);

        if($validator->fails()){
            return response()->json(['error'=>$validator->errors()], 401);
        }
        else{
            $table = new User();
            $table->id = $id;

            $update = [
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'status' => $request->input('status'),
                'deleted' => $request->input('deleted'),
                'name_with_initials' => $request->input('name_with_initials'),
                'gender' => $request->input('gender'),
                'nic' => $request->input('nic'),
                'mobile' => $request->input('mobile'),
                'designation' => $request->input('designation'),
                'birthday' => $request->input('birthday'),
                'updated_at' => now()
            ];

            $highest_edu_quali = array(
                ['user_id' => $table->id,
                'qualification'=> $request->input('highest_qualification'),
                'university' => $request->input('highest_university'),
                'grade' => $request->input('highest_grade'),
                'year' => $request->input('highest_year'),
                'country_id' => $request->input('country_id'),
                'updated_at' => now()]
            );

            $proff_edu_quali = array();
            $subject_area = array();

            if(!empty($request->input('pro_qualification_1')) || !empty($request->input('pro_institute_1')) || !empty($request->input('pro_grade_1')) || !empty($request->input('pro_country_1')) || !empty($request->input('pro_year_1')))
            {
                $proff_edu_quali1 = array(
                    'user_id' => $table->id,
                    'qualification' => $request->input('pro_qualification_1'),
                    'university' => $request->input('pro_institute_1'),
                    'grade' => $request->input('pro_grade_1'),
                    'year' => $request->input('pro_year_1'),
                    'created_at' => now(),
                    'updated_at' => now(),
                    'country_id' => $request->input('pro_country_1')
                );

                $proff_edu_quali[0] = $proff_edu_quali1;
            }

            if(!empty($request->input('pro_qualification_2')) || !empty($request->input('pro_institute_2')) || !empty($request->input('pro_grade_2')) || !empty($request->input('pro_country_2')) || !empty($request->input('pro_year_2')))
            {
                $proff_edu_quali2 = array(
                    'user_id' => $table->id,
                    'qualification' => $request->input('pro_qualification_2'),
                    'university' => $request->input('pro_institute_2'),
                    'grade' => $request->input('pro_grade_2'),
                    'year' => $request->input('pro_year_2'),
                    'created_at' => now(),
                    'updated_at' => now(),
                    'country_id' => $request->input('pro_country_2')
                );

                $proff_edu_quali[1] = $proff_edu_quali2;
            }

            if(!empty($request->input('pro_qualification_3')) || !empty($request->input('pro_institute_3')) || !empty($request->input('pro_grade_3')) || !empty($request->input('pro_country_3')) || !empty($request->input('pro_year_3')))
            {
                $proff_edu_quali3 = array(
                    'user_id' => $table->id,
                    'qualification' => $request->input('pro_qualification_3'),
                    'university' => $request->input('pro_institute_3'),
                    'grade' => $request->input('pro_grade_3'),
                    'year' => $request->input('pro_year_3'),
                    'created_at' => now(),
                    'updated_at' => now(),
                    'country_id' => $request->input('pro_country_3')
                );

                $proff_edu_quali[2] = $proff_edu_quali3;
            }

            if(!empty($request->input('expert1'))){
                $subject_area[0] = $request->input('expert1');
            }

            if(!empty($request->input('expert2'))){
                $subject_area[1] = $request->input('expert2');
            }

            if(!empty($request->input('expert3'))){
                $subject_area[2] = $request->input('expert3');
            }

            try{

                $updateAuthorizer = DB::table('users')->whereIn('id', [$id])->update($update);
            
                $authorizer = User::find($id);
                $authorizer->highestEducation()->delete();
                $updateHighestQuali = $authorizer->highestEducation()->insert($highest_edu_quali);

                $authorizer->professionalEducations()->delete();
                $updateProffQuali = $authorizer->professionalEducations()->insert($proff_edu_quali);

                $authorizer->subjectAreas()->detach();
                $table->id = $id;
                $updatingSubject = $table->subjectAreas()->attach($subject_area);
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
    public function deleteAuthorizer($id){
        $update = ['deleted'=>1];
        $authorizerDelete = DB::table('users')->where('id', [$id])->update($update);

        if($authorizerDelete){
            $authorizer = User::find($id);
            $authorizer->highestEducation()->delete();
            $authorizer->professionalEducations()->delete();
            $authorizer->subjectAreas()->detach();

            return response()->json(['success'=>'Successfully deleted', 'error'=>0]);
        }
        else{
            return response()->json(['success'=>'Error occured', 'error'=> 1]);
        }    
    }

    /**
    * @param array get data
    * @return message
    */
    public function authorizerStatus($id, $status){
      $update = [
        'status' => $status
      ];
      $data = DB::table('users')->where('id', $id)->update($update);
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
}
