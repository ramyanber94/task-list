<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ListController;
use App\Http\Controllers\Api\ItemsController;


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


Route::controller(ListController::class)->group(function () {
    Route::get('/getlists', 'index');
    Route::post('/addlist', 'store');
});
 

Route::controller(ItemsController::class)->group(function () {
    Route::get('/getitems/{list_id}', 'show');
    Route::post('/additem', 'store');
});


