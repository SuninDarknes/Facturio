<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StavkaPrimke extends Model
{
    protected $table = 'stavke_primke';
    protected $fillable = ['primka_id', 'artikl_id', 'kolicina', 'cijena', 'popust'];

    // Relacija prema primki
    public function primka()
    {
        return $this->belongsTo(Primka::class);
    }

    // Relacija prema artiklu
    public function artikl()
    {
        return $this->belongsTo(Artikl::class);
    }
}