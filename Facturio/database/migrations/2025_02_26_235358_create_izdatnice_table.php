<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('izdatnice', function (Blueprint $table) {
            $table->id();
            $table->string('naziv', 100);
            $table->dateTime('datum')->default(now());
            $table->text('napomena')->nullable();
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('izdatnice');
    }
};
