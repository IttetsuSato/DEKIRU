<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Hash;

class CategoryController extends Controller
{
    public function index()
    {
      $categories = Category::all();
      return $categories;
    }

    public function store(Request $request)
    {
      $category = new Category;
      $category->name = $request->name;
      $category->content = $request->content;
      $category->save();
      return $category;
    }

    public function show($id)
    {
      $category = Category::find($id);
      return $category;
    }

    public function update(Request $request)
    {
      $category = Category::find($request->id);
      $category->name = $request->name;
      $category->content = $request->content;
      $category->save();
      $categories = Category::all();
      return $categories;
    }

    public function destroy($id)
    {
      Category::find($id)->delete();
    }
}
