<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Artikl>
 */
class ArtiklFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        //    protected $fillable = ['naziv', 'opis'];
        return [
            "naziv" => $this->faker->word,
            "opis" => $this->faker->sentence,
        ];
    }
}
