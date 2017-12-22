<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Country;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CountryController extends Controller
{
    /**
    * get all countries
    */
    public function getCountryList(){
    	$table = new Country();
    	$countryList = $table->get();
    	return response()->json(['success'=>$countryList]);
    }
}
