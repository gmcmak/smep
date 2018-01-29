<?php

namespace App\Http\Controllers\API;

use App\Explore as Explore;
use App\Consumer;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;
use Route;



class SearchSubDataController extends Controller
{

    public function __construct(Request $request){
        $id = $request->id;
        $token = $request->token;  
        $data = Consumer::with('modules')->where([
            ['id', '=', $id],
            ['deleted', '=', '0'],
            ['status', '=', '1']
        ])->get(['authentication_code']);
        $generatedCode = md5($data[0]->authentication_code);
        
        if($generatedCode != $token){
           return response()->json(['error'=>0]);
           exit;
        }

    }

    public function getExplore($id, $token, $language){
        $language = $language."_tag";
        $explore = Explore::where([
            ['deleted', '=', '0'],
            ['status', '=', '1'],
            ['parent_id', '=', '0'],
        ])->get(['id','parent_id',$language]);
        //return response()->json(['success'=>$explore]);


       $mainMenu = array(); 
       foreach($explore as $item){
            $mainMenuItem = $item[$language];
            $exploreSub = Explore::where([
                ['deleted', '=', '0'],
                ['status', '=', '1'],
                ['parent_id', '=', $item['id']],
            ])->get(['id','parent_id',$language]);
               
            $subMenus = array();
            foreach($exploreSub as $subItem){
                $subMenus[] = $subItem[$language];
            }   
            $subMenusItems = $subMenus;
            $mainMenu[] = array(
                    'mainMenu' => $mainMenuItem,
                    'subMenu' => $subMenusItems
                );      
       } 

       return json_encode($mainMenu);

    }

}