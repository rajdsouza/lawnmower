<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Lawnmower\Mower;

class mowerSetInstructions extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
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
}
