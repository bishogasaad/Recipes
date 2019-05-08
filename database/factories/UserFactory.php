<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\User::class, function (Faker $faker) {
    return [
        'id'=>$faker->uuid,
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => Hash::make('password'),
        'remember_token' => str_random(10),
    ];
});
$factory->define(App\Recipe::class, function (Faker $faker) {
    $min=$faker->numberBetween(10,59)/100;
    $hour=$faker->numberBetween(0,3);
    $time=$hour+$min;
    $id=App\User::all()[$faker->numberBetween(0,4)]->id;
    return [
        'title' =>str_replace(' ', '-', $faker->unique()->words(6,true)),
        'persons'=>$faker->numberBetween(1,10),
        'time'=>$time,
        'instruction'=>$faker->realText,
        'user_id'=>$id,
        'type'=>$faker->numberBetween(0,4)
    ];
});
$factory->define(App\Product::class, function (Faker $faker) {
    $temp=$faker->randomElement(array('gm','kg','ml','pack','bottle'));
    $json=[];$price=0;
    if($temp==='gm')
    {$json=[50,100,300,500];$price=$faker->randomFloat(2,10,100);}
    if($temp==='kg')
    {$json=[1,2.5,5,7.5,10];$price=$faker->randomFloat(0,5,200);}
    if($temp==='pack')
    {$json=[1,3,5];$price=$faker->randomFloat(2,10,20);}
    if($temp==='ml')
    {$json=[225,350,500,1000];$price=$faker->randomFloat(1,2,20);}
    if($temp==='bottle')
    {$json=[1,2,3,5];$price=$faker->randomFloat(1,3,25);}
    return [
        'name' =>str_replace(' ', '-', $faker->unique()->words(2,true)),
        'company' => $faker->optional()->words(2,true),
        'description'=>$faker->sentence(8),
        'type'=>$temp,
        'multiples'=>json_encode($json),
        'price'=>$price,
        'quantity'=>$faker->numberBetween(0,50)
    ];
});
