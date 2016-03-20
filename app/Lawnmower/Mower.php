<?php

namespace App\Lawnmower;
/**
 * Mower
 * 
 * 
 * @package    Lawnmower
 * @author     Raj Dsouza <rajdsouza@gmail.com>
 */
class Mower {
    /* current movers direction at which it rests */

    public $direction;

    /* the block which the mover will mow */
    public $block;

    /* mowers current address */
    public $address;


    public $errors;

    public function __construct($address, $direction, $blocksize) {
        $this->setMowersAddress($address);
        $this->setCurrentDirection($direction);
        $this->setBlockSize($blocksize);
        $error = "";
    }

    /**
     * Sets the movers current direction
     * @param type $direction
     */
    public function setCurrentDirection($direction) {
        $this->direction = $direction;
    }

    /**
     * Sets the movers current location
     * @param type $address
     */
    public function setMowersAddress($address) {
        $this->address = $address;
    }

    /**
     * Sets the lawns dimentions
     * @param array $blocksize [col,row]
     */
    public function setBlockSize($blocksize) {
        $this->block = $blocksize;
    }


    /**
     * Set the address of the mower after the command move is triggered
     */
    private function move() {

        
        switch ($this->direction) {
            case 'N':
                    if($this->address['row'] == $this->block['col']){return false;}  //add validation to the move so the mower will not go out of the lawn due to human error
                    $this->address['row'] ++; // add rows on move to north
                break;
            case 'E':
                if($this->address['col'] == $this->block['col']){return false;}  //add validation to the move so the mower will not go out of the lawn due to human error
                $this->address['col'] ++; // add cols on move to east
                break;
            case 'S':
                if($this->address['row'] == 0){return false;}  //add validation to the move so the mower will not go out of the lawn due to human error
                $this->address['row'] --; // deduct rows on move to south
                break;
            case 'W':
                if($this->address['col'] == 0){return false;}  //add validation to the move so the mower will not go out of the lawn due to human error
                $this->address['col'] --; // deduct rows on move to west
                break;
        }


        return true;

    }

    /**
     * Sets the direction of the mower after trigerring the turn command 
     * Can be called only from this class
     * 
     * @param type $where
     */
    private function turn($where) {
        $orient = ['N', 'E', 'S', 'W'];
        $cur_direction_index = array_search($this->direction, $orient);

        switch ($where) {
            case 'R':
                $cur_direction_index++;
                $cur_direction_index = ($cur_direction_index == 4) ? 0 : $cur_direction_index;

                break;
            case 'L':
                $cur_direction_index--;
                $cur_direction_index = ($cur_direction_index == -1) ? 3 : $cur_direction_index;

                break;
        }

        $this->direction = $orient[$cur_direction_index];
    }

    /**
     * Gets the currect position of the mower
     * 
     * @return type array 
     */
    public function getCurrentPosition() {
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
    public function mowerAction($command) {

        switch ($command) {
            case 'M':
                $ret = $this->move();
                if(!$ret){
                    $this->errors = "Could not move. Lawn is smaller than you think";
                }
                
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

    /**
     * execute the given command string
     * @example MMMMMMMRMRMMMMM
     * @param string $command
     */
    public function execute($command){

        $actions = str_split($command);

        foreach ($actions as $action) {
            $this->mowerAction($action);
        }

        return $this->getCurrentPosition();

    }

}

?>