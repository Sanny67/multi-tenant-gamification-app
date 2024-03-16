<?php

use App\Http\Controllers\API\TenantController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::apiResource('users', UserController::class);
Route::post('user/register', [UserController::class, 'store'])->name('user.register');
Route::post('user/award-xp', [UserController::class, 'awardXP'])->name('user.awardXP');

Route::get('users/{slug}', [UserController::class, 'index'])->name('tenant.leaderboard');
Route::get('tenants', [TenantController::class, 'index'])->name('tenant.all');
Route::get('tenant/{slug}', [TenantController::class, 'show'])->name('tenant.get');
Route::post('tenant/login', [TenantController::class, 'login'])->name('tenant.login');
Route::post('tenant/logout', [TenantController::class, 'logout'])->name('tenant.logout');
