<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRacunRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'naziv' => 'required|string|max:100',
            'osoba_id' => 'required|exists:osobe,id',
            'datum' => 'required|date',
            'pdv' => 'required|numeric',
            'nacin_placanja' => 'required|string|max:100',
            'rok_placanja' => 'required|date',
            'ukupna_cijena' => 'required|numeric',
            'stavke' => 'required|array',
            'stavke.*.artikl_id' => 'required|exists:artikli,id',
            'stavke.*.kolicina' => 'required|numeric|min:1',
            'stavke.*.cijena' => 'required|numeric|min:0',
            'stavke.*.popust' => 'nullable|numeric|min:0|max:100',
        ];
    }
}
