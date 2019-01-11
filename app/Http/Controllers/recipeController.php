<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Recipe;
use Illuminate\Support\Facades\Auth;
class recipeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //

        $recipe=Recipe::find($request->name);
        return $recipe;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return __method__; 
    }

    public function featured()
    {
        $recipes=Recipe::where('rating','=','5.0')->get();
        return $recipes;
    }

    public function search(Request $request)
    {
        $title=$request->input('query');
        $recipes=Recipe::where('title','like','%'.$title.'%')->get();
        return $recipes;
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        return __method__;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($title)
    {
        //
        $recipe=Recipe::where('title',$title)->first();
        return view(
            'recipe',['instruction'=>$recipe->instruction,
            'id'=>$recipe->id,
            'title'=>$recipe->title,
            'rating'=>$recipe->rating,
            'creator'=>$recipe->creator->name,
            'user_id'=>$recipe->creator->id,
            ]);
    }

    public function products(Request $req)
    {
        $recipe=Recipe::findOrFail($req->input('id'));
        $products=[];
        foreach ($recipe->products as $product) {
            array_push($products,[$product->name,$product->pivot->amount,$product->type]);
        }
        return $products;
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        return __method__;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, $id)
    {
        //
        if($req->has('rating'))
        {
            if(Auth::check()){
                $recipe=Recipe::findOrFail($id);
                if($recipe->raters->where('id',Auth::user()->id)->first())
                {
                    $old = $recipe->raters->where('id',Auth::user()->id)->first()
                    ->pivot->rating;
                    $count = $recipe->raters->count();
                    $recipe->rating = $recipe->rating+(($req->input('rating')-$old)/$count);
                    $recipe->rating = round($recipe->rating * 2) / 2;
                    $recipe->save();
                    $recipe->raters()->updateExistingPivot(Auth::user()->id, 
                    ['rating'=>$req->input('rating')]);
                }
                else{
                    $count = $recipe->raters->count();
                    $recipe->raters()->attach(Auth::user()->id,
                    ['rating'=>$req->input('rating')]);
                    $recipe->rating = (($recipe->rating*$count)+$req->input('rating'))/($count+1);
                    $recipe->rating = round($recipe->rating * 2) / 2;
                    $recipe->save();
                }
            }
            else return 'error';
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        if(Auth::user()->id===Recipe::findOrFail($id)->user_id)
        {
            Recipe::findOrFail($id)->delete();
            return route('user',['name'=>str_replace(' ','-',Auth::user()->name),'id'=>Auth::user()->id]);
        }
        else return 'failed';
    }
}
