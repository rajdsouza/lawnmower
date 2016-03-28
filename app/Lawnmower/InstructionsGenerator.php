<?php

namespace App\Lawnmower;

use App\Lawnmower\Address;

/**
 * Instructions Generator
 * Generate instruction for the lawnmower to mow the given lawn and quantity of mowers
 * 
 * 
 * @package    	Lawnmower
 * @class		Instructions Generator
 * @author     	Raj Dsouza <rajdsouza@gmail.com>
 */
class InstructionsGenerator {

    public function __construct() {
        
    }

    /**
     * Generate a set of instructions to mow a lawn 
     * provided a size of the lawn and how many mowers are to be used
     * 
     * @param int $cols
     * @param int $rows
     * @param int $mowers
     * @return array
     */
    public function generateEfficientInstructions($cols, $rows, $mowers) {

        $total_blocks = ($cols + 1) * ($rows + 1);
        $max_blocks = ($total_blocks / $mowers);


        $direction = 'N'; //default direction to be assumed
        $mowed_blocks_by_one_mover = 0;
        $mower_no = 1;
        $address = [];
        //$address[$mower_no] = new Address(0,0,'N');
        $idx = 0;



        for ($col = 0; $col < $cols + 1; $col++) {

            if ($mowed_blocks_by_one_mover >= $max_blocks) { //reset blocks mowed by a mower
                $mowed_blocks_by_one_mover = 0;
                $mower_no++;
                $direction = 'N';
            }


            for ($row = 0; $row < $rows + 1; $row++) {


                $mowcol = $col;
                $mowrow = ($direction == "N") ? $row : ($rows) - $row;
                //echo "$mowcol $mowrow $direction $mower_no\n";


                if (isset($address[$mower_no])) {
                    $address[$mower_no]->setAddress($mowcol, $mowrow, $direction);
                } else {
                    $address[$mower_no] = new Address($mowcol, $mowrow, $direction);
                }

                $mowed_blocks_by_one_mover++;
            }

            $direction = ($direction == "N") ? "S" : "N";
        }


        return $this->processAddresses($address);
    }

    /**
     * Process path for each lawnmover which has access to path information 
     * 
     * @param object[] Addresses $addresses
     * @return array
     */
    private function processAddresses($addresses) {

        $mower_cmd = [];

        foreach ($addresses as $mower_no => $address) {


            $mower_cmd[$mower_no]['address'] = $address->start_address;

            $command = "";
            foreach ($address->history as $key => $cur) {


                if ($key > 0) {

                    $prev = $address->history[$key - 1];

                    $command .= $this->getCommand($cur, $prev);
                } else {
                    $command .= "M";
                }
            }

            $mower_cmd[$mower_no]['command'] = $command;
        }

        return $mower_cmd;
    }

    /**
     * Get the command string for the emulated move
     * 
     * @param objech $cur
     * @param object $prev
     * @return string
     */    
    private function getCommand($cur,$prev) {
        
        $has_col_changed = (($prev['col'] - $cur['col']) == 0) ? false : true;
                    $has_row_changed = (($prev['row'] - $cur['row']) == 0) ? false : true;
        
        if ($has_col_changed) {
            if ($cur['dir'] == 'S'){
                $command = "RMR";
            }    
            if ($cur['dir'] == 'N'){
                $command = "LML";
            }    
        }

        if ($has_row_changed) {
            $command = "M";
        }
        
        return $command;
    }

    /**
     * Generate a set of instructions to mow a lawn with optimal set
     * provided a size of the lawn and how many mowers are to be used
     * 
     * @param int $cols
     * @param int $rows
     * @param int $mowers
     * @return array
     */
    public function generateOptimalInstructions($cols, $rows, $mowers) {

        $total_blocks = ($cols + 1) * ($rows + 1);
        $max_blocks = ($total_blocks / $mowers);


        $direction = 'N'; //default direction to be assumed
        $mowed_blocks_by_one_mover = 0;
        $mower_no = 1;
        $address = [];
        //$address[$mower_no] = new Address(0,0,'N');
        $idx = 0;



        for ($col = 0; $col < $cols + 1; $col++) {

      


            for ($row = 0; $row < $rows + 1; $row++) {
                if ($mowed_blocks_by_one_mover >= $max_blocks) { //reset blocks mowed by a mower
                    $mowed_blocks_by_one_mover = 0;
                    $mower_no++;
                    $direction = 'N';
                }

                $mowcol = $col;
                $mowrow = ($direction == "N") ? $row : ($rows) - $row;
                //echo "$mowcol $mowrow $direction $mower_no\n";


                if (isset($address[$mower_no])) {
                    $address[$mower_no]->setAddress($mowcol, $mowrow, $direction);
                } else {
                    $address[$mower_no] = new Address($mowcol, $mowrow, $direction);
                }

                $mowed_blocks_by_one_mover++;
            }

            $direction = ($direction == "N") ? "S" : "N";
        }


        return $this->processAddresses($address);
    }
   

}
