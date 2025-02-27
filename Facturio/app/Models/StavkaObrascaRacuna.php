<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StavkaObrascaRacuna extends Model
{
    protected $table = 'stavke_obrasca_racuna';
    protected $fillable = ['obrazac_id', 'artikl_id', 'kolicina', 'cijena'];

    // Relacija prema obrascu
    public function obrazac()
    {
        return $this->belongsTo(ObrazacRacuna::class);
    }

    // Relacija prema artiklu
    public function artikl()
    {
        return $this->belongsTo(Artikl::class);
    }
}