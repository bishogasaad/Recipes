@extends('layouts.base')

@section('content')
<section id="product" class="he-100" data-name='{{$name}}' data-available='{{$availability}}' data-company='{{$company}}' data-price={{$price}} data-description='{{$description}}' data-multiples='{{$multiples}}' data-type='{{$type}}'></section>
<section class="p-0 d-flex" id="product_recipes"></section>
@endsection