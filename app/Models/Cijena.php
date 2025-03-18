<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cijena extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'cijene';
    protected $fillable = ['artikl_id', 'cijena', 'datum'];

    // Definirajte relaciju prema artiklu
    public function artikl()
    {
        return $this->belongsTo(Artikl::class);
    }
}