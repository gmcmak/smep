<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class institute extends Model
{

    public function users(){
        return $this->hasMany('App\User');
    }
    
    public function instituteUsers(){
    	return $this->belongsToMany('App\User')->withTimestamps();
    }
}
