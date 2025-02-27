<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ObrazacRacuna extends Model
{
    protected $table = 'obrasci_racuna';
    protected $fillable = ['naziv', 'opis'];

    // Relacija prema stavkama obrasca
    public function stavke()
    {
        return $this->hasMany(StavkaObrascaRacuna::class);
    }
}