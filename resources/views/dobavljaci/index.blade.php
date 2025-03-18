@extends('layouts.app')

@section('content')
    <h1>Dobavljači</h1>
    <a href="{{ route('dobavljaci.create') }}" class="btn btn-primary">Dodaj novog dobavljača</a>
    <table class="table">
        <thead>
            <tr>
                <th>Naziv</th>
                <th>Adresa</th>
                <th>Kontakt</th>
                <th>Akcije</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($dobavljaci as $dobavljac)
                <tr>
                    <td>{{ $dobavljac->naziv }}</td>
                    <td>{{ $dobavljac->adresa }}</td>
                    <td>{{ $dobavljac->kontakt }}</td>
                    <td>
                        <a href="{{ route('dobavljaci.edit', $dobavljac->id) }}" class="btn btn-warning">Uredi</a>
                        <form action="{{ route('dobavljaci.destroy', $dobavljac->id) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger">Obriši</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection