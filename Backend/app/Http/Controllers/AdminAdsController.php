<?php

namespace App\Http\Controllers;

use App\Models\Ad;
use App\Services\AdsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAdsController extends Controller
{

    protected $adService;

    public function __construct(AdsService $adService)
    {
        $this->adService = $adService;
    }


    public function index()
    {
        $user = Auth::user();
        $ads = $this->adService->pendingAds();
        return response(
            [
                'ads' => $ads,
                'user' => $user,
            ]
        );
    }


    public function update($adId, $status)
    {
        $user = Auth::user();
        $ad = $this->adService->updateAdStatus($adId, $status, $user);

        return response()->json([
            "message" => "Ad status updated successfully",
            "ad" => $ad
        ], 200);
    }
}
