<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Rating extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('recipes_rating',function(Blueprint $table)
        {
            $table->integer('recipe_id',false,true);
            $table->foreign('recipe_id')->references('id')
            ->on('recipes')->onDelete('cascade');
            
            $table->char('user_id',36);
            $table->foreign('user_id')->references('id')
            ->on('users')->onDelete('cascade');

            $table->unsignedDecimal('rating', 2, 1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recipes_rating');
    }
}
