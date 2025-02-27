<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Artikl;
use Illuminate\Http\Request;

class ArtiklController extends Controller
{
    // Prikaz stranice s artiklima
    public function index()
    {
        $artikli = Artikl::all();
        return Inertia::render('artikli', [
            'artikli' => $artikli,
        ]);
    }

    // Spremanje novog artikla
    public function store(Request $request)
    {


        $request->validate([
            'naziv' => 'required|string|max:255',
            'opis' => 'nullable|array', // Opis je JSON
            'jedinica_mjere' => 'required|string|max:255',
        ]);
        if ($request->has('opis')) {
            $request->merge([
            'opis' => json_encode($request->input('opis')),
            ]);
        }
        Artikl::create($request->all());

        return redirect()->route('artikli.index')->with('success', 'Artikl je uspješno dodan.');
    }

    // Ažuriranje artikla
    public function update(Request $request, Artikl $artikl)
    {
        $request->validate([
            'naziv' => 'required|string|max:255',
            'opis' => 'nullable|array', // Opis je JSON
            'jedinica_mjere' => 'required|string|max:255',
        ]);

        $artikl->update($request->all());
        return redirect()->route('artikli.index')->with('success', 'Artikl je uspješno ažuriran.');
    }

    // Soft delete artikla
    public function destroy(Artikl $artikl)
    {
        $artikl->delete();
        return redirect()->route('artikli.index')->with('success', 'Artikl je uspješno obrisan.');
    }
}