<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User_professional_education extends Model
{
    // fillable fields
    protected $fillable = ['user_id', 'qualification', 'university', 'grade', 'year', 'country_id'];
    
    public function country(){
        return $this->belongsTo('App\Country');
    }
}
