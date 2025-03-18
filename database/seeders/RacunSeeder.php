<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Racun;
use App\Models\StavkaRacuna;

class RacunSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Racun::factory()
        ->count(10)
        ->has(StavkaRacuna::factory()->count(3))
        ->create();
    }
}
