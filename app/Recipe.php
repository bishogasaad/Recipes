<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    //
    public function products()
    {
        return $this->belongsToMany('App\Product','recipe_products','recipe_id','product_id')
        ->withPivot('amount');
    }

    public function creator()
    {
        return $this->BelongsTo('App\User','user_id');
    }

    public function raters()
    {
        return $this->belongsToMany('App\User','recipes_rating','recipe_id','user_id')
        ->withPivot('rating');
    }
}
