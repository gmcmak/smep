<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDropColumnsFromAuthorsCategoriesKeywords extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::table('keywords', function (Blueprint $table){
            $table->dropColumn('name');
            $table->char('en_name')->collate('utf8_general_mysql500_ci');
            $table->char('si_name')->collate('utf8_general_mysql500_ci');
            $table->char('ta_name')->collate('utf8_general_mysql500_ci');
        });      
        Schema::table('authors', function (Blueprint $table){
            $table->dropColumn('name');
            $table->char('en_name')->collate('utf8_general_mysql500_ci');
            $table->char('si_name')->collate('utf8_general_mysql500_ci');
            $table->char('ta_name')->collate('utf8_general_mysql500_ci');
        }); 
        Schema::table('categories', function (Blueprint $table){
            $table->dropColumn('name');
            $table->dropColumn('description');
            $table->char('en_name')->collate('utf8_general_mysql500_ci');
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
        Schema::table('keywords',function (Blueprint $table){
            $table->char('name');
            $table->dropColumn('en_name');
            $table->dropColumn('si_name');
            $table->dropColumn('ta_name');
        });
        Schema::table('authors',function (Blueprint $table){
            $table->char('name');
            $table->dropColumn('en_name');
            $table->dropColumn('si_name');
            $table->dropColumn('ta_name');
        });    
        Schema::table('categories',function (Blueprint $table){
            $table->char('name');
            $table->longtext('description');
            $table->dropColumn('en_name');
            $table->dropColumn('si_name');
            $table->dropColumn('ta_name');
        });              
    }
}
