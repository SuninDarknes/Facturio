<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Artikl;
use App\Models\Cijena;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StavkaRacuna>
 */
class StavkaRacunaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $artikl = Artikl::factory()->create();
        Cijena::factory()->withArtikl($artikl)->create();
        return [
            'racun_id' => $this->faker->numberBetween(1, 100),
            'artikl_id' => Artikl::factory(),
            'kolicina' => $this->faker->numberBetween(1, 10),
            'cijena' => $this->faker->randomFloat(2, 1, 100),
            'popust' => $this->faker->randomFloat(2, 0, 0.5),
        ];
    }
}