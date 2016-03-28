<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::match(['get', 'post'], '/', 'HomeController@index');

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    //
});

Route::match(['get', 'post'], '/partone', 'SiteController@partOne');
Route::match(['get', 'post'], '/parttwo', 'SiteController@partTwo');


Route::get('/lawn/{id}', 'LawnController@getIndex');
Route::post('/lawn', 'LawnController@postIndex');
Route::post('/lawn/{id}/execute', 'LawnController@postExecute');
Route::resource('lawn','LawnController',['only' => [
    'destroy'
]]);




Route::resource('lawn.mower','MowersController',['only' => [
    'destroy','store','show','update'
]]);
