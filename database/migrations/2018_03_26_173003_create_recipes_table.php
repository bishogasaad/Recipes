<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecipesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->increments('id');
            $table->char('title', 64);
            $table->integer('persons',false,true);
            $table->decimal('time',4,2);
            $table->mediumText('instruction');
            $table->timestamps();
            $table->uuid('user_id');
            $table->decimal('rating',2,1)->default(0);
            $table->unique('title');
            $table->smallInteger('type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recipes');
    }
}
