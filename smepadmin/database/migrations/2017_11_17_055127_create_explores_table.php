<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExploresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('explores', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('parent_id')->default(0);
            $table->char('en_tag')->collate('utf8_general_mysql500_ci');
            $table->char('si_tag')->collate('utf8_general_mysql500_ci');
            $table->char('ta_tag')->collate('utf8_general_mysql500_ci');
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
        Schema::dropIfExists('explores');
    }
}
