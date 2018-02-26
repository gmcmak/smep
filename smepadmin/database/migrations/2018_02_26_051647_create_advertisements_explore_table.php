<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdvertisementsExploreTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('advertisements_explore', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('advertisement_id')->unsigned();
            $table->foreign('advertisement_id')->references('id')->on('advertisements');
            $table->integer('explore_id')->unsigned();
            $table->foreign('explore_id')->references('id')->on('explores');                
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
        Schema::dropIfExists('advertisements_explore');
    }
}
