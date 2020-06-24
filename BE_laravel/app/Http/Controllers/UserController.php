<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Log;
use function GuzzleHttp\Promise\all;

class UserController extends Controller
{
    public function upsert(Request $request, $id)
    {
//        $user = User::query()->where('google_id', '==', $id);
        $user = User::where('google_id', $id)->first();

        if (!get_object_vars($user)) {
            $newUser = new User();
            $data = $request->only($newUser->getFillable());
            $newUser->fill($data)->save();
            return response()->json($newUser->only($newUser->getFillable()), 200);
        }
        return response()->json($user, 200);
    }
}
