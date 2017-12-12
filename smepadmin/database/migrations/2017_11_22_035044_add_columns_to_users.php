<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsToUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->char('name_with_initials');
            $table->char('gender');
            $table->char('nic');
            $table->char('mobile');
            $table->char('designation');
            $table->date('birthday');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('name_with_initials');
            $table->dropColumn('gender');
            $table->dropColumn('nic');
            $table->dropColumn('mobile');
            $table->dropColumn('designation');
            $table->dropColumn('birthday');
        });
    }
}
