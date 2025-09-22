<?php

use App\Http\Controllers\AdminAdsController;
use App\Http\Controllers\AdsController;
use App\Http\Controllers\BuyerAdsController;
use App\Http\Controllers\SellerAdsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;


Route::get('/ads', [AdsController::class, 'index'])->name('ads.index');
Route::get('/user', [UsersController::class, 'index']);


Route::middleware(['auth:sanctum', 'role:seller'])->group(function () {
    Route::apiResource('sellerAds', SellerAdsController::class)->only(['index', 'update', 'destroy', 'store']);
    Route::get('/adsPlans', [AdsController::class, 'getPlans'])->name('plans.index');
});


Route::middleware(['auth:sanctum', 'role:admin'])->prefix('adminAds')->group(function () {
    Route::get('/', [AdminAdsController::class, 'index']);       
    Route::patch('/{id}/{status}', [AdminAdsController::class, 'update']); 
});


Route::patch('adsBuyer/update/{id}',[BuyerAdsController::class,"adPay"])->middleware(['auth:sanctum']);
Route::get('ads/prices/{ids}',[AdsController::class,'getPrices']);

require __DIR__.'/auth.php';