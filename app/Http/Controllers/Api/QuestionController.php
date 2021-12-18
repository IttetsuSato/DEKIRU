<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Question;
use Illuminate\Support\Facades\Hash;

class QuestionController extends Controller
{
    public function index()
    {
      $questions = Question::all();
      return $questions;
    }

    public function store(Request $request)
    {
      $question = new Question;
      $question->user_id = 1;
      $question->category_id = $request->category_id;
      $question->title = $request->title;
      $question->content = $request->content;
      $question->status = 1;
      $question->save();
      return $question;
    }

    public function show($id)
    {
      $question = Question::find($id);
      return $question;
    }

    public function update(Request $request)
    {
      $question = Question::find($request->id);
      $question->name = $request->name;
      $question->content = $request->content;
      $question->save();
      $questions = Question::all();
      return $questions;
    }

    public function destroy($id)
    {
      Question::find($id)->delete();
    }
}
