<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Restaurant;
use App\Models\RestaurantTable;
use App\Models\Location;

class RestaurantSeeder extends Seeder
{
    public function run(): void
    {
        $hanoi  = Location::where('name', 'Hà Nội')->first();
        $danang = Location::where('name', 'Đà Nẵng')->first();
        $hcm    = Location::where('name', 'TP. Hồ Chí Minh')->first();

        $restaurants = [
            [
                'location_id' => $hanoi?->id,
                'name' => 'Phở Thìn Bờ Hồ',
                'description' => 'Quán phở huyền thoại Hà Nội từ năm 1979 với nước dùng đậm đà và thịt bò tươi ngon.',
                'image_url' => 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800',
                'avg_price' => 80000,
                'discount_percent' => 0,
                'address' => '13 Lò Đúc, Hai Bà Trưng, Hà Nội',
                'lat' => 21.019920, 'lng' => 105.860540,
                'tables' => [
                    ['name' => 'Bàn 2 người', 'capacity' => 2, 'quantity' => 10],
                    ['name' => 'Bàn 4 người', 'capacity' => 4, 'quantity' => 8],
                ]
            ],
            [
                'location_id' => $danang?->id,
                'name' => 'Nhà hàng Mì Quảng Bà Mua',
                'description' => 'Mì Quảng truyền thống Đà Nẵng với nước lèo tôm cua đậm đà và bánh tráng giòn.',
                'image_url' => 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
                'avg_price' => 60000,
                'discount_percent' => 5,
                'address' => '19-21 Trần Bình Trọng, Hải Châu, Đà Nẵng',
                'lat' => 16.067040, 'lng' => 108.221790,
                'tables' => [
                    ['name' => 'Bàn thường', 'capacity' => 4, 'quantity' => 15],
                    ['name' => 'Bàn VIP', 'capacity' => 8, 'quantity' => 3, 'note' => 'Phòng riêng, có máy lạnh'],
                ]
            ],
            [
                'location_id' => $hcm?->id,
                'name' => 'Cơm Tấm Bụi Sài Gòn',
                'description' => 'Cơm tấm sườn bì chả chuẩn vị Sài Gòn, phục vụ 24/7.',
                'image_url' => 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
                'avg_price' => 55000,
                'discount_percent' => 10,
                'address' => '84 Nguyễn Du, Quận 1, TP.HCM',
                'lat' => 10.776530, 'lng' => 106.699680,
                'tables' => [
                    ['name' => 'Bàn 2 người', 'capacity' => 2, 'quantity' => 12],
                    ['name' => 'Bàn 6 người', 'capacity' => 6, 'quantity' => 6],
                ]
            ],
        ];

        foreach ($restaurants as $data) {
            $tables = $data['tables'];
            unset($data['tables']);

            $restaurant = Restaurant::updateOrCreate(
                ['name' => $data['name']],
                $data
            );

            foreach ($tables as $table) {
                RestaurantTable::updateOrCreate(
                    ['restaurant_id' => $restaurant->id, 'name' => $table['name']],
                    $table
                );
            }
        }
    }
}
