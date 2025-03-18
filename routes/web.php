<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
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
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
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

Route::get('/artikli', [ArtiklController::class, 'index'])->name('artikli.index');
Route::post('/artikli', [ArtiklController::class, 'store'])->name('artikli.store');
Route::put('/artikli/{artikl}', [ArtiklController::class, 'update'])->name('artikli.update');
Route::delete('/artikli/{artikl}', [ArtiklController::class, 'destroy'])->name('artikli.destroy');

Route::get('/primke', [PrimkaController::class, 'index'])->name('primke.index');
Route::post('/primke', [PrimkaController::class, 'store'])->name('primke.store');
Route::put('/primke/{primka}', [PrimkaController::class, 'update'])->name('primke.update');
Route::delete('/primke/{primka}', [PrimkaController::class, 'destroy'])->name('primke.destroy');

Route::get('/izdatnice', [IzdatnicaController::class, 'index'])->name('izdatnice.index');
Route::post('/izdatnice', [IzdatnicaController::class, 'store'])->name('izdatnice.store');
Route::put('/izdatnice/{izdatnica}', [IzdatnicaController::class, 'update'])->name('izdatnice.update');
Route::delete('/izdatnice/{izdatnica}', [IzdatnicaController::class, 'destroy'])->name('izdatnice.destroy');


Route::get('/racuni', [RacunController::class, 'index'])->name('racuni.index');
Route::post('/racuni', [RacunController::class, 'store'])->name('racuni.store');
Route::put('/racuni/{racun}', [RacunController::class, 'update'])->name('racuni.update');
Route::delete('/racuni/{racun}', [RacunController::class, 'destroy'])->name('racuni.destroy');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
