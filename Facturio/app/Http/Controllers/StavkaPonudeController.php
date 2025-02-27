<?php

namespace App\Http\Controllers;

use App\Models\StavkaPonude;
use App\Models\Ponuda;
use App\Models\Artikl;
use Illuminate\Http\Request;

class StavkaPonudeController extends Controller
{
    // Prikaz svih stavki ponude
    public function index()
    {
        $stavke = StavkaPonude::with(['ponuda', 'artikl'])->get();
        return view('stavke_ponude.index', compact('stavke'));
    }

    // Prikaz forme za kreiranje nove stavke ponude
    public function create()
    {
        $ponude = Ponuda::all();
        $artikli = Artikl::all();
        return view('stavke_ponude.create', compact('ponude', 'artikli'));
    }

    // Spremanje nove stavke ponude
    public function store(Request $request)
    {
        $request->validate([
            'ponuda_id' => 'required|exists:ponude,id',
            'artikl_id' => 'required|exists:artikli,id',
            'kolicina' => 'required|integer|min:1',
            'cijena' => 'required|numeric|min:0',
            'popust' => 'nullable|numeric|min:0|max:100',
        ]);

        StavkaPonude::create($request->all());
        return redirect()->route('stavke_ponude.index')->with('success', 'Stavka ponude je uspješno kreirana.');
    }

    // Prikaz pojedinačne stavke ponude
    public function show(StavkaPonude $stavkaPonude)
    {
        return view('stavke_ponude.show', compact('stavkaPonude'));
    }

    // Prikaz forme za uređivanje stavke ponude
    public function edit(StavkaPonude $stavkaPonude)
    {
        $ponude = Ponuda::all();
        $artikli = Artikl::all();
        return view('stavke_ponude.edit', compact('stavkaPonude', 'ponude', 'artikli'));
    }

    // Ažuriranje stavke ponude
    public function update(Request $request, StavkaPonude $stavkaPonude)
    {
        $request->validate([
            'ponuda_id' => 'required|exists:ponude,id',
            'artikl_id' => 'required|exists:artikli,id',
            'kolicina' => 'required|integer|min:1',
            'cijena' => 'required|numeric|min:0',
            'popust' => 'nullable|numeric|min:0|max:100',
        ]);

        $stavkaPonude->update($request->all());
        return redirect()->route('stavke_ponude.index')->with('success', 'Stavka ponude je uspješno ažurirana.');
    }

    // Brisanje stavke ponude
    public function destroy(StavkaPonude $stavkaPonude)
    {
        $stavkaPonude->delete();
        return redirect()->route('stavke_ponude.index')->with('success', 'Stavka ponude je uspješno obrisana.');
    }
}