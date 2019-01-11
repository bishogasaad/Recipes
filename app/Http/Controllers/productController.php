<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use Faker\Generator as Faker;
class productController extends Controller
{
    //
    public function show($name){
        $product=Product::where('name',$name)->first();
        if($product===null){return '0';}
        else
        {if($product->quantity>0){$availability=true;}
        else {$availability=false;}
        return view(
            'product',['description'=>$product->description,
            'name'=>str_replace('-',' ', $product->name),
            'type'=>$product->type,
            'multiples'=>$product->multiples,
            'price'=>$product->price,
            'company'=>$product->company,
            'availability'=>$availability
            ]);}
    }
    public function featured(Faker $faker){
        $products=[];
        for ($i=0; $i < 14; $i++) { 
            $product=Product::findOrFail(random_int(1,50));
            array_push($products,$product);
        }
        return $products;
    }
}
