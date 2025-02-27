<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ponuda extends Model
{
    protected $table = 'ponude';
    protected $fillable = ['osoba_id', 'datum', 'ukupna_cijena'];

    // Relacija prema osobi
    public function osoba()
    {
        return $this->belongsTo(Osoba::class);
    }

    // Relacija prema stavkama ponude
    public function stavke()
    {
        return $this->hasMany(StavkaPonude::class);
    }
}