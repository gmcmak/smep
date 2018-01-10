<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContentCategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('content_category', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('content_id')->unsigned();
            $table->foreign('content_id')->references('id')->on('contents');
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
        Schema::dropIfExists('content_category');
    }
}
