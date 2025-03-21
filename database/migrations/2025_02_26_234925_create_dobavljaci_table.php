<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('dobavljaci', function (Blueprint $table) {
            $table->id();
            $table->string('naziv');
            $table->string('adresa')->nullable();
            $table->string('kontakt')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('dobavljaci');
    }
};
