<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cijena>
 */
class CijenaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'artikl_id' => $this->faker->numberBetween(1, 100),
            'cijena' => $this->faker->randomFloat(2, 1, 100),
            'datum' => $this->faker->date,
        ];
    }

    public function withArtikl($artikl): self
    {
        return $this->state(function (array $attributes) use ($artikl) {
            return [
                'artikl_id' => $artikl->id,
            ];
        });
    }
}
