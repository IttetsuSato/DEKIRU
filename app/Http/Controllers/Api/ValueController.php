<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Value;
use Illuminate\Support\Facades\Hash;

class ValueController extends Controller
{
    public function index()
    {
      $values = Value::all();
      return $values;
    }

    public function store(Request $request)
    {
      $value = new Value;
      $value->name = $request->name;
      $value->content = $request->content;
      $value->save();
      return $value;
    }

    public function show($id)
    {
      $value = Value::find($id);
      return $value;
    }

    public function update(Request $request)
    {
      $value = Value::find($request->id);
      $value->name = $request->name;
      $value->content = $request->content;
      $value->save();
      $values = Value::all();
      return $values;
    }

    public function destroy($id)
    {
      Value::find($id)->delete();
    }
}
