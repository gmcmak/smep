<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdvertisementsKeywordTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('advertisements_keyword', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('advertisement_id')->unsigned();
            $table->foreign('advertisement_id')->references('id')->on('advertisements');
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
        Schema::dropIfExists('advertisements_keyword');
    }
}
