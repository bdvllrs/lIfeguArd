<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

class AddMemoryAndPhotoIntervalToSettings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('settings')->insert([
           [
               "name" => "memory",
               "content" => 20
           ],
            [
                "name" => "photo_interval",
                "content" => 3
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('settings')->where('name', 'memory')->orWhere('name', 'photo_interval')->delete();
    }
}
