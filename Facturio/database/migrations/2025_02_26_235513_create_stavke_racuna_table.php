<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('stavke_racuna', function (Blueprint $table) {
            $table->id();
            $table->foreignId('racun_id')->constrained('racuni')->onDelete('cascade');
            $table->foreignId('artikl_id')->constrained('artikli')->onDelete('cascade');
            $table->integer('kolicina');
            $table->decimal('cijena', 10, 2);
            $table->decimal('popust', 5, 2)->default(0);
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('stavke_racuna');
    }
};
