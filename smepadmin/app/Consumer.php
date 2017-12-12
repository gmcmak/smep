<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Consumer extends Model
{
    protected $fillable = [
        'name', 'url', ' authentication_code', 'status', 'deleted'
    ];

    public function modules()
    {
        return $this->belongsToMany('App\Module')->withTimestamps();
    }
}
