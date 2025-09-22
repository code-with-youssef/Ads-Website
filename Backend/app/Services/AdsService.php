<?php

namespace App\Services;

use App\Actions\Ads\AdsStreamPricesAction;
use App\Repositories\Contracts\AdRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AdsService
{
    protected $adRepo;
    protected $adsStreamPricesAction;

    public function __construct(AdRepositoryInterface $adRepo, AdsStreamPricesAction $adsStreamPricesAction)
    {
        $this->adRepo = $adRepo;
        $this->adsStreamPricesAction = $adsStreamPricesAction;
    }

    public function streamPrices($ids)
    {
        return $this->adsStreamPricesAction->execute($ids);
    }

    public function adPlans()
    {
        return $this->adRepo->getAdPlans();
    }


    public function publishedAds()
    {
        return $this->adRepo->getPublishedAds();
    }

    public function pendingAds()
    {

        return $this->adRepo->getPendingAds();
    }

    public function sellerAds($sellerId)
    {
        return $this->adRepo->getSellerAds($sellerId);
    }

    public function storeAd($ad_validation_request, $sellerId)
    {

        $data = $ad_validation_request->validated();
        $data['user_id'] = $sellerId;
        $data['status'] = "Pending";

        if ($ad_validation_request->hasFile('image')) {
            $file = $ad_validation_request->file('image');
            $path = $file->store('ads', 'public');
            $data['image_path'] = $path;
        }

        return $this->adRepo->createAd($data);
    }

    public function updateAdStatus($adId, string $status, $user)
    {
        $ad = $this->adRepo->updateAdStatus($adId, $status);

        if ($user->role === "seller") {
            $user->points -= $ad->ad_plan->price;
            $user->save();
        }

        return $ad;
    }

    public function destroyAd($id)
    {
        $this->adRepo->deleteAd($id);
    }

    public function createUserAd($id, $buyer)
    {
        $buyer->points -= 5;
        $this->adRepo->createUserAd($id, $buyer);
    }
}
