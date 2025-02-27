<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('primke', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dobavljac_id')->constrained('dobavljaci')->onDelete('cascade');
            $table->dateTime('datum')->default(now());
            $table->decimal('ukupna_cijena', 10, 2);
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('primke');
    }
};
