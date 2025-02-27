<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('cijene', function (Blueprint $table) {
            $table->id();
            $table->foreignId('artikl_id')->constrained('artikli')->onDelete('cascade');
            $table->decimal('cijena', 10, 2);
            $table->dateTime('datum')->default(now());
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('cijene');
    }
};
