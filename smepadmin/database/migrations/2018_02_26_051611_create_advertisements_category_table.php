<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdvertisementsCategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('advertisements_category', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('advertisement_id')->unsigned();
            $table->foreign('advertisement_id')->references('id')->on('advertisements');
            $table->integer('category_id')->unsigned();
            $table->foreign('category_id')->references('id')->on('categories');                
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
        Schema::dropIfExists('advertisements_category');
    }
}
