<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropInstituteColumnsFromInstitutes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('institutes', function(Blueprint $table) {
            $table->dropColumn('contact_person_name');
            $table->dropColumn('contact_person_email');
            $table->dropColumn('contact_person_password');              
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('institutes', function (Blueprint $table)
        {
            $table->char('contact_person_name');
            $table->char('contact_person_email');
            $table->char('contact_person_password');
        });
    }
}
