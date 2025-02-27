<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ArtiklController;
use App\Http\Controllers\PrimkaController;
use App\Http\Controllers\IzdatnicaController;
use App\Http\Controllers\PonudaController;
use App\Http\Controllers\RacunController;
use App\Http\Controllers\ObrazacRacunaController;
use App\Http\Controllers\OsobaController;
use App\Http\Controllers\DobavljacController;
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Prikaz stranice s dobavljačima
Route::get('/dobavljaci', [DobavljacController::class, 'index'])->name('dobavljaci.index');
Route::post('/dobavljaci', [DobavljacController::class, 'store'])->name('dobavljaci.store');
Route::put('/dobavljaci/{dobavljac}', [DobavljacController::class, 'update'])->name('dobavljaci.update');
Route::delete('/dobavljaci/{dobavljac}', [DobavljacController::class, 'destroy'])->name('dobavljaci.destroy');

Route::get('/osobe', [OsobaController::class, 'index'])->name('osobe.index');
Route::post('/osobe', [OsobaController::class, 'store'])->name('osobe.store');
Route::put('/osobe/{osoba}', [OsobaController::class, 'update'])->name('osobe.update');
Route::delete('/osobe/{osoba}', [OsobaController::class, 'destroy'])->name('osobe.destroy');

Route::get('/artikl', [ArtiklController::class, 'index'])->name('artikli.index');
Route::post('/artikl', [ArtiklController::class, 'store'])->name('artikli.store');
Route::put('/artikl/{osoba}', [ArtiklController::class, 'update'])->name('artikli.update');
Route::delete('/artikl/{osoba}', [ArtiklController::class, 'destroy'])->name('artikli.destroy');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
