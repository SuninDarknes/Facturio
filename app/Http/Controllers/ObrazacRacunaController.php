<?php

namespace App\Http\Controllers;

use App\Models\ObrazacRacuna;
use Illuminate\Http\Request;

class ObrazacRacunaController extends Controller
{
    // Prikaz svih obrazaca računa
    public function index()
    {
        $obrasci = ObrazacRacuna::all();
        return view('obrasci_racuna.index', compact('obrasci'));
    }

    // Prikaz forme za kreiranje novog obrasca računa
    public function create()
    {
        return view('obrasci_racuna.create');
    }

    // Spremanje novog obrasca računa
    public function store(Request $request)
    {
        $request->validate([
            'naziv' => 'required|string',
            'opis' => 'nullable|string',
        ]);

        ObrazacRacuna::create($request->all());
        return redirect()->route('obrasci_racuna.index')->with('success', 'Obrazac računa je uspješno kreiran.');
    }

    // Prikaz pojedinačnog obrasca računa
    public function show(ObrazacRacuna $obrazacRacuna)
    {
        return view('obrasci_racuna.show', compact('obrazacRacuna'));
    }

    // Prikaz forme za uređivanje obrasca računa
    public function edit(ObrazacRacuna $obrazacRacuna)
    {
        return view('obrasci_racuna.edit', compact('obrazacRacuna'));
    }

    // Ažuriranje obrasca računa
    public function update(Request $request, ObrazacRacuna $obrazacRacuna)
    {
        $request->validate([
            'naziv' => 'required|string',
            'opis' => 'nullable|string',
        ]);

        $obrazacRacuna->update($request->all());
        return redirect()->route('obrasci_racuna.index')->with('success', 'Obrazac računa je uspješno ažuriran.');
    }

    // Brisanje obrasca računa
    public function destroy(ObrazacRacuna $obrazacRacuna)
    {
        $obrazacRacuna->delete();
        return redirect()->route('obrasci_racuna.index')->with('success', 'Obrazac računa je uspješno obrisan.');
    }
}