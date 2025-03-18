<?php

namespace App\Http\Controllers;

use App\Models\StavkaRacuna;
use App\Models\Racun;
use App\Models\Artikl;
use Illuminate\Http\Request;

class StavkaRacunaController extends Controller
{
    // Prikaz svih stavki računa
    public function index()
    {
        $stavke = StavkaRacuna::with(['racun', 'artikl'])->get();
        return view('stavke_racuna.index', compact('stavke'));
    }

    // Prikaz forme za kreiranje nove stavke računa
    public function create()
    {
        $racuni = Racun::all();
        $artikli = Artikl::all();
        return view('stavke_racuna.create', compact('racuni', 'artikli'));
    }

    // Spremanje nove stavke računa
    public function store(Request $request)
    {
        $request->validate([
            'racun_id' => 'required|exists:racuni,id',
            'artikl_id' => 'required|exists:artikli,id',
            'kolicina' => 'required|integer|min:1',
            'cijena' => 'required|numeric|min:0',
            'popust' => 'nullable|numeric|min:0|max:100',
            'porez' => 'nullable|numeric|min:0',
        ]);

        StavkaRacuna::create($request->all());
        return redirect()->route('stavke_racuna.index')->with('success', 'Stavka računa je uspješno kreirana.');
    }

    // Prikaz pojedinačne stavke računa
    public function show(StavkaRacuna $stavkaRacuna)
    {
        return view('stavke_racuna.show', compact('stavkaRacuna'));
    }

    // Prikaz forme za uređivanje stavke računa
    public function edit(StavkaRacuna $stavkaRacuna)
    {
        $racuni = Racun::all();
        $artikli = Artikl::all();
        return view('stavke_racuna.edit', compact('stavkaRacuna', 'racuni', 'artikli'));
    }

    // Ažuriranje stavke računa
    public function update(Request $request, StavkaRacuna $stavkaRacuna)
    {
        $request->validate([
            'racun_id' => 'required|exists:racuni,id',
            'artikl_id' => 'required|exists:artikli,id',
            'kolicina' => 'required|integer|min:1',
            'cijena' => 'required|numeric|min:0',
            'popust' => 'nullable|numeric|min:0|max:100',
            'porez' => 'nullable|numeric|min:0',
        ]);

        $stavkaRacuna->update($request->all());
        return redirect()->route('stavke_racuna.index')->with('success', 'Stavka računa je uspješno ažurirana.');
    }

    // Brisanje stavke računa
    public function destroy(StavkaRacuna $stavkaRacuna)
    {
        $stavkaRacuna->delete();
        return redirect()->route('stavke_racuna.index')->with('success', 'Stavka računa je uspješno obrisana.');
    }
}