<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Racun extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'racuni';
    protected $fillable = ['naziv','ponuda_id', 'osoba_id','ukupna_cijena', 'datum','pdv', 'nacin_placanja', 'rok_placanja', 'dostava'];

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
    public function stavkaRacuna()
    {
        return $this->hasMany(StavkaRacuna::class);
    }
}