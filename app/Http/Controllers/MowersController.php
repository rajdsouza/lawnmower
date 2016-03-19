<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Mowers;
use App\Lawns;


class MowersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Create a mower for a given lawn
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request,$lawnId)
    {
     
        $lawn = Lawns::where('id',$lawnId)->first(['id','width','height']);

        if ($lawn) {
            $mower = new Mowers();
            $mower->lawns_id = $lawnId;
            $mower->x = $request->input('x');
            $mower->y = $request->input('y');
            $mower->heading = $request->input('heading');
            $mower->commands = $request->input('commands');

            $saved = $mower->save();

            if($saved){
                $return = [
                    'id'        => $mower->id,
                    'x'         => $request->input('x'),
                    'y'         => $request->input('y'),
                    'heading'   => $request->input('heading'),
                    'commands'  => $request->input('commands')
                ];


                return response()->json($return);
            } else {

                return response()->json(['error'=>'An error occured saving the mower']);
            }

        } else {

            return response()->json(['error'=>'You cannot add a mower to a lawn which does not exist']);
        }

    }

    /**
     * Display the specified resource.
     * @param  int  $lawnId
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($lawnId,$id)
    {
            $mower = Mowers::where('id',$id)
                    ->where('lawns_id',$lawnId)
                    ->first(['id','x','Y','heading','commands']);
             return response()->json($mower);       
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$lawnId, $id)
    {

        $mower = Mowers::find($id);
        $mower->lawns_id = $lawnId;
        $mower->x = $request->input('x');
        $mower->y = $request->input('y');
        $mower->heading = $request->input('heading');
        $mower->commands = $request->input('commands');
        $updated = $mower->save();
        if($updated){
                $mower = Mowers::where('id',$id)
                    ->where('lawns_id',$lawnId)
                    ->first(['id','x','Y','heading','commands']);
              
                return response()->json($mower);
            } else {

                return response()->json(['error'=>'An error occured saving the mower']);
            }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($lawnId, $id)
    {
        $mowers = Mowers::where('id',$id)
            ->where('lawns_id',$lawnId)
            ->delete();

        if($mowers){
            $return = ['status' => 'ok'];
        } else {
            $return = ['status' => 'Could not delete any mowers'];
        }
         return response()->json($return);
    }
}
