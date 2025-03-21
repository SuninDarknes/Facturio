<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Dobavljac extends Model
{
    use HasFactory, SoftDeletes;
    use SoftDeletes;
    protected $table = 'dobavljaci';

    protected $fillable = ['naziv', 'adresa', 'kontakt'];
}
