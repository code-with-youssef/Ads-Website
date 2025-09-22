<?php

namespace App\Actions\Ads;

use App\Repositories\Contracts\AdRepositoryInterface;
use Illuminate\Support\Facades\Log;

class AdsStreamPricesAction
{

    protected $adRepo;

    public function __construct(AdRepositoryInterface $adRepo)
    {
        $this->adRepo = $adRepo;
    }


    public function execute(string $ids)
    {

        try {
            $newIds = explode(',', $ids);

            // Validate IDs
            $newIds = array_filter($newIds, function ($id) {
                return is_numeric($id) && $id > 0;
            });

            if (empty($newIds)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid IDs provided',
                    'data' => null
                ], 400);
            }

            // Get prices
            $prices = $this->adRepo->getPricesById($newIds);

            Log::info($prices);

            return response()->json([
                'success' => true,
                'data' => [
                    'prices' => $prices,
                    'ids' => $newIds,
                    'timestamp' => now()->toISOString(),
                    'count' => count($prices)
                ]
            ], 200, [
                'Access-Control-Allow-Origin' => 'http://localhost:3000',
                'Access-Control-Allow-Credentials' => 'true',
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
                'Pragma' => 'no-cache',
                'Expires' => '0'
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching prices: ' . $e->getMessage(), [
                'ids' => $ids,
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch prices',
                'data' => null
            ], 500);
        }
    }
}
