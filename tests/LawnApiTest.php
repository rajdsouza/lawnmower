<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class LawnApiTest extends TestCase
{
    /**
     * Open the home page
     *
     * @return void
     */
    public function test_get_home()
    {
    	$this->call('GET', '/', [], [], [], [], '{"width":5,"height":5}');

        $this->assertResponseOk();

    }

    /**
     * Open the home page
     *
     * @return void
     */
    public function test_create_a_lawn()
    {
		$data = array(
			'height' => 5,
			'width' => 5,
		);

    	$this->call('POST', '/lawn', [],[],[],['CONTENT_TYPE' => 'application/json'],json_encode($data));

        $this->assertResponseOk();

    }

    public function test_if_lawn_exists_in_database(){
    	 $this->seeInDatabase('lawns', ['id' => 1]);

    }


    
    


}
