<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAd extends Model
{
    protected $fillable = [
        'user_id',
        'ad_id',
    ];
}
