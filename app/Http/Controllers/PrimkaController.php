<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Primka;
use App\Models\StavkaPrimke;
use App\Models\Dobavljac;
use App\Models\Artikl;
use App\Models\Skladiste;
use Illuminate\Http\Request;
use Termwind\Components\Li;

class PrimkaController extends Controller
{
    // Prikaz stranice s primkama
    public function index()
    {
        $primke = Primka::with([
            'dobavljac' => function ($query) {
                $query->withTrashed();
            },
            'stavke.artikl'
        ])->get();



        $dobavljaci = Dobavljac::all();
        $artikli = Artikl::with(relations: ['cijene' => function ($query) {
            $query->orderBy('created_at', 'desc')->limit(1);
        }])->get();


        return Inertia::render('primke', [
            'primke' => $primke,
            'dobavljaci' => $dobavljaci,
            'artikli' => $artikli,
        ]);
    }

    // Spremanje nove primke
    public function store(Request $request)
    {
        $request->validate([
            'naziv' => 'required|string|max:100',
            'dobavljac_id' => 'required|exists:dobavljaci,id',
            'datum' => 'required|date',
            'pdv' => 'required|numeric',
            'ukupna_cijena' => 'required|numeric',
            'stavke' => 'required|array',
            'stavke.*.artikl_id' => 'required|exists:artikli,id',
            'stavke.*.kolicina' => 'required|numeric|min:1',
            'stavke.*.cijena' => 'required|numeric|min:0',
            'stavke.*.popust' => 'nullable|numeric|min:0|max:100',
        ]);

        foreach ($request->stavke as $stavka) {
            $request['ukupna_cijena'] += $stavka['kolicina'] * $stavka['cijena'] * (1 - $stavka['popust'] / 100)* (1 + $request['pdv'] / 100);
        }

        // Kreiraj primku
        $primka = Primka::create($request->only('naziv', 'dobavljac_id', 'datum','pdv', 'ukupna_cijena'));

        // Dodaj stavke primke
        foreach ($request->stavke as $stavka) {
            StavkaPrimke::create([
                'primka_id' => $primka->id,
                'artikl_id' => $stavka['artikl_id'],
                'kolicina' => $stavka['kolicina'],
                'cijena' => $stavka['cijena'],
                'popust' => $stavka['popust'] ?? 0,
            ]);

            Skladiste::where('artikl_id', $stavka['artikl_id'])->increment('kolicina', $stavka['kolicina']);
        
        }

        return redirect()->back()->with('success', 'Primka je uspješno dodana.');
    }
    // Ažuriranje primke
    public function update(Request $request, Primka $primka)
    {
        $request->validate([
            'naziv' => 'required|string|max:100',
            'dobavljac_id' => 'required|exists:dobavljaci,id',
            'datum' => 'required|date',
            'ukupna_cijena' => 'required|numeric',
        ]);

        $primka->update($request->all());
        return redirect()->route('primke.index')->with('success', 'Primka je uspješno ažurirana.');
    }

    // Soft delete primke
    public function destroy(Primka $primka)
    {
        $primka->delete();
        return redirect()->route('primke.index')->with('success', 'Primka je uspješno obrisana.');
    }


}