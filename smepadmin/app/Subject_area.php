<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class subject_area extends Model
{
    public function users()
    {
        return $this->belongsToMany('App\User');
    } 
}
