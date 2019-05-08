<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $hidden = ['pivot'];
    public function recipes()
    {
        return $this->belongsToMany('App\Recipe','recipe_products','product_id','recipe_id');
    }

}
