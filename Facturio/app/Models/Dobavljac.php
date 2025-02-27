<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Dobavljac extends Model
{
    use SoftDeletes; // Omogućuje soft delete

    // Naziv tablice u bazi podataka
    protected $table = 'dobavljaci';

    // Polja koja se mogu masovno dodijeliti (mass assignment)
    protected $fillable = ['naziv', 'adresa', 'kontakt'];

    // Polja koja trebaju biti skrivena prilikom serializacije (npr. API)
    protected $hidden = [];

    // Polja koja trebaju biti pretvorena u određene tipove (npr. datume)
    protected $casts = [];
}
