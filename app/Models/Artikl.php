<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Artikl extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'artikli';
    protected $fillable = ['naziv', 'opis'];

    public function cijene()
    {
        return $this->hasMany(Cijena::class);
    }
    public function stavkePrimke()
    {
        return $this->hasMany(StavkaPrimke::class);
    }
    public function stavkeRacuna()
    {
        return $this->hasMany(StavkaRacuna::class);
    }
    public function stavkePonude()
    {
        return $this->hasMany(StavkaPonude::class);
    }
    
}