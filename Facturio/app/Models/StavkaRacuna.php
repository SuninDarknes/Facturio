<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StavkaRacuna extends Model
{
    protected $table = 'stavke_racuna';
    protected $fillable = ['racun_id', 'artikl_id', 'kolicina', 'cijena', 'popust'];

    // Relacija prema računu
    public function racun()
    {
        return $this->belongsTo(Racun::class);
    }

    // Relacija prema artiklu
    public function artikl()
    {
        return $this->belongsTo(Artikl::class);
    }
}