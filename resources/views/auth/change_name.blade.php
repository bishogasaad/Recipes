@extends('layouts.base')

@section('content')
    <div class="container-fluid d-flex flex-column he-100">
        <div class="col-4"></div>
        <div class="col mw-100 p-0">
        <form method="POST" action="{{route('chang_name')}}" class="d-flex mx-auto flex-wrap justify-content-center col-5 p-3 rounded border-blue bordered">
            @csrf
        <div class="col-12 py-3 p-0 justify-content-between row"><label>new Name:</label><input required type="text" id="name" name="name"/></div>
                <div class="pt-3"><button class="btn btn-success" type="submit">Proceed</button></div>
            </form>
        </div>
    </div>
@endsection