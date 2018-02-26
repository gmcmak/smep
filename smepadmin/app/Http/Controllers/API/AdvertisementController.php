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

}
