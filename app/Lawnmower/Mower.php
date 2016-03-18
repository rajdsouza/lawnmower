<?php
namespace App\Lawnmower;

/**
   * Mower
   * 
   * 
   * @package    Lawnmower
   * @author     Raj Dsouza <rajdsouza@gmail.com>
   */
class Mower{

	/* current movers direction at which it rests */	
	public $direction;

	/* the block which the mover will mow */
	public $block;

	/*mowers current address*/
	public $address;

	public function __construct($address,$direction){
            $this->setMowersAddress($address);
            $this->setCurrentDirection($direction);
	}
        
        /**
         * Sets the movers current direction
         * @param type $direction
         */
	public function setCurrentDirection($direction){
		$this->direction = $direction;
	}
        
        /**
         * Sets the movers current location
         * @param type $address
         */
	public function setMowersAddress($address){
		$this->address = $address;
	}
        
        /**
         * Create a imaginary lawn to be mowed so it can be validated before the move if the block exists
         * @param type $block_size
         */
	public function setBlockToMow($block_size = array()){
		$rowToBeCreated = isset($block_size['rows'])?$block_size['rows']:0;
		$colToBeCreated = isset($block_size['cols'])?$block_size['cols']:0;

		$block = [];

		for ($i=0; $i < $rowToBeCreated; $i++) { 
			for ($j=0; $j < $colToBeCreated; $j++) { 
				$block[$i][$j] = ['col' => $j,'row' => $rowToBeCreated-($i+1)];
			}
		}

		$this->block = $block;

	}

        /**
         * Set the address of the mower after the command move is triggered
         */
	private function move(){
		switch ($this->direction) {
			case 'N':
					$this->address['row']++; // add rows on move to north
				break;
			case 'E':
					$this->address['col']++; // add cols on move to east
				break;	
			case 'S':
					$this->address['row']--; // deduct rows on move to south
				break;
			case 'W':
					$this->address['col']--; // deduct rows on move to west
				break;
		}
		
	}	

        
        
        /**
         * Sets the direction of the mower after trigerring the turn command 
         * Can be called only from this class
         * 
         * @param type $where
         */
	private function turn($where){
		$orient = ['N','E','S','W'];
		$cur_direction_index = array_search($this->direction, $orient);

		switch ($where) {
			case 'R':
					$cur_direction_index++;
					$cur_direction_index = ($cur_direction_index == 4)?0:$cur_direction_index;
					
				break;
			case 'L':
					$cur_direction_index--;
					$cur_direction_index = ($cur_direction_index == -1)?3:$cur_direction_index;

				break;
		}

		$this->direction = $orient[$cur_direction_index];


	}
        
        
        /**
         * Gets the currect position of the mower
         * 
         * @return type array 
         */
	public function getCurrentPosition(){
		return [
				'address' => $this->address,
				'direction' => $this->direction
			];
	}

        /**
         * Send specified command to the lawnmower
         * @example M,R,L
         * M = Move
         * R = Turn 90 degrees to the right
         * L = Turn 90 degrees to the left 
         * @param type $command
         */
	public function mowerAction($command){

		switch ($command) {
			case 'M':
					$this->move();
				break;
			case 'R':
					$this->turn('R');
				break;	
			case 'L':
					$this->turn('L');
				break;
			default:
					//no action provided
				break;
		}
	}

}

?>