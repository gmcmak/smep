<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInstitutesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('institutes', function (Blueprint $table) {
            $table->increments('id');
            $table->char('name', 255);
            $table->char('registration_number');
            $table->date('registered_date');
            $table->char('contact_number');
            $table->char('email');
            $table->longText('address');
            $table->char('contact_person_name');
            $table->char('contact_person_email');
            $table->char('contact_person_password');
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
        Schema::dropIfExists('institutes');
    }
}
