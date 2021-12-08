<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('first_name'); //名
            $table->string('last_name'); //性
            $table->integer('ages'); //年齢
            $table->date('birthday');
            $table->string('user_name'); //アプリ内ID
            $table->string('password');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('address'); //住所
            $table->integer('sex'); //0: else, 1: man, 2: woman
            $table->foreignId('identification_id')->nullable();
            $table->foreignId('bank_id')->nullable();
            $table->foreignId('cash_id')->nullable();
            $table->foreignId('group_id')->nullable();
            $table->integer('authority');//0: normal, 1: admin
            $table->rememberToken();
            $table->timestamps();
            $table->foreignId('updated_by')->nullable();
            $table->softDeletes($column = 'deleted_at', $precision = 0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
