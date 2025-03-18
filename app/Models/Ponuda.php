<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ponuda extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'ponude';
    protected $fillable = ['naziv','osoba_id', 'datum', 'pdv', 'ukupna_cijena'];

    // Relacija prema osobi
    public function osoba()
    {
        return $this->belongsTo(Osoba::class);
    }

    // Relacija prema stavkama ponude
    public function stavke()
    {
        return $this->hasMany(StavkaPonude::class);
    }
}