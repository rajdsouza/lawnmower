<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lawns extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'lawns';

    public function mowers()
    {
        return $this->hasMany('App\Mowers');
    }
}
