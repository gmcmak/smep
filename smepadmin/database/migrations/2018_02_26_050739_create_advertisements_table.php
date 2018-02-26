<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdvertisementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('advertisements', function (Blueprint $table) {
            $table->increments('id');
            $table->longText('title'); 
            $table->longText('description');
            $table->longText('url');
            $table->longText('video_url');
            $table->longText('freeform_keyword'); 
            $table->tinyInteger('status')->default(0)->comment('0 - disable , 1 - enable');
            $table->integer('type_id')->unsigned();
            $table->foreign('type_id')->references('id')->on('types');                
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
        Schema::dropIfExists('advertisements');
    }
}
