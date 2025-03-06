<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Racun;
use App\Models\StavkaRacuna;
use App\Models\Osoba;
use App\Models\Artikl;
use Illuminate\Http\Request;

class RacunController extends Controller
{
    // Prikaz stranice s računima
    public function index()
    {
        $racuni = Racun::with([
            'osoba' => function ($query) {
                $query->withTrashed();
            },
            'stavke.artikl'
        ])->get();

        $osobe = Osoba::all();
        $artikli = Artikl::with(relations: ['cijene' => function ($query) {
            $query->orderBy('created_at', 'desc')->limit(1);
        }])->get();

        foreach($racuni as $racun){
            $racun->ukupna_cijena = 0;
            foreach($racun->stavke as $stavka){
                $racun->ukupna_cijena += $stavka->kolicina * $stavka->cijena * (1 - $stavka->popust / 100) * (1 + $racun->pdv / 100);
            }
        }

        return Inertia::render('racuni', [
            'racuni' => $racuni,
            'osobe' => $osobe,
            'artikli' => $artikli,
        ]);
    }

    // Spremanje novog računa
    public function store(Request $request)
    {
        $request->validate([
            'naziv' => 'required|string|max:100',
            'osoba_id' => 'required|exists:osobe,id',
            'datum' => 'required|date',
            'pdv' => 'required|numeric',
            'nacin_placanja' => 'required|string|max:100',
            'rok_placanja' => 'required|date',
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

        // Kreiraj račun
        $racun = Racun::create($request->only('naziv', 'osoba_id','ukupna_cijena', 'datum','pdv', 'nacin_placanja', 'rok_placanja', 'ukupna_cijena'));

        // Dodaj stavke računa
        foreach ($request->stavke as $stavka) {
            StavkaRacuna::create([
                'racun_id' => $racun->id,
                'artikl_id' => $stavka['artikl_id'],
                'kolicina' => $stavka['kolicina'],
                'cijena' => $stavka['cijena'],
                'popust' => $stavka['popust'] ?? 0,
            ]);
        }

        return redirect()->back()->with('success', 'Račun je uspješno dodan.');
    }

    // Ažuriranje računa
    public function update(Request $request, Racun $racun)
    {
        $request->validate([
            'naziv' => 'required|string|max:100',
            'osoba_id' => 'required|exists:osobe,id',
            'datum' => 'required|date',
            'ukupna_cijena' => 'required|numeric',
        ]);

        $racun->update($request->all());
        return redirect()->route('racuni.index')->with('success', 'Račun je uspješno ažuriran.');
    }

    // Soft delete računa
    public function destroy(Racun $racun)
    {
        $racun->delete();
        return redirect()->route('racuni.index')->with('success', 'Račun je uspješno obrisan.');
    }
}