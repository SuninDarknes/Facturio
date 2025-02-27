<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Racun extends Model
{
    protected $table = 'racuni';
    protected $fillable = ['ponuda_id', 'osoba_id', 'datum', 'nacin_placanja', 'rok_placanja', 'dostava', 'porez'];

    // Relacija prema ponudi
    public function ponuda()
    {
        return $this->belongsTo(Ponuda::class);
    }

    // Relacija prema osobi
    public function osoba()
    {
        return $this->belongsTo(Osoba::class);
    }

    // Relacija prema stavkama računa
    public function stavke()
    {
        return $this->hasMany(StavkaRacuna::class);
    }
}