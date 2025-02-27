<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Primka extends Model
{
    protected $table = 'primke';
    protected $fillable = ['dobavljac_id', 'datum', 'ukupna_cijena'];

    // Relacija prema dobavljaču
    public function dobavljac()
    {
        return $this->belongsTo(Dobavljac::class);
    }

    // Relacija prema stavkama primke
    public function stavke()
    {
        return $this->hasMany(StavkaPrimke::class);
    }
}