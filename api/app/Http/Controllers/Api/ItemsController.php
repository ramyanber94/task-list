<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Items;
use Illuminate\Http\Request;

class ItemsController extends Controller
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
        $items = Items::create($input);
        return response()->json([
            "success" => true,
            "message" => "list created successfully.",
            "data" => $items
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\list_id  $list_id
     * @return \Illuminate\Http\Response
     */
    public function show(String $list_id)
    {
        //
        $items = Items::where('list_id',  '=', $list_id)->get();
        return $items;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\id  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, String $id)
    {
        //
        $input = $request->all();
        $item = Items::find($id);
        $item->name = $input['name'];
        $item->isChecked = isset($input['isChecked']) ? $input['isChecked'] : 0;
        $item->save();
        return response()->json([
            "success" => true,
            "message" => "item updated successfully.",
            "data" => $item
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\id  $id
     * @return \Illuminate\Http\Response
     */
    public function destory(String $id)
    {
        //
        $item = Items::find($id);
        $item->delete();
        return response()->json([
            "success" => true,
            "message" => "item deleted successfully.",
        ]);
    }
}
