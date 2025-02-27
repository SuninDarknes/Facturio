<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('stavke_obrasca_racuna', function (Blueprint $table) {
            $table->id();
            $table->foreignId('obrazac_id')->constrained('obrasci_racuna')->onDelete('cascade');
            $table->foreignId('artikl_id')->constrained('artikli')->onDelete('cascade');
            $table->integer('kolicina');
            $table->decimal('cijena', 10, 2);
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('stavke_obrasca_racuna');
    }
};
