<?php

namespace App\Actions\Ads;

use App\Models\Ad;


class RegisterUserAction
{
    /**
     * Create a new user and trigger Registered event
     */
    public function execute(array $data): Ad
    {

        $ad = Ad::create($data);
        return $ad;
    }
}
