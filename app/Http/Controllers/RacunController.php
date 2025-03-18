<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Racun;
use App\Models\Osoba;
use App\Models\Artikl;
use App\Services\RacunService;
use App\Http\Requests\StoreRacunRequest;
use App\Http\Requests\UpdateRacunRequest;

class RacunController extends Controller
{
    protected $racunService;

    public function __construct(RacunService $racunService)
    {
        $this->racunService = $racunService;
    }

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
        $artikli = Artikl::with(['cijene' => function ($query) {
            $query->orderBy('created_at', 'desc')->limit(1);
        }])->get();

        foreach ($racuni as $racun) {
            $racun->ukupna_cijena = $this->racunService->calculateTotalPrice(
                $racun->stavke->toArray(),
                $racun->pdv
            );
        }

        return Inertia::render('racuni', [
            'racuni' => $racuni,
            'osobe' => $osobe,
            'artikli' => $artikli,
        ]);
    }

    // Spremanje novog računa
    public function store(StoreRacunRequest $request)
    {
        $racun = $this->racunService->createRacun($request->validated());
        return redirect()->back()->with('success', 'Račun je uspješno dodan.');
    }

    // Ažuriranje računa
    public function update(UpdateRacunRequest $request, Racun $racun)
    {
        $racun->update($request->validated());
        return redirect()->route('racuni.index')->with('success', 'Račun je uspješno ažuriran.');
    }

    // Soft delete računa
    public function destroy(Racun $racun)
    {
        $racun->delete();
        return redirect()->route('racuni.index')->with('success', 'Račun je uspješno obrisan.');
    }
}