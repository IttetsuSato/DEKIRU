<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      for($i = 1; $i<= 10; $i++){
        DB::table('users')->insert([
          'name'      => 'テストユーザー'.$i,
          'first_name' => 'テスト',
          'last_name' => 'ユーザー'.$i,
          'ages' => $i + 24,
          'birthday' => '2000-05-01',
          'user_name' => 'testUser'.$i,
          'password'  => Hash::make('12345678'),
          'email'     => 'test'.$i.'@test.com',
          'address' => 'テストタウン2-1',
          'sex' => 1,
          'authority' => 1,
          'created_at'     => now(),
          'updated_at'     => now(),
        ]);
      }
    }
}
