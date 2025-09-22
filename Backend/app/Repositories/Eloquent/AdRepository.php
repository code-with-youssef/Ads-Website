<?php

namespace App\Repositories\Eloquent;

use App\Models\Ad;
use App\Models\AdPlan;
use App\Models\UserAd;
use App\Repositories\Contracts\AdRepositoryInterface;

class AdRepository implements AdRepositoryInterface
{
    public function getPricesById($ids)
    {
        return Ad::whereIn('id', $ids)->get(['id', 'price']);
    }

    public function getAdPlans()
    {
        return AdPlan::all();
    }

    public function getPublishedAds()
    {
        return  Ad::select('ads.*')
            ->join('ad_plans', 'ads.ad_plan_id', '=', 'ad_plans.id')
            ->where('ads.status', 'Published')
            ->orderBy('ad_plans.price', 'desc')
            ->orderBy('ads.created_at', 'asc')
            ->with('ad_plan', 'user')
            ->paginate(5);
    }

    public function getPendingAds()
    {
        return Ad::with('ad_plan')->where("status", "pending")
            ->with(["user:id,name"])
            ->get();
    }

    public function getSellerAds($id)
    {

        return  Ad::with('ad_plan')->where('user_id', $id)->get();
    }

    public function createAd(array $data)
    {
        $ad = Ad::create($data);
        return $ad->load('ad_plan');
    }

    public function updateAdStatus($adId, string $status)
    {
        $ad = Ad::findOrFail($adId);
        $ad->update(['status' => $status]);
        return $ad;
    }

    public function deleteAd($id)
    {
        $ad = Ad::findOrFail($id);
        return $ad->delete();
    }

    public function createUserAd($id, $buyer)
    {
        UserAd::create([
            'user_id' => $buyer->id,
            'ad_id' => $id
        ]);
    }
}
