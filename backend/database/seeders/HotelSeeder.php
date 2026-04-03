<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Hotel;
use App\Models\HotelRoom;
use App\Models\Location;

class HotelSeeder extends Seeder
{
    public function run(): void
    {
        $danang = Location::where('name', 'Đà Nẵng')->first();
        $dalat  = Location::where('name', 'Đà Lạt')->first();
        $hanoi  = Location::where('name', 'Hà Nội')->first();
        $halong = Location::where('name', 'Hạ Long')->first();

        $hotels = [
            [
                'location_id' => $danang?->id,
                'name' => 'InterContinental Đà Nẵng Sun Peninsula',
                'rating' => 4.8,
                'price_per_night' => 5500000,
                'discount_percent' => 15,
                'description' => 'Resort 5 sao tọa lạc trên bán đảo Sơn Trà với kiến trúc độc đáo lấy cảm hứng từ văn hóa Việt Nam.',
                'image_url' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                'address' => 'Bãi Bắc, Bán đảo Sơn Trà, Đà Nẵng',
                'lat' => 16.118370, 'lng' => 108.268890,
                'rooms' => [
                    ['name' => 'Classic Room', 'price_per_night' => 5500000, 'capacity' => 2, 'quantity' => 20, 'description' => 'Phòng tiêu chuẩn với view vườn'],
                    ['name' => 'Deluxe Ocean View', 'price_per_night' => 8500000, 'capacity' => 2, 'quantity' => 15, 'description' => 'Phòng cao cấp view biển'],
                    ['name' => 'Penthouse Suite', 'price_per_night' => 25000000, 'capacity' => 4, 'quantity' => 3, 'description' => 'Suite cao cấp nhất với hồ bơi riêng'],
                ]
            ],
            [
                'location_id' => $dalat?->id,
                'name' => 'Ana Mandara Villas Dalat',
                'rating' => 4.5,
                'price_per_night' => 3200000,
                'discount_percent' => 10,
                'description' => 'Khu biệt thự cổ Pháp giữa rừng thông xanh mát, mang đậm phong cách Đông Dương.',
                'image_url' => 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
                'address' => '3A Lê Lai, Phường 5, Đà Lạt',
                'lat' => 11.937730, 'lng' => 108.438070,
                'rooms' => [
                    ['name' => 'Villa Deluxe', 'price_per_night' => 3200000, 'capacity' => 2, 'quantity' => 12, 'description' => 'Biệt thự phong cách Pháp'],
                    ['name' => 'Villa Premium', 'price_per_night' => 4800000, 'capacity' => 3, 'quantity' => 8, 'description' => 'Biệt thự cao cấp có lò sưởi'],
                ]
            ],
            [
                'location_id' => $hanoi?->id,
                'name' => 'Sofitel Legend Metropole Hanoi',
                'rating' => 4.9,
                'price_per_night' => 7000000,
                'discount_percent' => 0,
                'description' => 'Khách sạn huyền thoại 5 sao từ năm 1901, biểu tượng của sự sang trọng cổ điển Hà Nội.',
                'image_url' => 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
                'address' => '15 Ngô Quyền, Hoàn Kiếm, Hà Nội',
                'lat' => 21.024850, 'lng' => 105.857960,
                'rooms' => [
                    ['name' => 'Premium Room', 'price_per_night' => 7000000, 'capacity' => 2, 'quantity' => 30, 'description' => 'Phòng cao cấp phong cách cổ điển'],
                    ['name' => 'Grand Prestige Suite', 'price_per_night' => 18000000, 'capacity' => 3, 'quantity' => 5, 'description' => 'Suite tổng thống với view Hồ Hoàn Kiếm'],
                ]
            ],
            [
                'location_id' => $halong?->id,
                'name' => 'Vinpearl Resort & Spa Hạ Long',
                'rating' => 4.6,
                'price_per_night' => 4200000,
                'discount_percent' => 20,
                'description' => 'Resort ven biển với view toàn cảnh Vịnh Hạ Long, hồ bơi vô cực và spa đẳng cấp.',
                'image_url' => 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
                'address' => 'Đảo Rều, Hạ Long, Quảng Ninh',
                'lat' => 20.940000, 'lng' => 107.060000,
                'rooms' => [
                    ['name' => 'Superior Room', 'price_per_night' => 4200000, 'capacity' => 2, 'quantity' => 25, 'description' => 'Phòng tiêu chuẩn view vịnh'],
                    ['name' => 'Family Suite', 'price_per_night' => 8000000, 'capacity' => 4, 'quantity' => 10, 'description' => 'Phòng gia đình rộng rãi'],
                ]
            ],
        ];

        foreach ($hotels as $hotelData) {
            $rooms = $hotelData['rooms'];
            unset($hotelData['rooms']);

            $hotel = Hotel::updateOrCreate(
                ['name' => $hotelData['name']],
                $hotelData
            );

            foreach ($rooms as $room) {
                HotelRoom::updateOrCreate(
                    ['hotel_id' => $hotel->id, 'name' => $room['name']],
                    $room
                );
            }
        }
    }
}
