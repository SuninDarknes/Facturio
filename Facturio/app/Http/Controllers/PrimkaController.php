<?php

namespace App\Http\Controllers;

use App\Models\Primka;
use App\Models\Dobavljac;
use Illuminate\Http\Request;

class PrimkaController extends Controller
{
    // Prikaz svih primki
    public function index()
    {
        $primke = Primka::with('dobavljac')->get();
        return view('primke.index', compact('primke'));
    }

    // Prikaz forme za kreiranje nove primke
    public function create()
    {
        $dobavljaci = Dobavljac::all();
        return view('primke.create', compact('dobavljaci'));
    }

    // Spremanje nove primke
    public function store(Request $request)
    {
        $request->validate([
            'dobavljac_id' => 'required|exists:dobavljaci,id',
            'datum' => 'required|date',
            'ukupna_cijena' => 'required|numeric',
        ]);

        Primka::create($request->all());
        return redirect()->route('primke.index')->with('success', 'Primka je uspješno kreirana.');
    }

    // Prikaz pojedinačne primke
    public function show(Primka $primka)
    {
        return view('primke.show', compact('primka'));
    }

    // Prikaz forme za uređivanje primke
    public function edit(Primka $primka)
    {
        $dobavljaci = Dobavljac::all();
        return view('primke.edit', compact('primka', 'dobavljaci'));
    }

    // Ažuriranje primke
    public function update(Request $request, Primka $primka)
    {
        $request->validate([
            'dobavljac_id' => 'required|exists:dobavljaci,id',
            'datum' => 'required|date',
            'ukupna_cijena' => 'required|numeric',
        ]);

        $primka->update($request->all());
        return redirect()->route('primke.index')->with('success', 'Primka je uspješno ažurirana.');
    }

    // Brisanje primke
    public function destroy(Primka $primka)
    {
        $primka->delete();
        return redirect()->route('primke.index')->with('success', 'Primka je uspješno obrisana.');
    }
}