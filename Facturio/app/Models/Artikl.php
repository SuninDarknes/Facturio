<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Artikl extends Model
{
    use SoftDeletes;

    protected $table = 'artikli';
    protected $fillable = ['naziv', 'opis', 'jedinica_mjere'];
}