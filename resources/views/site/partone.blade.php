@extends('layouts.master')


@section('title')
PartOne
@stop



@section('content')

<h1> Part 1 </h1>

{{ Form::open() }}
  <div class="form-group">
    <label for="instruct">Input</label>
    <textarea class="form-control" rows="10" name="instruct" placeholder="Please Input Lawn Mowing Instructions" >{{$instruct}}</textarea>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>
<br>


@if(count($mi))
<div class="panel panel-primary">
	<div class="panel-heading"><b>Output:</b></div>
  <div class="panel-body">
	@foreach($mi as $k => $v)
	     {{$v['address']['col']}} {{$v['address']['row']}}  {{$v['direction']}} <br>
	@endforeach
	</div>
</div>
@endif

@if(count($errors))
<div class="panel panel-warning">
	<div class="panel-heading"><b>Errors:</b></div>
  <div class="panel-body">
  	@foreach($errors as $v)
	     {{$v}}<br>
	@endforeach
	</div>
</div>
@endif

<div class="panel panel-default">
	<div class="panel-heading"><b>Example Input:</b></div>
  	<div class="panel-body">
  		<pre>5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM</pre>
	</div>
</div>


@stop