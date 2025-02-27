<?php

namespace App\Http\Controllers;

use App\Models\StavkaIzdatnice;
use App\Models\Izdatnica;
use App\Models\Artikl;
use Illuminate\Http\Request;

class StavkaIzdatniceController extends Controller
{
    // Prikaz svih stavki izdatnice
    public function index()
    {
        $stavke = StavkaIzdatnice::with(['izdatnica', 'artikl'])->get();
        return view('stavke_izdatnice.index', compact('stavke'));
    }

    // Prikaz forme za kreiranje nove stavke izdatnice
    public function create()
    {
        $izdatnice = Izdatnica::all();
        $artikli = Artikl::all();
        return view('stavke_izdatnice.create', compact('izdatnice', 'artikli'));
    }

    // Spremanje nove stavke izdatnice
    public function store(Request $request)
    {
        $request->validate([
            'izdatnica_id' => 'required|exists:izdatnice,id',
            'artikl_id' => 'required|exists:artikli,id',
            'kolicina' => 'required|integer|min:1',
            'cijena' => 'required|numeric|min:0',
            'popust' => 'nullable|numeric|min:0|max:100',
        ]);

        StavkaIzdatnice::create($request->all());
        return redirect()->route('stavke_izdatnice.index')->with('success', 'Stavka izdatnice je uspješno kreirana.');
    }

    // Prikaz pojedinačne stavke izdatnice
    public function show(StavkaIzdatnice $stavkaIzdatnice)
    {
        return view('stavke_izdatnice.show', compact('stavkaIzdatnice'));
    }

    // Prikaz forme za uređivanje stavke izdatnice
    public function edit(StavkaIzdatnice $stavkaIzdatnice)
    {
        $izdatnice = Izdatnica::all();
        $artikli = Artikl::all();
        return view('stavke_izdatnice.edit', compact('stavkaIzdatnice', 'izdatnice', 'artikli'));
    }

    // Ažuriranje stavke izdatnice
    public function update(Request $request, StavkaIzdatnice $stavkaIzdatnice)
    {
        $request->validate([
            'izdatnica_id' => 'required|exists:izdatnice,id',
            'artikl_id' => 'required|exists:artikli,id',
            'kolicina' => 'required|integer|min:1',
            'cijena' => 'required|numeric|min:0',
            'popust' => 'nullable|numeric|min:0|max:100',
        ]);

        $stavkaIzdatnice->update($request->all());
        return redirect()->route('stavke_izdatnice.index')->with('success', 'Stavka izdatnice je uspješno ažurirana.');
    }

    // Brisanje stavke izdatnice
    public function destroy(StavkaIzdatnice $stavkaIzdatnice)
    {
        $stavkaIzdatnice->delete();
        return redirect()->route('stavke_izdatnice.index')->with('success', 'Stavka izdatnice je uspješno obrisana.');
    }
}