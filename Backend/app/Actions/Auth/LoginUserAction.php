<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;

class LoginUserAction
{
    /**
     * Login the user
     */
    public function execute(array $data): ?User
    {
        if (Auth::attempt([
            'email' => $data['email'],
            'password' => $data['password'],
        ])) {

            return Auth::user();
        }

        return null;
    }
}
