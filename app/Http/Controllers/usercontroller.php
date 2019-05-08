<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
class usercontroller extends Controller
{
    //
    public function index(Request $req)
    {
        if(!$req->has('id'))
            {
                if(Auth::check())
                {   
                    $array=[Auth::user()->name,Auth::user()->id];
                    return $array;
                }
                else 
                {return null;}
            }
        else
        {
            $id=$req->input('id');
            $array=[User::findOrFail($id)->id,User::findOrFail($id)->name];
            return view('user');
        }

    }

    public function recipes(Request $req){
        $id=$req->input('id');
        return User::findOrFail($id)->recipes;
    }

    public function change_pass(Request $req){
        $error=['old'=>false,'repeat'=>false];
        if($req->method()=='GET')
        return view('auth.change_pass',['error' => $error]);
        else {
            $validator = $req->validate([
                'old' => 'required',
                'new' => 'required',
                'repeat'=>'required|same:new'
            ]);
            $credentials = ['email'=>Auth::user()->email,'password'=>$req->input('old')];
            if(Auth::attempt($credentials))
            {
                $req->user()->fill([
                    'password' => Hash::make($req->input('new'))
                ])->save();
                return redirect()->route('user',['name'=>str_replace(' ','-',Auth::user()->name),'id'=>Auth::user()->id]);
            }
            else {
                $error=['old'=>true,'repeat'=>false];
                return view('auth.change_pass',['error' => $error]);
            }
        }
    }

    public function change_name(Request $req)
    {
        if($req->method()=='GET')
        return view('auth.change_name');
        else {
            $req->user()->fill([
                'name' => $req->input('name')
            ])->save();
            return redirect()->route('user',['name'=>str_replace(' ','-',Auth::user()->name),'id'=>Auth::user()->id]);
        }
    }
}
