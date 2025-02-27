<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Osoba;
use Illuminate\Http\Request;

class OsobaController extends Controller
{
    // Prikaz stranice s osobama
    public function index()
    {
        $osobe = Osoba::all();
        return Inertia::render('osobe', [
            'osobe' => $osobe,
        ]);
    }

    // Spremanje nove osobe
    public function store(Request $request)
    {
        $request->validate([
            'ime' => 'required|string|max:255',
            'prezime' => 'required|string|max:255',
            'adresa' => 'nullable|string|max:255',
            'kontakt' => 'nullable|string|max:255',
        ]);

        Osoba::create($request->all());

        return redirect()->route('osobe.index')->with('success', 'Osoba je uspješno dodana.');
    }

    // Ažuriranje osobe
    public function update(Request $request, Osoba $osoba)
    {
        $request->validate([
            'ime' => 'required|string|max:255',
            'prezime' => 'required|string|max:255',
            'adresa' => 'nullable|string|max:255',
            'kontakt' => 'nullable|string|max:255',
        ]);

        $osoba->update($request->all());
        return redirect()->route('osobe.index')->with('success', 'Osoba je uspješno ažurirana.');
    }

    // Soft delete osobe
    public function destroy(Osoba $osoba)
    {
        $osoba->delete();
        return redirect()->route('osobe.index')->with('success', 'Osoba je uspješno obrisana.');
    }
}