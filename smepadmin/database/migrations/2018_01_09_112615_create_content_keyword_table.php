<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContentKeywordTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('content_keyword', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('content_id')->unsigned();
            $table->foreign('content_id')->references('id')->on('contents');
            $table->integer('keyword_id')->unsigned();
            $table->foreign('keyword_id')->references('id')->on('keywords');            
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
        Schema::dropIfExists('content_keyword');
    }
}
