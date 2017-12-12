<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $fillable = [
        'module_name'
    ];

    public function consumers()
    {
        return $this->belongsToMany('App\Consumer');
    }

}
