<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      for($i = 1; $i<= 10; $i++){
        DB::table('questions')->insert([
          'user_id'      => $i,
          'category_id' => 1,
          'title' => 'どうやってこのアプリを使うんですか？',
          'content' => 'どうやってこのアプリを使うんですか？直接教えてください',
          'status' => 1,
          'created_at'     => now(),
          'updated_at'     => now(),
        ]);
      }
    }
}
