<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skladiste extends Model
{
    protected $table = 'skladiste';
    protected $fillable = ['artikl_id', 'kolicina'];

    // Relacija prema artiklu
    public function artikl()
    {
        return $this->belongsTo(Artikl::class);
    }
}