<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCashCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cash_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('credit_type_id');
            $table->string('credit_number');
            $table->string('security_code');
            $table->string('expiration_month');
            $table->string('expiration_year');
            $table->string('card_holder');
            $table->timestamps();
            $table->foreignId('updated_by')->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cash_cards');
    }
}
