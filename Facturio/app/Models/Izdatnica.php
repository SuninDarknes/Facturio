<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Izdatnica extends Model
{
    protected $table = 'izdatnice';
    protected $fillable = ['datum', 'napomena'];

    // Relacija prema stavkama izdatnice
    public function stavke()
    {
        return $this->hasMany(StavkaIzdatnice::class);
    }
}