<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $fillable = [
        'en_name', 'si_name', 'ta_name'
    ];

    public function content()
    {
        return $this->belongsToMany('App\Content');
    }   
}
