<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class StavkaIzdatnice extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'stavke_izdatnice';
    protected $fillable = ['izdatnica_id', 'artikl_id', 'kolicina', 'cijena', 'popust'];

    // Relacija prema izdatnici
    public function izdatnica()
    {
        return $this->belongsTo(Izdatnica::class);
    }

    // Relacija prema artiklu
    public function artikl()
    {
        return $this->belongsTo(Artikl::class);
    }
}