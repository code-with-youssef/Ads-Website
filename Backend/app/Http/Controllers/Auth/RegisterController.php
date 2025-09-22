<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\RegisterUserAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserRegisterValidationRequest;
use App\Services\UsersService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RegisterController extends Controller
{

    public function register(UserRegisterValidationRequest $user_register_validation_request, RegisterUserAction $register_user_action)
    {

        $user = $register_user_action->execute($user_register_validation_request->validated());
        Auth::login($user);
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
        ], 201);
    }
}
