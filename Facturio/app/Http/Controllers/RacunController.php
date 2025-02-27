<?php

namespace App\Http\Controllers;

use App\Models\Racun;
use App\Models\Ponuda;
use App\Models\Osoba;
use Illuminate\Http\Request;

class RacunController extends Controller
{
    // Prikaz svih računa
    public function index()
    {
        $racuni = Racun::with(['ponuda', 'osoba'])->get();
        return view('racuni.index', compact('racuni'));
    }

    // Prikaz forme za kreiranje novog računa
    public function create()
    {
        $ponude = Ponuda::all();
        $osobe = Osoba::all();
        return view('racuni.create', compact('ponude', 'osobe'));
    }

    // Spremanje novog računa
    public function store(Request $request)
    {
        $request->validate([
            'ponuda_id' => 'nullable|exists:ponude,id',
            'osoba_id' => 'required|exists:osobe,id',
            'datum' => 'required|date',
            'nacin_placanja' => 'required|string',
            'rok_placanja' => 'nullable|date',
            'dostava' => 'nullable|string',
            'porez' => 'nullable|numeric|min:0',
        ]);

        Racun::create($request->all());
        return redirect()->route('racuni.index')->with('success', 'Račun je uspješno kreiran.');
    }

    // Prikaz pojedinačnog računa
    public function show(Racun $racun)
    {
        return view('racuni.show', compact('racun'));
    }

    // Prikaz forme za uređivanje računa
    public function edit(Racun $racun)
    {
        $ponude = Ponuda::all();
        $osobe = Osoba::all();
        return view('racuni.edit', compact('racun', 'ponude', 'osobe'));
    }

    // Ažuriranje računa
    public function update(Request $request, Racun $racun)
    {
        $request->validate([
            'ponuda_id' => 'nullable|exists:ponude,id',
            'osoba_id' => 'required|exists:osobe,id',
            'datum' => 'required|date',
            'nacin_placanja' => 'required|string',
            'rok_placanja' => 'nullable|date',
            'dostava' => 'nullable|string',
            'porez' => 'nullable|numeric|min:0',
        ]);

        $racun->update($request->all());
        return redirect()->route('racuni.index')->with('success', 'Račun je uspješno ažuriran.');
    }

    // Brisanje računa
    public function destroy(Racun $racun)
    {
        $racun->delete();
        return redirect()->route('racuni.index')->with('success', 'Račun je uspješno obrisan.');
    }
}