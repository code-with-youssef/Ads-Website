<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ad extends Model
{
    /** @use HasFactory<\Database\Factories\AdFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'status',
        'image_path',
        'user_id',
        'ad_plan_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ad_plan()
    {
        return $this->belongsTo(AdPlan::class, 'ad_plan_id');
    }
}
