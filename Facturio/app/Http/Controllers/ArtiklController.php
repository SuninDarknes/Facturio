<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Artikl;
use App\Models\Cijena;
use App\Models\Skladiste;
use Illuminate\Http\Request;

class ArtiklController extends Controller
{
    // Prikaz stranice s artiklima
    public function index()
    {
        $artikli = Artikl::with(relations: [
            'cijene' => function ($query) {
                $query->orderBy('created_at', 'desc')->limit(1);
            }
        ])->get();
        return Inertia::render('artikli', [
            'artikli' => $artikli,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'naziv' => 'required|string|max:255',
            'opis' => 'nullable|string',
            'cijena' => 'required|numeric|min:0',
        ]);

        $artikl = Artikl::create($request->only('naziv', 'opis'));

        Cijena::create([
            'artikl_id' => $artikl->id,
            'cijena' => $request->cijena,
            'datum' => now(),
        ]);

        Skladiste::create([
            'artikl_id' => $artikl->id,
            'kolicina' => 0,
        ]);

        // Vrati ažurirane podatke o artiklima
        $artikli = Artikl::all();
        return redirect()->back()->with('artikli', $artikli)->with('success', 'Artikl je uspješno dodan.');
    }
    // Ažuriranje artikla
    public function update(Request $request, Artikl $artikl)
    {
        $request->validate([
            'naziv' => 'required|string|max:255',
            'opis' => 'nullable|string',
            'cijena' => 'required|numeric|min:0',
        ]);

        $artikl->update($request->only('naziv', 'opis'));
        
        Cijena::create([
            'artikl_id' => $artikl->id,
            'cijena' => $request->cijena,
            'datum' => now(),
        ]);

        return redirect()->route('artikli.index')->with('success', 'Artikl je uspješno ažuriran.');
    }

    // Soft delete artikla
    public function destroy(Artikl $artikl)
    {
        $artikl->delete();
        return redirect()->route('artikli.index')->with('success', 'Artikl je uspješno obrisan.');
    }
}