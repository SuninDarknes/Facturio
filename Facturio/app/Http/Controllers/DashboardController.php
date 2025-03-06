<?php


namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Racun;
use App\Models\Primka;
use Illuminate\Http\Request;


class DashboardController extends Controller
{

    public function index()
    {
        $racuni = Racun::all();
        $primke = Primka::all();
        return Inertia::render('dashboard', 
    [
        'racuni' => $racuni,
        'primke' => $primke,
    ]);
    }
}
