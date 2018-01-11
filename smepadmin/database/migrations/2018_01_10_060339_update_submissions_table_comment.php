<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateSubmissionsTableComment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('submissions', function(Blueprint $table){
            $table->dropColumn('status');
            //$table->tinyInteger('status')->default(0)->comment('0 - pending , 1 - processing, 2 - ready, 3 - done');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       $table->tinyInteger('status')->default(0)->comment('0 - pending , 1 - processing, 2 - ready');
       //$table->dropColumn('status');
    }
}
