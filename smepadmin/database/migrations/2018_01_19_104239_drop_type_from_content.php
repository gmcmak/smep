<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropTypeFromContent extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::table('contents', function(Blueprint $table){  
            $table->dropColumn('type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::table('contents', function(Blueprint $table){  
            $table->tinyInteger('type')->default(0)->comment('0 - all , 1 - images, 2 - videos');
        });
    }
}
