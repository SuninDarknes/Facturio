<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Osoba>
 */
class OsobaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "ime" => $this->faker->firstName,
            "prezime"=> $this->faker->lastName,
            "adresa" => $this->faker->address,
            "kontakt" => $this->faker->phoneNumber,
        ];
    }
}
