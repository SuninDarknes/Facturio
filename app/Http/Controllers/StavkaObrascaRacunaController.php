<?php

namespace App\Http\Controllers;

use App\Models\StavkaObrascaRacuna;
use App\Models\ObrazacRacuna;
use App\Models\Artikl;
use Illuminate\Http\Request;

class StavkaObrascaRacunaController extends Controller
{
    // Prikaz svih stavki obrasca računa
    public function index()
    {
        $stavke = StavkaObrascaRacuna::with(['obrazac', 'artikl'])->get();
        return view('stavke_obrasca_racuna.index', compact('stavke'));
    }

    // Prikaz forme za kreiranje nove stavke obrasca računa
    public function create()
    {
        $obrasci = ObrazacRacuna::all();
        $artikli = Artikl::all();
        return view('stavke_obrasca_racuna.create', compact('obrasci', 'artikli'));
    }

    // Spremanje nove stavke obrasca računa
    public function store(Request $request)
    {
        $request->validate([
            'obrazac_id' => 'required|exists:obrasci_racuna,id',
            'artikl_id' => 'required|exists:artikli,id',
            'kolicina' => 'required|integer|min:1',
            'cijena' => 'required|numeric|min:0',
        ]);

        StavkaObrascaRacuna::create($request->all());
        return redirect()->route('stavke_obrasca_racuna.index')->with('success', 'Stavka obrasca računa je uspješno kreirana.');
    }

    // Prikaz pojedinačne stavke obrasca računa
    public function show(StavkaObrascaRacuna $stavkaObrascaRacuna)
    {
        return view('stavke_obrasca_racuna.show', compact('stavkaObrascaRacuna'));
    }

    // Prikaz forme za uređivanje stavke obrasca računa
    public function edit(StavkaObrascaRacuna $stavkaObrascaRacuna)
    {
        $obrasci = ObrazacRacuna::all();
        $artikli = Artikl::all();
        return view('stavke_obrasca_racuna.edit', compact('stavkaObrascaRacuna', 'obrasci', 'artikli'));
    }

    // Ažuriranje stavke obrasca računa
    public function update(Request $request, StavkaObrascaRacuna $stavkaObrascaRacuna)
    {
        $request->validate([
            'obrazac_id' => 'required|exists:obrasci_racuna,id',
            'artikl_id' => 'required|exists:artikli,id',
            'kolicina' => 'required|integer|min:1',
            'cijena' => 'required|numeric|min:0',
        ]);

        $stavkaObrascaRacuna->update($request->all());
        return redirect()->route('stavke_obrasca_racuna.index')->with('success', 'Stavka obrasca računa je uspješno ažurirana.');
    }

    // Brisanje stavke obrasca računa
    public function destroy(StavkaObrascaRacuna $stavkaObrascaRacuna)
    {
        $stavkaObrascaRacuna->delete();
        return redirect()->route('stavke_obrasca_racuna.index')->with('success', 'Stavka obrasca računa je uspješno obrisana.');
    }
}