<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Izdatnica extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'izdatnice';
    protected $fillable = ['naziv','datum', 'napomena'];

    // Relacija prema stavkama izdatnice
    public function stavke()
    {
        return $this->hasMany(StavkaIzdatnice::class);
    }
}