<?php
namespace App\Services;

use App\Models\Racun;
use App\Models\StavkaRacuna;
use Illuminate\Support\Facades\DB;

class RacunService
{
    public function createRacun(array $data)
    {
        return DB::transaction(function () use ($data) {
            // Calculate total price
            $data['ukupna_cijena'] = $this->calculateTotalPrice($data['stavke'], $data['pdv']);

            // Create Racun
            $racun = Racun::create($data);

            // Create StavkeRacuna
            foreach ($data['stavke'] as $stavka) {
                StavkaRacuna::create([
                    'racun_id' => $racun->id,
                    'artikl_id' => $stavka['artikl_id'],
                    'kolicina' => $stavka['kolicina'],
                    'cijena' => $stavka['cijena'],
                    'popust' => $stavka['popust'] ?? 0,
                ]);
            }

            return $racun;
        });
    }

    public function calculateTotalPrice(array $stavke, float $pdv): float
    {
        $total = 0;
        foreach ($stavke as $stavka) {
            $total += $stavka['kolicina'] * $stavka['cijena'] * (1 - ($stavka['popust'] ?? 0) / 100) * (1 + $pdv / 100);
        }
        return $total;
    }
}