<?php

namespace App\Http\Controllers;

use App\Models\Izdatnica;
use Illuminate\Http\Request;

class IzdatnicaController extends Controller
{
    // Prikaz svih izdatnica
    public function index()
    {
        $izdatnice = Izdatnica::all();
        return view('izdatnice.index', compact('izdatnice'));
    }

    // Prikaz forme za kreiranje nove izdatnice
    public function create()
    {
        return view('izdatnice.create');
    }

    // Spremanje nove izdatnice
    public function store(Request $request)
    {
        $request->validate([
            'datum' => 'required|date',
            'napomena' => 'nullable',
        ]);

        Izdatnica::create($request->all());
        return redirect()->route('izdatnice.index')->with('success', 'Izdatnica je uspješno kreirana.');
    }

    // Prikaz pojedinačne izdatnice
    public function show(Izdatnica $izdatnica)
    {
        return view('izdatnice.show', compact('izdatnica'));
    }

    // Prikaz forme za uređivanje izdatnice
    public function edit(Izdatnica $izdatnica)
    {
        return view('izdatnice.edit', compact('izdatnica'));
    }

    // Ažuriranje izdatnice
    public function update(Request $request, Izdatnica $izdatnica)
    {
        $request->validate([
            'datum' => 'required|date',
            'napomena' => 'nullable',
        ]);

        $izdatnica->update($request->all());
        return redirect()->route('izdatnice.index')->with('success', 'Izdatnica je uspješno ažurirana.');
    }

    // Brisanje izdatnice
    public function destroy(Izdatnica $izdatnica)
    {
        $izdatnica->delete();
        return redirect()->route('izdatnice.index')->with('success', 'Izdatnica je uspješno obrisana.');
    }
}