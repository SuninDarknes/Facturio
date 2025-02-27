<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('ponude', function (Blueprint $table) {
            $table->id();
            $table->foreignId('osoba_id')->constrained('osobe')->onDelete('cascade');
            $table->dateTime('datum')->default(now());
            $table->decimal('ukupna_cijena', 10, 2);
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('ponude');
    }
};
