<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameAdertisementsKeywordContentExplore extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::rename("advertisements_keyword", "advertisement_keyword");
        Schema::rename("advertisements_category", "advertisement_category");
        Schema::rename("advertisements_explore", "advertisement_explore");

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
