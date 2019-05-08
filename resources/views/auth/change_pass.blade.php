@extends('layouts.base')

@section('content')
    <div class="container-fluid d-flex flex-column he-100">
        <div class="col-4"></div>
        <div class="col mw-100 p-0">
        <form method="POST" action="{{route('chang_pass')}}" class="d-flex mx-auto flex-wrap justify-content-center col-5 p-3 rounded border-blue bordered">
            @csrf
        <div class="col-12 py-3 p-0 justify-content-between row"><label>Current Password: </label><input required type="password" id="old" name="old"/>
            @if ($error['old'])
                <div class="text-danger offset-6">Wrong Password</div>
            @endif       
        </div>
                <div class="col-12 py-1 p-0 justify-content-between row"><label>New Password: </label><input required type="password" id="new" name="new"/></div>
                <div class="col-12 py-1 p-0 justify-content-between row"><label>New Password again: </label><input required type="password" id="repeat" name="repeat"/>
                    @if ($errors->has('repeat'))
                    <div class="text-danger offset-6">Passwords don't Match</div>
                    @endif
                </div>
                <div class="pt-3"><button class="btn btn-success" type="submit">Proceed</button></div>
            </form>
        </div>
    </div>
@endsection