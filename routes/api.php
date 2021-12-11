<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\BankController;
use App\Http\Controllers\Api\CashCardController;
use App\Http\Controllers\Api\CashFlowController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\IdentificationController;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\QuestionController;
use App\Http\Controllers\Api\ValueController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['middleware' => 'api'], function(){
  Route::resource('users', UserController::class, ['except' => ['create', 'edit']]);
  Route::get('posts', 'App\Http\Controllers\Api\PostController@index');
  Route::post('post/create', 'App\Http\Controllers\Api\PostController@create');
  Route::post('edit', 'App\Http\Controllers\Api\PostController@edit');
  Route::post('update', 'App\Http\Controllers\Api\PostController@update');

});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
