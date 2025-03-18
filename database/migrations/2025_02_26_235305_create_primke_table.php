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
            $table->string('naziv', 100);
            $table->foreignId('dobavljac_id')->constrained('dobavljaci')->onDelete('cascade');
            $table->timestamp('datum')->useCurrent();
            $table->decimal('pdv', 5, 2)->default(25);
            $table->decimal('ukupna_cijena', 10, 2);
            $table->timestamps();
            $table->softDeletes();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('primke');
    }
};
