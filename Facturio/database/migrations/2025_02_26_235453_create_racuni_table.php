<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('racuni', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ponuda_id')->nullable()->constrained('ponude')->onDelete('set null');
            $table->foreignId('osoba_id')->constrained('osobe')->onDelete('cascade');
            $table->dateTime('datum')->default(now());
            $table->string('nacin_placanja');
            $table->date('rok_placanja')->nullable();
            $table->text('dostava')->nullable();
            $table->decimal('porez', 5, 2)->default(0);
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('racuni');
    }
};
