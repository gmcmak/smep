<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Advertisement extends Model
{
   protected $fillable = ['title', 'description', 'url', 'video_url', 'freeform_keyword', 'status', 'type_id'];
   
   public function explore(){
       return $this->belongsToMany('App\Explore');
   }

   public function keyword(){
       return $this->belongsToMany('App\Keyword');
   }

   public function category(){
       return $this->belongsToMany('App\Category');
   }
}
