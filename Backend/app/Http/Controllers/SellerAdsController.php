<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdValidationRequest;
use App\Models\Ad;
use App\Services\AdsService;
use Illuminate\Support\Facades\Auth;


class SellerAdsController extends Controller
{

    protected $adService;

    public function __construct(AdsService $adService)
    {
        $this->adService = $adService;
    }


    public function index()
    {
        $seller = Auth::user();
        $ads = $this->adService->sellerAds($seller->id);

        return response()->json([
            'ads' => $ads,
            'user' => $seller,
        ]);
    }


    public function store(AdValidationRequest $ad_validation_request)
    {
        $user = Auth::user();
        $ad = $this->adService->storeAd($ad_validation_request, $user->id);
        return response()->json([
            'message ' => "add was created successfully",
            'ad' => $ad,
        ]);
    }

    public function update($adId)
    {

        $user = Auth::user();
        $ad = $this->adService->updateAdStatus($adId, "Published", $user);

        return response()->json([
            "message" => "Ad status updated successfully",
            "ad" => $ad
        ], 200);
    }


    public function destroy($id)
    {
        $this->adService->destroyAd($id);
        return response()->json([
            "message" => "Ad was deleted successfully",
        ], 200);
    }
}
