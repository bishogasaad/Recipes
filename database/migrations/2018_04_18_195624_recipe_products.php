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
            $table->char('recipe_id',36);
            $table->foreign('recipe_id')->references('id')
            ->on('recipes')->onDelete('cascade');
            
            $table->char('product_id',36);
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
    }
}
