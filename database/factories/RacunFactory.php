<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Database\Factories\OsobaFactory;
use App\Models\Osoba;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Racun>
 */
class RacunFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'naziv' => $this->faker->sentence,
            'osoba_id' => Osoba::factory(),
            'datum' => $this->faker->date,
            'pdv' => $this->faker->randomFloat(2, 0, 25),
            'nacin_placanja' => $this->faker->randomElement(['Gotovina', 'Kartica', 'Virman']),
            'rok_placanja' => $this->faker->date,
            'ukupna_cijena' => $this->faker->randomFloat(2, 100, 10000),
        ];
    }
}
