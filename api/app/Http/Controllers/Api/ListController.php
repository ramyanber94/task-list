<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lists;
use Illuminate\Http\Request;
use DB;

class ListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $lists = DB::table('lists')->get();
        return $lists;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $input = $request->all();
        $lists = Lists::create($input);
        return response()->json([
            "success" => true,
            "message" => "list created successfully.",
            "data" => $lists
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Lists  $lists
     * @return \Illuminate\Http\Response
     */
    public function show(Lists $lists)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Lists  $lists
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Lists $lists)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Lists  $lists
     * @return \Illuminate\Http\Response
     */
    public function destroy(Lists $lists)
    {
        //
    }
}
