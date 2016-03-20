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

		$error = "";	
		$mi = [];//initialiase an empty mover instructions array

		if ($request->isMethod('post')) {

			$output = "";
			// get the post command string and format them get output
			$content = $request->input('instruct');
			$content = preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "\n", $content); //fix content if there are windows CRLF or tabs and spaces
			$lines = preg_split("/\n/", $content);


			$lines = array_filter($lines);  //remove empty or null lines 
			
			list($lawn_col,$lawn_row) = preg_split("/ /", $lines[0]);//get lawn dimentions 
			$blocksize = ['col' => $lawn_col, 'row' => $lawn_row];
			array_shift($lines);//remove lawn dimentions from lines

			$count_mowers = (count($lines)/2); 
			
			for ($i=0; $i < $count_mowers; $i++) { 
				
				list($mow_col,$mow_row,$dir) = preg_split("/ /", $lines[0]);
				$address = ['col' => $mow_col, 'row' => $mow_row];
				array_shift($lines);
				$command = $lines[0];
				array_shift($lines);

				$new_mover = new Mower($address,$dir,$blocksize);
				$new_mover->execute($command);

				$mi[] = $new_mover->getCurrentPosition();

				if($new_mover->errors != ""){
					$error[($i+1)] = "Mover ".($i+1).": ".$new_mover->errors;
				}
				
			}			

		} 

		$template_vars = [
			'mi' => $mi,
			'instruct' => $request->input('instruct'),
			'errors' => $error
		];

		return View::make('site.partone', $template_vars);

	}


}
