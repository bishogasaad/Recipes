<?php

namespace App\Http\Controllers;

use App\Product;
use Symfony\Component\HttpFoundation\Request;

class productController extends Controller
{
    //
    public function show(Request $req){
        if($req->name=='recipes') {
            $product = Product::where('name',$req->product_name)->first();
            return $product->recipes;
        }
        $product=Product::where('name',$req->name)->first();
        if($product===null){return 'Product not Found';}
        else
        {
            if($product->quantity>0){$availability=true;}
            else {$availability=false;}
            return view(
                'product', [
                    'description'=>$product->description,
                    'name'=>str_replace('-',' ', $product->name),
                    'type'=>$product->type,
                    'multiples'=>$product->multiples,
                    'price'=>$product->price,
                    'company'=>$product->company,
                    'availability'=>$availability
                    ]);
                }
            }
    
    public function featured(){
        $array = array();$min = 0;
        $products = Product::all();
        $max = $products[0]->recipes()->count();
        foreach ($products as $product) {
            $count = $product->recipes()->count();
            if($product->quantity>0){$availability=true;}
            else {$availability=false;}
            $product = [
                "name"=>$product->name,
                "price"=>$product->price,
                "type"=>$product->type,
                "multiples"=>$product->multiples,
                "available"=>$availability
            ];
            if (!isset($array[$count])){
                $array[$count] = array($product);
            }
            else {
                array_push($array[$count],$product);
            }
        }
        $output = [];
        krsort($array);
        $array = array_values($array);
        for ($i=0; (sizeof($output) < 18) && ($i < sizeof($array)) ; $i++) { 
            for ($c=0; $c < sizeof($array[$i]) ; $c++) { 
                array_push($output,$array[$i][$c]);
            }
        }
        return $output;
    }
    public function search(Request $req){
        $name=$req->input('query');
        $products=Product::where('name','like','%'.$name.'%')->get();
        return $products;
    }
}
