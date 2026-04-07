<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HotelSeeder extends Seeder
{
    public function run(): void
    {
        $location_id = DB::table('locations')->where('name', 'Vịnh Hạ Long')->value('id');

        $hotel_id = DB::table('hotels')->insertGetId([
            'location_id' => $location_id,
            'name' => 'Vinpearl Resort & Spa Ha Long',
            'rating' => 4.8,
            'reviews_count' => 1200,
            'rating_text' => 'Xuất sắc',
            'price_per_night' => 2500000,
            'description' => 'Khu nghỉ dưỡng sang trọng bậc nhất trên đảo Rều với view toàn cảnh vịnh.',
            'image_url' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
            'address' => 'Đảo Rều, Bãi Cháy, Hạ Long',
            'amenities' => json_encode(['Hồ bơi', 'Spa', 'Gym', 'Buffet']),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('hotel_rooms')->insert([
            [
                'hotel_id' => $hotel_id,
                'name' => 'Deluxe Ocean View',
                'price_per_night' => 2500000,
                'capacity' => 2,
                'description' => 'Phòng hướng biển cực đẹp với ban công rộng.',
                'image_url' => 'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
                'amenities' => json_encode(['Bồn tắm', 'Wifi', 'Tivi']),
                'total_rooms' => 20,
                'available_rooms' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'hotel_id' => $hotel_id,
                'name' => 'Executive Suite',
                'price_per_night' => 4500000,
                'capacity' => 2,
                'description' => 'Không gian sang trọng với phòng khách riêng biệt.',
                'image_url' => 'https://images.unsplash.com/photo-1582719478250-c89cae4df85b',
                'amenities' => json_encode(['Jacuzzi', 'Wifi', 'Minibar']),
                'total_rooms' => 5,
                'available_rooms' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
