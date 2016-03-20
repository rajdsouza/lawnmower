<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use View;
use App\Http\Requests;
use App\Lawnmower\Mower;
use App\Lawnmower\InstructionsGenerator as GI;

class SiteController extends Controller
{

	protected $layout = 'layouts.master';


	public function partOne(Request $request){

		$error = [];	
		$mi = [];//initialiase an empty mover instructions array

		if ($request->isMethod('post')) {

			$output = "";
			// get the post command string and format them get output
			$content = $request->input('instruct');
			$content = preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "\n", $content); //fix content if there are windows CRLF or tabs and spaces
			$lines = preg_split("/\n/", $content);


			$lines = array_filter($lines);  //remove empty or null lines 
			
			if(preg_match("/([0-9]*)\s([0-9]*)/", $lines[0])) { // check if the first line dimentions are corrrect

				list($lawn_col,$lawn_row) = preg_split("/ /", $lines[0]);//get lawn dimentions 
				$blocksize = ['col' => $lawn_col, 'row' => $lawn_row];
				array_shift($lines);//remove lawn dimentions from lines

				$count_mowers = (count($lines)/2); 
				
				for ($i=0; $i < $count_mowers; $i++) { 
					
					if(preg_match("/([0-9]*)\s([0-9])*\s([A-Za-z])/", $lines[0])) {  // check mover address if provided in the same pattern
						list($mow_col,$mow_row,$dir) = preg_split("/ /", $lines[0]); 
						$dir = strtoupper($dir);
						$address = ['col' => $mow_col, 'row' => $mow_row];
						array_shift($lines);
						$command = strtoupper($lines[0]); //TODO: Add more validation to fix if lines exist or format are correct for other lines
						array_shift($lines);

						$new_mover = new Mower($address,$dir,$blocksize);
						$new_mover->execute($command);

						$mi[] = $new_mover->getCurrentPosition();

						if($new_mover->errors != ""){
							$error[] = "Mover ".($i+1).": ".$new_mover->errors;
						}


					} else {

						$error[] = "Mover ".($i+1).": Mover location is not defined correctly";
					}	

					
					
				}		
			} else {
				$error[] = "Something not right with the lawn dimentions. Please edit it and submit again";
			}	

		} 
		// template data to send to the template
		$template_vars = [
			'mi' => $mi,
			'instruct' => $request->input('instruct'),
			'errors' => $error
		];

		return View::make('site.partone', $template_vars);

	}


	public function partTwo(Request $request){

		$error = [];	
		$output = [];//initialiase an empty mover instructions array

		if ($request->isMethod('post')) {
			$content = $request->input('instruct');
			$content = preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "", $content); //fix content if there are windows CRLF or tabs and spaces
			if(preg_match("/([0-9]*)\s([0-9]*)\s([0-9]*)/", $content)) { 
				list($mow_col,$mow_row,$mowers) = preg_split("/ /", $content); 
				$gi = new GI();
		        $lawnmowers = $gi->generateEfficientInstructions($mow_col,$mow_row,$mowers);
		        $output = [];
		        foreach($lawnmowers as $mower){
		            $output[] = $mower['address']['col']." ".$mower['address']['row']." ".$mower['address']['dir']."<br>".$mower['command'];
		        }



			} else {
				$error[] = "Instruction not provided in the right format";
			}


		}

				// template data to send to the template
		$template_vars = [
			'output' => $output,
			'instruct' => $request->input('instruct'),
			'errors' => $error
		];

		return View::make('site.parttwo', $template_vars);


	}






}
