<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class StavkaRacuna extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'stavke_racuna';
    protected $fillable = ['racun_id', 'artikl_id', 'kolicina', 'cijena', 'popust'];

    // Relacija prema računu
    public function racun()
    {
        return $this->belongsTo(Racun::class);
    }

    // Relacija prema artiklu
    public function artikl()
    {
        return $this->belongsTo(Artikl::class);
    }
}