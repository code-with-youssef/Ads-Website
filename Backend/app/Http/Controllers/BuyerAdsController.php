<?php

namespace App\Http\Controllers;

use App\Models\UserAd;
use App\Services\AdsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BuyerAdsController extends Controller
{

    protected $adService;

    public function __construct(AdsService $adService)
    {
        $this->adService = $adService;
    }
    public function adPay($id)
    {
        $buyer = Auth::user();
        $this->adService->createUserAd($id, $buyer);
    }
}
