<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use View;
use App\Http\Requests;
use App\Lawnmower\Mower;
use App\Lawnmower\InstructionsGenerator as GI;

class HomeController extends Controller
{

	protected $layout = 'layouts.master';


	public function index(Request $request){


		$pt = [];
		$error = [];	
		$output = [];//initialiase an empty mover instructions array

		if ($request->isMethod('post')) {
			$content = $request->input('instruct');
			$content = preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "", $content); //fix content if there are windows CRLF or tabs and spaces
			if(preg_match("/([0-9]+)\s([0-9]+)\s([0-9]+)/", $content)) {


				list($mow_col,$mow_row,$mowers) = preg_split("/ /", $content); 
				$gi = new GI();
		        $lawnmowers = $gi->generateOptimalInstructions($mow_col,$mow_row,$mowers);
		        $output = [];

		        $pt = "";
		        $m = [];
		        $i = 0;



		        foreach($lawnmowers as $mower){
		            $output[] = $mower['address']['col']." ".$mower['address']['row']." ".$mower['address']['dir']."<br>".$mower['command'];

		            $address = ['col' => $mower['address']['col'], 'row' => $mower['address']['row']];

					$new_mover = new Mower($address,$mower['address']['dir'],['col' => $mow_col, 'row' => $mow_row]);

					$actions = str_split($mower['command']);

			        foreach ($actions as $action) {
			            $new_mover->mowerAction($action);
			            $m[$i][] = $new_mover->getCurrentPosition();
			        }	

			        $tmp =[];

			        foreach ($m as $k => $steps) {
						foreach ($steps as $key => $path) {
							$time = ($key+1)*1000;

			        		$tmp[$time][] = 'Mower.add('.($k+1).','.($path['address']['col']+1).','.($path['address']['row']+1).'); ';
						}
			        	

			        }
			        $i++;
		        }


		        $pt = "Mower.init(".($mow_row+1).",".($mow_col+1).");";

		       	foreach ($tmp as $time => $items) {
		        	$pt .= 'setTimeout(function(){ Mower.reset();';
		        	foreach ($items as $item) {
		        		$pt .= $item;
		        	}
		        	$pt .= '}, '.$time.');';

		        }


			} else {
				$error[] = "Instruction not provided in the right format";
			}


		}







				// template data to send to the template
		$template_vars = [
			'path' => $pt,
			'output' => $output,
			'instruct' => $request->input('instruct'),
			'errors' => $error
		];


		return View::make('home.lawn', $template_vars);
	}






}
