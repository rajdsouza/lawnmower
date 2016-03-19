<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Lawnmower\Mower;
use App\Lawnmower\InstructionsGenerator as GI;

class mowerTest extends TestCase
{
    /**
     * Testing mower movement
     *
     * @return void
     */
    public function test_mower_movement()
    {

        $mower = new Mower(['col' => 1,'row' => 2],'N');

        $output = [];

        $actions = 'LMLMLMLMM';
        $actions = str_split($actions);

        foreach ($actions as $action) {
            $mower->mowerAction($action);
        }

        $result = $mower->getCurrentPosition();
        $output[] = $result['address']['col'] .' '.$result['address']['row'] .' '.$result['direction'];

   
        $mower = new Mower(['col' => 3,'row' => 3],'E');


        $actions = 'MMRMMRMRRM';
        $actions = str_split($actions);

        foreach ($actions as $action) {
            $mower->mowerAction($action);
        }

        $result =  ($mower->getCurrentPosition());
        $output[] = $result['address']['col'] .' '.$result['address']['row'] .' '.$result['direction'];

        $testData = implode("\n", $output);

        $expectedValue = 
"1 3 N
5 1 E";

        $this->assertEquals($testData,$expectedValue);

    }

    /**
     * Testing mower command generation script.
     *
     * @return void
     */
    public function test_mower_generate_command()
    {

    	$cols = 5;
        $rows = 5;
        $mowers = 3;
        
        $gi = new GI();
        $lawnmowers = $gi->generateEfficientInstructions($cols,$rows,$mowers);
        $output = [];
        foreach($lawnmowers as $mower){
            $output[] = $mower['address']['col']." ".$mower['address']['row']." ".$mower['address']['dir']."\n".$mower['command'];
        }
        
        $testData = implode("\n", $output);
		$expectedValue = 
"0 0 N
MMMMMMRMRMMMMM
2 0 N
MMMMMMRMRMMMMM
4 0 N
MMMMMMRMRMMMMM";		       

        $this->assertEquals($testData,$expectedValue);
    }
}
