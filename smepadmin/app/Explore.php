<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Explore extends Model
{
    protected $fillable = [
        'parent_id', 'en_tag', 'si_tag', 'ta_tag', 'status', 'deleted'
    ];

    public function content()
    {
        return $this->belongsToMany('App\Content');
    }
    
    public function Advertisement(){
        return $this->belongsToMany('App\Advertisement');
    }
}
