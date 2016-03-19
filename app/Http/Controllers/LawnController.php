<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Lawns;
use App\Mowers;
use App\Http\Requests;

class LawnController extends Controller
{

    /**
     * Get Information of a given Lawn.
     *
     * @return \Illuminate\Http\Response
     */
    public function getIndex($id){

        $selected_lawn = Lawns::where('id',$id)->first(['id','width','height']);
      
        if(is_object($selected_lawn)){
             $return =  $selected_lawn;
             $mowers = Mowers::where('lawns_id',$id)->get(['id','x','y','heading','commands']);

             $return['mowers'] = ($mowers)?$mowers:[];
        } else {

            $return = ['error' => "The lawn you are looking for does not exist"];
        }


        return response()->json($return);

    }

    /**
     * Create a Lawn.
     *
     * @return \Illuminate\Http\Response
     */
    public function postIndex(Request $request)
    {

        //print_r($request);

        if ($request->isMethod('post')) {

            $width  = $request->input('width');
            $height = $request->input('height');


            $lawn = new Lawns;
            $lawn->width = $width;
            $lawn->height = $height;

            $lawn->save();

            $return = ["id"=> $lawn->id ,"width" => $width,'height' => $height];

            return response()->json($return);

        }

         return response()->json(['error'=>'Only accepts post']);

    }

    /**
     * Delete a Lawn.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){


        $lawns = Lawns::where('id',$id)->delete();
        $mowers = Mowers::where('lawns_id',$id)->delete();

        if($lawns){
            $return = ['status' => 'ok'];
        } else {
            $return = ['status' => 'Could not delete any lawns'];
        }
         return response()->json($return);
    }


    /**
     * Get execution for the given lawn
     *
     * @return \Illuminate\Http\Response
     */
    public function postExecute($id){

        $selected_lawn = Lawns::where('id',$id)->first(['width','height']);
      
        if(is_object($selected_lawn)){
             $return =  $selected_lawn;
             $mowers = Mowers::where('lawns_id',$id)->get(['id','x','y','heading','commands']);

             $return['mowers'] = ($mowers)?$mowers:[];
        } else {

            $return = ['error' => "The lawn you are looking for does not exist"];
        }


        return response()->json($return);

    }

}
