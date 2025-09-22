<?php

namespace App\Actions\Auth;

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class RegisterUserAction
{
    /**
     * Create a new user and trigger Registered event
     */
    public function execute(array $data): User
    {
        // Encrypt Password
        $data['password'] = Hash::make($data['password']);
        // Create user
        $user = User::create($data);
        return $user;
    }
}
