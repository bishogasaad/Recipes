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
    public function index(Request $req)
    {
        //
        $type = array_map('intval', explode(',', $req->input('type')));
        $query = Recipe::whereIn('type', $type);
        if ($req->input('persons')!=0)
        {
            $persons = $req->input('persons');
            $query = $query->where('persons','<=',$persons);
        }
        if ($req->input('time')!=0)
        {
            $time = $req->input('time');
            $query = $query->where('time','<=',$time);
        }
        if ($req->input('rating')!=0.5)
        {
            $rating = $req->input('rating');
            $query = $query->where('rating','>=',$rating);
        }
        return $query->get();
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return 1; 
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
    public function store(Request $req)
    {
        //
        $recipe = new Recipe;
        $recipe->title = $req->recipe['title'];
        $recipe->persons = $req->recipe['persons'];
        $recipe->time = $req->recipe['time'];
        $recipe->instruction = $req->recipe['instruction'];
        $recipe->type = $req->recipe['type'];
        $recipe->user_id = Auth::id();
        $recipe->save();
        foreach ($req->products as $product) {
            $recipe->products()->attach($product['id'],['amount'=>$product['amount']]);
        }
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
            array_push($products,[
                'id'=>$product->id,
                'name'=>$product->name,
                'amount'=>$product->pivot->amount,
                'type'=>$product->type
                ]);
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
        return $id;
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
        else{
            if(Auth::check()){
                $recipe=Recipe::findOrFail($id);
                $recipe->title = $req->recipe['title'];
                $recipe->persons = $req->recipe['persons'];
                $recipe->time = $req->recipe['time'];
                $recipe->instruction = $req->recipe['instruction'];
                $recipe->type = $req->recipe['type'];
                $recipe->save();
                foreach ($req->products as $product) {
                    if($product['amount']==0){
                        $recipe->products()->detach($product['id']);
                    }
                    else{
                        if($recipe->products()->where('id',$product['id'])->count()==0) {
                            $recipe->products()->attach($product['id'],['amount'=>$product['amount']]);
                        }
                        $recipe->products()->updateExistingPivot($product['id'],['amount'=>$product['amount']]);
                    }
                }
            }
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
