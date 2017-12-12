<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User_highest_education extends Model
{
    // filable fields
    protected $fillable = ['user_id', 'qualification', 'university', 'grade', 'year', 'country_id']; 

    public function country(){
        return $this->belongsTo('App\Country');
    }

}
