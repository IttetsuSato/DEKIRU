<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{

  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
      $categories = ['介護','育児'];
      for ($i = 0; $i < count($categories); $i++){
        DB::table('categories')->insert([
          'category' => $categories[$i],
          'created_at'     => now(),
          'updated_at'     => now(),
        ]);
      }

    }
}
