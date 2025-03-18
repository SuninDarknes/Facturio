<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Izdatnica;
use App\Models\StavkaIzdatnice;
use App\Models\Dobavljac;
use App\Models\Artikl;
use App\Models\Skladiste;
use Illuminate\Http\Request;

class IzdatnicaController extends Controller
{
    // Prikaz stranice s izdatnicama
    public function index()
    {
        $izdatnice = Izdatnica::with([
            'dobavljac' => function ($query) {
                $query->withTrashed();
            },
            'stavke.artikl'
        ])->get();

        $dobavljaci = Dobavljac::all();
        $artikli = Artikl::with(['cijene' => function ($query) {
            $query->orderBy('created_at', 'desc')->limit(1);
        }])->get();

        return Inertia::render('izdatnice', [
            'izdatnice' => $izdatnice,
            'dobavljaci' => $dobavljaci,
            'artikli' => $artikli,
        ]);
    }

    // Spremanje nove izdatnice
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
            $request['ukupna_cijena'] += $stavka['kolicina'] * $stavka['cijena'] * (1 - $stavka['popust'] / 100) * (1 + $request['pdv'] / 100);
        }

        // Kreiraj izdatnicu
        $izdatnica = Izdatnica::create($request->only('naziv', 'dobavljac_id', 'datum', 'pdv', 'ukupna_cijena'));

        // Dodaj stavke izdatnice
        foreach ($request->stavke as $stavka) {
            StavkaIzdatnice::create([
                'izdatnica_id' => $izdatnica->id,
                'artikl_id' => $stavka['artikl_id'],
                'kolicina' => $stavka['kolicina'],
                'cijena' => $stavka['cijena'],
                'popust' => $stavka['popust'] ?? 0,
            ]);

            Skladiste::where('artikl_id', $stavka['artikl_id'])->decrement('kolicina', $stavka['kolicina']);
        }

        return redirect()->back()->with('success', 'Izdatnica je uspješno dodana.');
    }

    // Ažuriranje izdatnice
    public function update(Request $request, Izdatnica $izdatnica)
    {
        $request->validate([
            'naziv' => 'required|string|max:100',
            'dobavljac_id' => 'required|exists:dobavljaci,id',
            'datum' => 'required|date',
            'ukupna_cijena' => 'required|numeric',
        ]);

        $izdatnica->update($request->all());
        return redirect()->route('izdatnice.index')->with('success', 'Izdatnica je uspješno ažurirana.');
    }

    // Soft delete izdatnice
    public function destroy(Izdatnica $izdatnica)
    {
        $izdatnica->delete();
        return redirect()->route('izdatnice.index')->with('success', 'Izdatnica je uspješno obrisana.');
    }
}