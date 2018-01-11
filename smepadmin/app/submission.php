<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    protected $fillable = [
        'name', 'url', ' user_id', 'status', 'level'
    ];

}
