<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contents', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('submission_id')->unsigned();
            $table->foreign('submission_id')->references('id')->on('submissions');     
            $table->longText('title'); 
            $table->longText('description');
            $table->longText('url');
            $table->longText('video_url');
            $table->tinyInteger('type')->default(0)->comment('0 - all , 1 - images, 2 - videos');
            $table->longText('freeform_keyword'); 
            $table->tinyInteger('status')->default(0)->comment('0 - pending , 1 - approved, 2 - rejected');       
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
        Schema::dropIfExists('contents');
    }
}
