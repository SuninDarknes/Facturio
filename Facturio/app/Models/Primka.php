<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Primka extends Model
{
    protected $table = 'primke';
    protected $fillable = ['naziv','dobavljac_id', 'datum', 'pdv', 'ukupna_cijena'];

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