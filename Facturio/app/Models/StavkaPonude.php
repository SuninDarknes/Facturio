<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StavkaPonude extends Model
{
    protected $table = 'stavke_ponude';
    protected $fillable = ['ponuda_id', 'artikl_id', 'kolicina', 'cijena', 'popust'];

    // Relacija prema ponudi
    public function ponuda()
    {
        return $this->belongsTo(Ponuda::class);
    }

    // Relacija prema artiklu
    public function artikl()
    {
        return $this->belongsTo(Artikl::class);
    }
}