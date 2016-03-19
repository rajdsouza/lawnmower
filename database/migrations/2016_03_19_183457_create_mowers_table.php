<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMowersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mowers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('lawns_id');
            $table->string('heading');
            $table->integer('x');
            $table->integer('y');
            $table->string('commands');
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
        Schema::drop('mowers');
    }
}
