<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFieldsToRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::table('roles', function (Blueprint $table){
                $table->tinyInteger('status')->default(0)->comment('0 - disable, 1 - enable');
                $table->tinyInteger('deleted')->default(0)->comment('0 - not delete, 1 - deleted');
        });        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('roles',function (Blueprint $table){
            $table->dropColumn('status');
            $table->dropColumn('deleted');
        });
    }
}
