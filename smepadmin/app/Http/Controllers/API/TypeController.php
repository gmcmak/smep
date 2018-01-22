<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Type;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Validation\Rule;
use Validator;

class TypeController extends Controller
{
    //get type details
    public function getType(){
    	$table = new Type();
    	$data = DB::table('types')->get();
    	return response()->json(['success'=>$data]);
    }
}
