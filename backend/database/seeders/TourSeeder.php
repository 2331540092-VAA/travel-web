<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Tour::create([
            'location_id' => 1,
            'name' => 'Tour Test Payment VNPay',
            'days' => 3,
            'price' => 3150000,
            'discount_percent' => 0,
            'description' => 'Đây là một tour mẫu được tạo ra để test luồng thanh toán.',
            'image_url' => 'https://res.cloudinary.com/duozv3mhe/image/upload/v1737976694/v2_3_n93oxv.png',
        ]);
    }
}
