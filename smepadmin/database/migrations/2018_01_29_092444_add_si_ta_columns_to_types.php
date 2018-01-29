<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSiTaColumnsToTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::table('types', function (Blueprint $table){
            $table->char('si_name')->collate('utf8_general_mysql500_ci');
            $table->char('ta_name')->collate('utf8_general_mysql500_ci');
        });  
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('types',function (Blueprint $table){
            $table->dropColumn('si_name');
            $table->dropColumn('ta_name');
        });
    }
}
