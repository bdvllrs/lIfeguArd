<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    public $fillable = ['name', 'content'];
    public $timestamps = false;

    public function getRouteKeyName()
    {
       return 'name';
    }
}
