<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RestaurantSeeder extends Seeder
{
    public function run(): void
    {
        $location_id = DB::table('locations')->where('name', 'Phố cổ Hội An')->value('id');

        $restaurant_id = DB::table('restaurants')->insertGetId([
            'location_id' => $location_id,
            'name' => 'Nhà hàng Morning Glory',
            'rating' => 4.5,
            'reviews_count' => 450,
            'rating_text' => 'Tuyệt vời',
            'min_price' => 100000,
            'max_price' => 500000,
            'description' => 'Nhà hàng nổi tiếng với các món ăn đặc sản Hội An truyền thống.',
            'image_url' => 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
            'address' => '106 Nguyễn Thái Học, Hội An',
            'menu' => json_encode([
                ['name' => 'Cao Lầu', 'price' => 65000],
                ['name' => 'Cơm Gà', 'price' => 55000],
            ]),
            'amenities' => json_encode(['Wifi', 'Máy lạnh', 'Thanh toán thẻ']),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('restaurant_tables')->insert([
            ['restaurant_id' => $restaurant_id, 'name' => 'A1', 'capacity' => 2, 'status' => 'available', 'created_at' => now(), 'updated_at' => now()],
            ['restaurant_id' => $restaurant_id, 'name' => 'A2', 'capacity' => 4, 'status' => 'available', 'created_at' => now(), 'updated_at' => now()],
            ['restaurant_id' => $restaurant_id, 'name' => 'B1', 'capacity' => 6, 'status' => 'available', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
