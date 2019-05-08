<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RecipeProducts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('recipe_products', function(Blueprint $table)
        {
            $table->integer('recipe_id',false,true);
            $table->foreign('recipe_id')->references('id')
            ->on('recipes')->onDelete('cascade');
            
            $table->integer('product_id',false,true);
            $table->foreign('product_id')->references('id')
            ->on('products')->onDelete('cascade');

            $table->unsignedInteger('amount');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::dropIfExists('recipe_products');
    }
}
