<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Osoba extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'osobe';
    protected $fillable = ['ime', 'prezime', 'adresa', 'kontakt'];
}