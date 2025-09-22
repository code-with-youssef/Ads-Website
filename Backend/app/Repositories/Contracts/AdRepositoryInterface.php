<?php

namespace App\Repositories\Contracts;

interface AdRepositoryInterface
{
    public function getPricesById($ids);

    public function getAdPlans();

    public function getPublishedAds();

    public function getPendingAds();

    public function getSellerAds($id);

    public function createAd(array $data);

    public function updateAdStatus($adId, string $status);

    public function deleteAd($id);

    public function createUserAd($id, $buyer);
}
