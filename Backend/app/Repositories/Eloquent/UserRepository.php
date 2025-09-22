<?php

namespace App\Repositories\Eloquent;

use App\Repositories\Contracts\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    public function getUser($user)
    {
        return $user->load('user_ads:id,ad_id,user_id');
    }
}
