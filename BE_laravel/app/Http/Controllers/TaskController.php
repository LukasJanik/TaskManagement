<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Task;
use function GuzzleHttp\Promise\all;
use function Sodium\add;

class TaskController extends Controller
{
    public function addTask(Request $request, $id)
    {
        $user = User::where('google_id', $id)->first();
        if (get_object_vars($user)) {
            $newTask = new Task();
            $data = $request->only($newTask->getFillable());
            $newTask->fill($data);

            $user->tasks()->save($newTask);
            return response()->json($newTask->only($newTask->getFillable()), 200);
        }
        return response()->json('User not found', 400);
    }

    public function removeTask(Request $request, $id)
    {
        $task = Task::where('id', $id)->delete();
        if (!get_object_vars($task)) {
            return response()->json('Deleted', 200);
        }
        return response()->json('Task not found', 400);
    }

    public function updateTask(Request $request, $id)
    {
        $task = Task::where('id', $id)->first();
        if (get_object_vars($task)) {
            $data = $request->only($task->getFillable());
            $task->fill($data)->save();
            return response()->json($task->only($task->getFillable()), 200);
        }
        return response()->json('Task not found', 400);
    }

    public function getTasks(Request $request, $id)
    {
        $user = User::where('google_id', $id)->first();
        if (get_object_vars($user)) {
            $tasks = $user -> tasks() -> get();

            $tmpTask = new Task();
            $fillable = $tmpTask -> getFillable();
            array_push($fillable, 'id');

            return response()->json($tasks, 200);
        }
        return response()->json('User not found', 400);
    }
}
