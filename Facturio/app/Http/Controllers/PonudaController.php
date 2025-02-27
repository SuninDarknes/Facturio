<?php

namespace App\Http\Controllers;

use App\Models\Ponuda;
use App\Models\Osoba;
use Illuminate\Http\Request;

class PonudaController extends Controller
{
    // Prikaz svih ponuda
    public function index()
    {
        $ponude = Ponuda::with('osoba')->get();
        return view('ponude.index', compact('ponude'));
    }

    // Prikaz forme za kreiranje nove ponude
    public function create()
    {
        $osobe = Osoba::all();
        return view('ponude.create', compact('osobe'));
    }

    // Spremanje nove ponude
    public function store(Request $request)
    {
        $request->validate([
            'osoba_id' => 'required|exists:osobe,id',
            'datum' => 'required|date',
            'ukupna_cijena' => 'required|numeric',
        ]);

        Ponuda::create($request->all());
        return redirect()->route('ponude.index')->with('success', 'Ponuda je uspješno kreirana.');
    }

    // Prikaz pojedinačne ponude
    public function show(Ponuda $ponuda)
    {
        return view('ponude.show', compact('ponuda'));
    }

    // Prikaz forme za uređivanje ponude
    public function edit(Ponuda $ponuda)
    {
        $osobe = Osoba::all();
        return view('ponude.edit', compact('ponuda', 'osobe'));
    }

    // Ažuriranje ponude
    public function update(Request $request, Ponuda $ponuda)
    {
        $request->validate([
            'osoba_id' => 'required|exists:osobe,id',
            'datum' => 'required|date',
            'ukupna_cijena' => 'required|numeric',
        ]);

        $ponuda->update($request->all());
        return redirect()->route('ponude.index')->with('success', 'Ponuda je uspješno ažurirana.');
    }

    // Brisanje ponude
    public function destroy(Ponuda $ponuda)
    {
        $ponuda->delete();
        return redirect()->route('ponude.index')->with('success', 'Ponuda je uspješno obrisana.');
    }
}