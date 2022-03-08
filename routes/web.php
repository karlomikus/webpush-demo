<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotificationManagerController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/notifications/subscribe', [NotificationManagerController::class, 'subscribe']);
Route::post('/notifications/unsubscribe', [NotificationManagerController::class, 'unsubscribe']);
Route::get('/notifications/send', [NotificationManagerController::class, 'send']);
