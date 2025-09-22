<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\LoginUserAction;
use App\Actions\Auth\LogoutUserAction;
use App\Http\Controllers\Controller;
use App\Services\UsersService;
use Illuminate\Http\Request;

class LoginController extends Controller
{

    protected $userService;

    public function __construct(UsersService $userService)
    {
        $this->userService = $userService;
    }

    public function login(Request $request, LoginUserAction $login_user_action)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = $login_user_action->execute($credentials);

        if (! $user) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
        ], 200);
    }


    public function logout(Request $request, LogoutUserAction $logout_user_action)
    {
        $logout_user_action->execute($request);
        return response()->json(['message' => 'Logged out']);
    }
}
