<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    protected $fillable = ['submission_id', 'title', 'description', 'url', 'video_url', 'type', 'freeform_keyword', 'status']; 

    public function explore()
    {
        return $this->belongsToMany('App\Explore');
    }

    public function keyword()
    {
        return $this->belongsToMany('App\Keyword');
    }    

    public function category()
    {
        return $this->belongsToMany('App\Category');
    }

    public function submission(){
        return $this->belongsTo('App\Submission');
    }  
    
}
