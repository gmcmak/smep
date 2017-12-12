<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if(!Schema::hasTable('users')){
            Schema::create('users', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name');
                $table->string('email')->unique();
                $table->string('password');
                $table->tinyInteger('user_type')->comment('1 - super admin, 2 - admin, 3 - content provider, 4- content authorizer');
                $table->integer('type_id')->default(0)->comment('This will get value when user_type has a value');
                $table->tinyInteger('status')->default(0)->comment('0 - disable, 1 - enable');
                $table->tinyInteger('deleted')->default(0)->comment('0 - not delete, 1 - deleted');
                $table->rememberToken();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
