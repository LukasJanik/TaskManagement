<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Task;
use function GuzzleHttp\Promise\all;
use function Sodium\add;

class TaskController extends Controller
{

    const windowSize = 10;

    public function addTask(Request $request, $id)
    {
        $user = User::where('google_id', $id)->first();
        if ($user != null) {
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
        if ($task == null) {
            return response()->json('Deleted', 200);
        }
        return response()->json('Task not found', 400);
    }

    public function updateTask(Request $request, $id)
    {
        $task = Task::where('id', $id)->first();
        if ($task != null) {
            $data = $request->only($task->getFillable());
            $task->fill($data)->save();
            return response()->json($task->only($task->getFillable()), 200);
        }
        return response()->json('Task not found', 400);
    }


    public function updateTasks(Request $request)
    {
        $requestedTasks = $request->toArray();
        foreach ($requestedTasks as $requestedTask) {
            $task = Task::find($requestedTask['id']);
            if ($task != null) {
                $data = collect($requestedTask)->only(Task::getFillableInArray())->all();
                $task->fill($data)->save();
            }
        }
        return response()->json($requestedTasks, 200);
    }

    public function getTasks(Request $request, $id)
    {
        $user = User::where('google_id', $id)->first();
        if ($user != null) {
            $tasks = $user->tasks()->get();

            $tmpTask = new Task();
            $fillable = $tmpTask->getFillable();
            array_push($fillable, 'id');

            return response()->json($tasks, 200);
        }
        return response()->json('User not found', 400);
    }

    public function searchTasks(Request $request, $id, $offset, $expression = null)
    {
        $user = User::where('google_id', $id)->first();
        if ($expression == null) {
            $tasks = $user->tasks()->offset($offset * self::windowSize)->limit(self::windowSize)->get();
            return response()->json($tasks, 200);
        }
        else
        {
            $tasks = $user->tasks()->where('name', 'LIKE', '%'.$expression.'%', 'OR', 'description', 'LIKE', '%'.$expression.'%')->offset($offset * self::windowSize)->limit(self::windowSize)->get();
            return response()->json($tasks, 200);
        }
    }
}
