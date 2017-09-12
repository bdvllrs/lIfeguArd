<?php

namespace App\Http\Controllers;

use App\Picture;
use Illuminate\Http\Request;
use Validator;

class PicturesController extends Controller
{
    public function show(Request $request)
    {
        $pictures = Picture::whereRaw('1=1');
        if($request->get('last')) {
            return response()->json($pictures->latest()->first());
        }
        return response()->json($pictures->get());
    }
    
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
           'path' => 'required'
        ]);

        if($validation->fails()) {
            return response()->json($validation->errors(), 400);
        }

        $picture = Picture::create($request->all());
        return response()->json($picture);
    }
}
