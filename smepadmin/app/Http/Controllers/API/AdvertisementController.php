<?php

namespace App\Http\Controllers\API;

use App\Advertisement;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Validation\Rule;
use Validator;

class AdvertisementController extends Controller
{   

    /**
     * get advertisement details
     */
    public function getAdvertisement(){
        //$ad_data = Advertisement::with('keyword','category','explore')->get();
        $ad_data = Advertisement::with('keyword','category','explore')->get();
        return response()->json(['success'=>$ad_data]);
    }

    /**
    * update advertisement status
    */
    public function advertisementStatus($id, $status){
      $update = [
        'status' => $status
      ];
      $data = DB::table('advertisements')->where('id', $id)->update($update);
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
     * delete advertisement
     */
    public function advertisementDelete($id){
        $advertisement = Advertisement::find($id);
        $advertisement->keyword()->detach();
        $advertisement->category()->detach();
        $advertisement->explore()->detach();

        $deleteAdd = DB::table('advertisements')->where(['id'=>$id])->delete();

        if($deleteAdd){
            return response()->json(['success'=>"Successfully deleted", 'error'=>0]);
        }
        else{
            return response()->json(['success'=>"Error occured", 'error'=>1]);
        }
    }

    /**
     * add advertisement
     */
    public function addAdvertisement(Request $request){
        	$validator = Validator::make($request->all(), [
    		'url' => 'required|url',
    		'title' => 'required',
    		'type' => 'required',
    		'keyword' => 'required',
    		'category' => 'required',
    		'explore' => 'required'
    	]);

    	if($validator->fails()){
    		return response()->json(['success'=>'Issue of validation', 'error'=>1]);
    	}
    	else{

            if(is_null($request->input('video_url'))){
                $videoUrl = '';
            }
            else{
                $videoUrl = $request->input('video_url');
            }

            if(is_null($request->input('freeform_keyword'))){
                $freeformKeyword = '';
            }
            else{
                $freeformKeyword = $request->input('freeform_keyword');
            }

            if(is_null($request->input('description'))){
                $description1 = '';
            }
            else{
                $description1 = $request->input('description');
            }

            $advertisement_table = new Advertisement();
            $advertisement_table->title = $request->input('title');
            $advertisement_table->description = $description1;
            $advertisement_table->url = $request->input('url');
            $advertisement_table->video_url = $videoUrl;
            $advertisement_table->freeform_keyword = $freeformKeyword;
            $advertisement_table->status = $request->input('status');
            $advertisement_table->type_id = $request->input('type');
            $advertisement_table->created_at = now();
            $advertisement_table->updated_at = now();
            $save_data = $advertisement_table->save();

            $keyword = $request->input('keyword');
            $keywordArray = explode(",",$keyword);

            $category = $request->input('category');
            $categoryArray = explode(",",$category);

            $explore = $request->input('explore');
            $exploreArray = explode(",",$explore);

            $advertisement_table->keyword()->attach($keywordArray);
            $advertisement_table->category()->attach($categoryArray);
            $advertisement_table->explore()->attach($exploreArray);
            
            if($save_data){
                return response()->json(['success'=>'Successfully inserted', 'error'=>0]);
            }
            else{ 
                return response()->json(['success'=>'Error occured', 'error'=>1]);
            }	
    	}
    }

    /**
     * get advertisement details for edit
     */
    public function editAdvertisement($id){
        $advertisement_data = Advertisement::with('keyword','category','explore')->where(['id'=>$id])->get();

        return response()->json(['success'=>$advertisement_data]);
    }

    /**
     * update advertisement details
     */
    public function updateAdvertisement(Request $request, $id){
    	$validator = Validator::make($request->all(), [
    		'url' => 'required|url',
    		'title' => 'required',
    		'type' => 'required',
    		'keyword' => 'required',
    		'category' => 'required',
    		'explore' => 'required'
    	]);

    	if($validator->fails()){
    		return response()->json(['success'=>'Issue of validation', 'error'=>1], 401);
    	}
    	else{

    		try{
    			$advertisement_table = new Advertisement();

    			if(is_null($request->input('video_url'))){
    				$videoUrl = '';
    			}
    			else{
    				$videoUrl = $request->input('video_url');
    			}

    			if(is_null($request->input('freeform_keyword'))){
    				$freeformKeyword = '';
    			}
    			else{
    				$freeformKeyword = $request->input('freeform_keyword');
    			}

    			if(is_null($request->input('description'))){
    				$description1 = '';
    			}
    			else{
    				$description1 = $request->input('description');
    			}

	    		$advertisement_update_data = [
                    'url' => $request->input('url'),
	    			'title' => $request->input('title'),
	    			'description' => $description1,
	    			'video_url' => $videoUrl,
	    			'type_id' => $request->input('type'),
	    			'freeform_keyword' => $freeformKeyword,
	    			'status' => $request->input('status'),
	    			'updated_at' => now()
	    		];

	    		$keyword = $request->input('keyword');
                $keywordArray = explode(",",$keyword);

	    		$category = $request->input('category');
                $categoryArray = explode(",",$category);

	    		$explore = $request->input('explore');
                $exploreArray = explode(",",$explore);

	    		$advertisement_update = DB::table('advertisements')->where(['id' => $id])->update($advertisement_update_data);

	    		if($advertisement_update){
	    			$advertisement_table_id = Advertisement::find($id);
		    		$advertisement_table_id->keyword()->detach();
		    		$insert_keywords = $advertisement_table_id->keyword()->attach($keywordArray);
		    		$advertisement_table_id->explore()->detach();
		    		$insert_explore = $advertisement_table_id->explore()->attach($exploreArray);
		    		$advertisement_table_id->category()->detach();
		    		$insert_categories = $advertisement_table_id->category()->attach($categoryArray);
		    		
		    		return response()->json(['success'=>'Successfully updated', 'error'=>0]);
	    		}
	    		else{ 
	    			return response()->json(['success'=>'Error occured', 'error'=>1]);
	    		}
	    		
    		}
    		catch(\Illuminate\Database\QueryException $ex){
    			return response()->json(['success'=>'Error occured', 'error'=>1]);
    		}
    		
    	}
    }

}
