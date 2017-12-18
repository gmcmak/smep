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

    		$proff_edu_quali = array(
    			[	'user_id' => $user_table->id,
    				'qualification' => 'MSC',
    				'university' => 'colombo uni',
    				'grade' => 'A',
    				'year' => 2015,
    				'created_at' => now(),
    				'updated_at' => now(),
    				'country_id' => 10
    			],
    			[	'user_id' => $user_table->id,
    				'qualification' => 'MSC1',
    				'university' => 'moratuwa uni',
    				'grade' => 'A',
    				'year' => 2017,
    				'created_at' => now(),
    				'updated_at' => now(),
    				'country_id' => 10
    			]
    		);

    		$subject_area = array(1,2);

    		if($user_table->save()){
    			$insert_highest_quali = $user_table->highestEducation()->insert($highest_edu_quali);
    			$insert_proff_quali = $user_table->professionalEducations()->insert($proff_edu_quali);
    			$insert_subject_areas = $user_table->subjectAreas()->attach($subject_area);
    			return response()->json(['success'=>'Successfully inserted']);
    		}
    		else{
    			return response()->json(['error'=>'Error occured'], 401);
    		}
    	}
    }

    /*
    * get all authorizers' details
    */
    public function viewAuthorizers(){
        $authorizerDetails = User::with('highestEducation','professionalEducations','institues')->where('role_id', 4)->get();
        return response()->json(['success'=>$authorizerDetails]);
    }

    /**
    * @param get id
    * @return dataset or message
    */
    public function editAuthorizer($id){
        $authorizerDetails = User::with('highestEducation','professionalEducations','institues')->where('id',[$id])->get();
        return response()->json($authorizerDetails);
    }

    /**
    * @param array $request post data and get id
    * @return message
    */
    public function updateAuthorizer(Request $request, $id){
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
            $table = new User();
            $table->id = $id;

            $update = [
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => bcrypt($request->input('password')),
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

            $proff_edu_quali = array(
                [   'user_id' => $table->id,
                    'qualification' => 'MSC',
                    'university' => 'colombo uni',
                    'grade' => 'A',
                    'year' => 2015,
                    'updated_at' => now(),
                    'country_id' => 10
                ]
            );

            try{

                $updateAuthorizer = DB::table('users')->whereIn('id', [$id])->update($update);
            
                $authorizer = User::find($id);
                $authorizer->highestEducation()->delete();
                $updateHighestQuali = $authorizer->highestEducation()->insert($highest_edu_quali);

                $authorizer->professionalEducations()->delete();
                $updateProffQuali = $authorizer->professionalEducations()->insert($proff_edu_quali);
                return response()->json(['success'=>'Successfully updated']);
            }
            catch(\Illuminate\Database\QueryException $ex){
                return response()->json($ex->getMessage());
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

            return response()->json(['success'=>'Successfully deleted']);
        }
        else{
            return response()->json(['error'=>'Error occured']);
        }    
    }
}
