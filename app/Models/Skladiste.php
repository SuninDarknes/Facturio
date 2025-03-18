<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Skladiste extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'skladiste';
    protected $fillable = ['artikl_id', 'kolicina'];

    // Relacija prema artiklu
    public function artikl()
    {
        return $this->belongsTo(Artikl::class);
    }
}