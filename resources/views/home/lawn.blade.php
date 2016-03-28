@extends('layouts.master')


@section('title')
PartOne
@stop

@section('css')
<style type="text/css">
	
#art {

  width: 800px;
  height: 600px;
}

</style>
@stop




@section('content')


<h1> Mower with test useing InsomerJS </h1>


{{ Form::open() }}
  <div class="form-group">
    <label for="instruct">Input</label>
    <textarea class="form-control" rows="10" name="instruct" placeholder="Please insert you lawn dimention and count of mowers. See example input below" >{{$instruct}}</textarea>
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>
<br>




@if(count($output))
<div class="panel panel-primary">
    <div class="panel-heading"><b>Animation:</b></div>
  <div class="panel-body">
    <canvas width="800" height="600" id="art"></canvas>
    </div>
</div>
@endif

@if(count($output))
<div class="panel panel-primary">
    <div class="panel-heading"><b>Output:</b></div>
  <div class="panel-body">
    @foreach($output as $k => $v)
         {!! $v !!} <br>
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
        <pre>5 5 3</pre>
    </div>
</div>




@stop




@section('script')
<script type="text/javascript">

	var Shape = Isomer.Shape;
	var Path = Isomer.Path;
	var Point = Isomer.Point;
	var Color = Isomer.Color;	
	var green = new Color(50, 160, 60);
	var red = new Color(160, 60, 50);
	var blue = new Color(50, 60, 160);

    // Mowe js class
    var Mower = {
        canvas:null,
        cube:[],
        rows:0,
        cols:0,
        init: function(rows,cols) { // initialise
            this.rows = rows;
            this.cols = cols;

        	this.canvas = new Isomer(document.getElementById("art"));
        	this.canvas.add(Shape.Prism(Point.ORIGIN, this.rows, this.cols, 1),green);
        },
        reset: function(){ // reset to base canvas
            this.canvas.canvas.clear();    
            this.canvas = new Isomer(document.getElementById("art"));
            this.canvas.add(Shape.Prism(Point.ORIGIN, this.rows, this.cols, 1),green);
           
        },
        clear: function(){ // clear the canvas
        	this.canvas.canvas.clear();
        },
        add: function(num,x,y){ // add a mower object
        	
        	x = x || 0;
        	y = y || 0;

        	this.cube[num] = Shape.Prism(Point.ORIGIN);	
        	this.canvas.add(this.cube[num].translate(x, y, 0), blue);
        },
        sayHello: function() {
            console.log('Hello '+ this.name);
        }
    };

    $(function(){

        @if(count($output))  
        {{$path}}
        @endif


    }) ;

</script>>

@stop