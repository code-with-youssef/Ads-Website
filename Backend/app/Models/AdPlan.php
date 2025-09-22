<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdPlan extends Model
{
    protected $fillable = [
        'type',
        'price',
    ];

    public function ads()
    {
        return $this->hasMany(Ad::class, 'ad_plan_id');
    }
}
