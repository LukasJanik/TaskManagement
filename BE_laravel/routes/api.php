<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
Use App\Http\Controllers\UserController;
Use App\Http\Controllers\TaskController;

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

//    Route::middleware('auth:api')->get('/user', function (Request $request) {
//        return $request->user();
//    });

Route::put('users/{id}', 'UserController@upsert');
Route::get('tasks/{id}', 'TaskController@getTasks');
Route::post('tasks/{id}', 'TaskController@addTask');
Route::delete('tasks/{id}', 'TaskController@removeTask');
Route::put('tasks/{id}', 'TaskController@updateTask');
