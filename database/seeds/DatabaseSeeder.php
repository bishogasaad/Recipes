<?php

use Illuminate\Database\Seeder;
use Faker\Generator as Faker;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        // $this->call(UsersTableSeeder::class);
        factory(App\Product::class,50)->create();
        factory(App\User::class,5)->create();
        factory(App\Recipe::class,50)->create();
        $recipes=App\Recipe::all();
        foreach ($recipes as $recipe) {
            $num=$faker->numberBetween(1,40);
            $array=array();
            for($i=0;$i<$num;$i++)
            {
                $temp=$faker->numberBetween(1,50);
                if(!in_array($temp, $array))
                {   
                    $pivot_array=array('amount'=>$faker->numberBetween(20,500));
                    $array[$temp]=$pivot_array;
                }
            }
            $recipe->products()->sync($array);
        }

    }
}
