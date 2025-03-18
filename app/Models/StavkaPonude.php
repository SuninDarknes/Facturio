<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class StavkaPonude extends Model
{
    use HasFactory, SoftDeletes;
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