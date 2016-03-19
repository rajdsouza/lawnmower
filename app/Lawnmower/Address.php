<?php

namespace App\Lawnmower;

/**
 * Address
 * Generate instruction for the lawnmower to mow the given lawn and quantity of mowers
 * 
 * 
 * @package    	Lawnmower
 * @class		Address
 * @author     	Raj Dsouza <rajdsouza@gmail.com>
 */
class Address {


	public $address;

	public $history;

	public $start_address;

	public function __construct($col, $row, $direction) {
		$this->address = $this->setAddress($col,$row,$direction);
		$this->start_address = $this->address;
    }


    public function setAddress($col, $row, $direction){

    	$current_address = ['col' => $col,'row' => $row, 'dir' => $direction];
    	$this->history[] = $current_address;
    	return $current_address;
    }



}