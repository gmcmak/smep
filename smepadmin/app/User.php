<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;
    /**
    * table name changed to users to sm_users 
    */ 
    public $timestamps = false;

    protected $table= "users";
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 
        'email', 
        'password', 
        'user_type', 
        'type_id', 
        'status', 
        'deleted', 
        'name_with_initials',
        'gender',
        'nic',
        'mobile',
        'designation',
        'birthday',
        'role_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * User and role relationship
     */
    public function role(){
        return $this->belongsTo('App\Role');
    }

    /**
     * User and Highest education relationship
     */
    public function highestEducation(){
        return $this->hasOne('App\User_highest_education');
    } 

    /**
     * User and Professional education relationship
     */
    public function professionalEducations(){
        return $this->hasMany('App\User_professional_education');
    }

    public function institues(){
        return $this->belongsToMany('App\institute');
    }

    /**
    * User and subject area relationship
    */
    public function subjectAreas()
    {
        return $this->belongsToMany('App\Subject_area')->withTimestamps();
    }


}
