<?php


namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Dobavljac;
use Illuminate\Http\Request;

class DobavljacController extends Controller
{
    // Prikaz stranice s dobavljačima
    public function index()
    {
        $dobavljaci = Dobavljac::all();
        return Inertia::render('dobavljaci', [
            'dobavljaci' => $dobavljaci,
        ]);
    }

    // Spremanje novog dobavljača
    public function store(Request $request)
    {
        $request->validate([
            'naziv' => 'required|string|max:255',
            'adresa' => 'nullable|string|max:255',
            'kontakt' => 'nullable|string|max:255',
        ]);

        Dobavljac::create($request->all());

        return redirect()->route('dobavljaci.index')->with('success', 'Dobavljač je uspješno dodan.');
    }
    
    public function update(Request $request, Dobavljac $dobavljac)
    {
        $request->validate([
            'naziv' => 'required|string|max:255',
            'adresa' => 'nullable|string|max:255',
            'kontakt' => 'nullable|string|max:255',
        ]);

        $dobavljac->update($request->all());
        return redirect()->route('dobavljaci.index')->with('success', 'Dobavljač je uspješno ažuriran.');
    }

    // Soft delete dobavljača
    public function destroy(Dobavljac $dobavljac)
    {
        $dobavljac->delete();
        return redirect()->route('dobavljaci.index')->with('success', 'Dobavljač je uspješno obrisan.');
    }
}