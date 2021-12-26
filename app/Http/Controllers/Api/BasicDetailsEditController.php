<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BasicDetails;
use Illuminate\Support\Facades\Hash;

class BasicDetailsEditController extends Controller
{
    public function index()
    {
      $User = BasicDetails::all();
      return $User;
    }

    public function store(Request $request)
    {
        
    }

    public function show($id)
    {

      $id = 1;
      $users = BasicDetails::find($id);
      return $users;
 
    }

    public function update(Request $request, $id)
    {
      $users = BasicDetails::find($request->id);
      $users->user_name = $request->user_name;
      $users->first_name = $request->first_name;
      $users->last_name = $request->last_name;
      $users->birthday = $request->birthday;
      $users->sex = $request->sex;
      $users->ages = $request->ages;
      $users->email = $request->email;
      $users->address = $request->address;
       $users->update();
       $users = BasicDetails::all();
      return redirect("api/users/".$id);
    }

    public function destroy($id)
    {
        BasicDetails::find($id)->delete();
    }
}
