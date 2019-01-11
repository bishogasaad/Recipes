@extends('layouts.base')

@section('content')
<style>
    li{
        list-style: none;
    }
</style>
<section class="he-100" id="recipe" data-user="{{$user_id}}" data-id="{{$id}}" data-creator="{{$creator}}" data-rating="{{$rating}}" data-title="{{$title}}" data-instructions="{{$instruction}}"></section>
@endsection