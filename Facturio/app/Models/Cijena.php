<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cijena extends Model
{
    protected $table = 'cijene';
    protected $fillable = ['artikl_id', 'cijena', 'datum'];

    // Definirajte relaciju prema artiklu
    public function artikl()
    {
        return $this->belongsTo(Artikl::class);
    }
}