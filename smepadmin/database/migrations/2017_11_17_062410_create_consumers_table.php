<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConsumersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('consumers', function (Blueprint $table) {
            $table->increments('id');
            $table->char('name');
            $table->longText('url');
            $table->char('authentication_code');
            $table->tinyInteger('status')->default(0)->comment('0 - disable, 1 - enable');
            $table->tinyInteger('deleted')->default(0)->comment('0 - not delete, 1 - deleted');            
            $table->timestamps();                        
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('consumers');
    }
}
