<?php

namespace App\Http\Controllers;

use App\Setting;
use Illuminate\Http\Request;
use \Validator;

class SettingsController extends Controller
{
    public function show(Setting $setting)
    {
        return response()->json($setting);
    }

    public function update(Setting $setting, Request $request)
    {
        $validation = Validator::make($request->all(), [
            'content' => 'required'
        ]);

        if($validation->fails()) {
            return response()->json($validation->errors(), 400);
        }

        $setting->fill($request->all());
        $setting->save();
        return response()->json($setting);
    }
}
