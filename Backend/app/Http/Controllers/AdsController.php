<?php

namespace App\Http\Controllers;
use App\Services\AdsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AdsController extends Controller
{

    protected $adService;

    public function __construct(AdsService $adService)
    {
        $this->adService = $adService;
    }


    public function index()
    {
        $ads = $this->adService->publishedAds();
        return response()->json([
            'ads' => $ads,
        ]);
    }

    public function getPlans()
    {
        $adPlans = $this->adService->adPlans();
        return response()->json([
            'message' => "Success",
            'plans' => $adPlans,
        ]);
    }


    public function getPrices($ids)
    {

        return $this->adService->streamPrices($ids);
    }
}
