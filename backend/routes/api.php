<?php

use App\Http\Controllers\ImageController;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::middleware(['auth:sanctum'])->post('/image/create', [ImageController::class, 'store']);
Route::middleware(['auth:sanctum'])
    ->group(function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });

        // Route::apiResource('/image', ImageController::class)
        //     ->only(['index', 'store', 'destroy']);
        Route::get('image', [ImageController::class, 'index']);
        Route::post('image', [ImageController::class, 'store']);
        Route::delete('image/{image}', [ImageController::class, 'destroy'])->can('delete-image,image');
    });
