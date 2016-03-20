@extends('layouts.master')


@section('title')
PartOne
@stop



@section('content')


{{ Form::open() }}
  <div class="form-group">
    <label for="instruct">Input</label>
    <textarea class="form-control" rows="10" name="instruct" placeholder="Mower Instructions" >{{$instruct}}</textarea>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>
<br>


@if(count($mi))
<div class="panel panel-default">
	<div class="panel-heading"><b>Output:</b></div>
  <div class="panel-body">
	@foreach($mi as $k => $v)
	     {{$v['address']['col']}} {{$v['address']['row']}}  {{$v['direction']}} <br>
	@endforeach
	</div>
</div>
@endif

@if(count($errors))
<div class="panel panel-default">
	<div class="panel-heading"><b>Errors:</b></div>
  <div class="panel-body">
  	@foreach($errors as $v)
	     {{$v}}<br>
	@endforeach
	</div>
</div>
@endif

@stop