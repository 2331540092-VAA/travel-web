<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RestaurantTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        $tables = [
            // Bé Mặn (Đà Nẵng) - Giả định restaurant_id = 1
            [
                'restaurant_id' => 1,
                'name' => 'Bàn 2 người',
                'capacity' => 2,
                'quantity' => 10,
                'price' => 100000,
                'discount_percent' => 10,
                'dynamic_price' => json_encode(['weekend' => 120000]),
                'note' => 'Gần biển',
            ],
            [
                'restaurant_id' => 1,
                'name' => 'Bàn 6 người',
                'capacity' => 6,
                'quantity' => 5,
                'price' => 300000,
                'discount_percent' => 5,
                'dynamic_price' => json_encode(['weekend' => 350000]),
                'note' => 'Nhóm bạn',
            ],

            // Bát Đàn (Hà Nội) - Giả định restaurant_id = 2
            [
                'restaurant_id' => 2,
                'name' => 'Bàn nhỏ',
                'capacity' => 2,
                'quantity' => 15,
                'price' => 50000,
                'discount_percent' => 0,
                'dynamic_price' => null,
                'note' => 'Không gian trong nhà',
            ],
            [
                'restaurant_id' => 2,
                'name' => 'Bàn gia đình',
                'capacity' => 4,
                'quantity' => 8,
                'price' => 100000,
                'discount_percent' => 0,
                'dynamic_price' => null,
                'note' => 'Ngồi chung bàn dài',
            ],

            // Cua Vàng (Hạ Long) - Giả định restaurant_id = 3
            [
                'restaurant_id' => 3,
                'name' => 'Bàn VIP',
                'capacity' => 4,
                'quantity' => 4,
                'price' => 500000,
                'discount_percent' => 10,
                'dynamic_price' => json_encode(['holiday' => 600000]),
                'note' => 'Phòng riêng',
            ],
            [
                'restaurant_id' => 3,
                'name' => 'Bàn view biển',
                'capacity' => 2,
                'quantity' => 6,
                'price' => 250000,
                'discount_percent' => 0,
                'dynamic_price' => null,
                'note' => 'Nhìn ra vịnh',
            ],

            // Lẩu gà lá é (Đà Lạt) - Giả định restaurant_id = 4
            [
                'restaurant_id' => 4,
                'name' => 'Bàn đôi',
                'capacity' => 2,
                'quantity' => 8,
                'price' => 80000,
                'discount_percent' => 5,
                'dynamic_price' => null,
                'note' => 'Không gian chill',
            ],
            [
                'restaurant_id' => 4,
                'name' => 'Bàn nhóm',
                'capacity' => 5,
                'quantity' => 5,
                'price' => 200000,
                'discount_percent' => 10,
                'dynamic_price' => null,
                'note' => 'Ngoài trời',
            ],

            // Ra Khơi (Phú Quốc) - Giả định restaurant_id = 5
            [
                'restaurant_id' => 5,
                'name' => 'Bàn BBQ',
                'capacity' => 4,
                'quantity' => 6,
                'price' => 350000,
                'discount_percent' => 15,
                'dynamic_price' => json_encode(['weekend' => 400000]),
                'note' => 'Nướng ngoài trời',
            ],
            [
                'restaurant_id' => 5,
                'name' => 'Bàn VIP',
                'capacity' => 6,
                'quantity' => 3,
                'price' => 700000,
                'discount_percent' => 20,
                'dynamic_price' => json_encode(['holiday' => 800000]),
                'note' => 'Phòng lạnh cao cấp',
            ],
            [
                'restaurant_id' => 6,
                'name' => 'Bàn rooftop đôi',
                'capacity' => 2,
                'quantity' => 6,
                'price' => 250000,
                'discount_percent' => 10,
                'dynamic_price' => json_encode(['weekend' => 320000]),
                'note' => 'View sông Chao Phraya',
            ],
            [
                'restaurant_id' => 7,
                'name' => 'Bàn xem múa truyền thống',
                'capacity' => 4,
                'quantity' => 5,
                'price' => 180000,
                'discount_percent' => 5,
                'dynamic_price' => json_encode(['weekend' => 210000]),
                'note' => 'Gần sân khấu',
            ],
            [
                'restaurant_id' => 8,
                'name' => 'Bàn sân vườn',
                'capacity' => 4,
                'quantity' => 6,
                'price' => 220000,
                'discount_percent' => 10,
                'dynamic_price' => json_encode(['holiday' => 260000]),
                'note' => 'Không gian Khmer',
            ],
            [
                'restaurant_id' => 9,
                'name' => 'Bàn cạnh ruộng lúa',
                'capacity' => 4,
                'quantity' => 8,
                'price' => 160000,
                'discount_percent' => 10,
                'dynamic_price' => json_encode(['weekend' => 190000]),
                'note' => 'View đồng lúa Ubud',
            ],
            [
                'restaurant_id' => 10,
                'name' => 'Bàn tatami',
                'capacity' => 4,
                'quantity' => 4,
                'price' => 450000,
                'discount_percent' => 0,
                'dynamic_price' => null,
                'note' => 'Không gian Nhật truyền thống',
            ],
            [
                'restaurant_id' => 11,
                'name' => 'Bàn view Marina',
                'capacity' => 4,
                'quantity' => 5,
                'price' => 350000,
                'discount_percent' => 10,
                'dynamic_price' => json_encode(['weekend' => 420000]),
                'note' => 'Gần cửa kính lớn',
            ],
            [
                'restaurant_id' => 12,
                'name' => 'Bàn đoàn gia đình',
                'capacity' => 6,
                'quantity' => 4,
                'price' => 300000,
                'discount_percent' => 5,
                'dynamic_price' => json_encode(['holiday' => 360000]),
                'note' => 'Phòng riêng nhỏ',
            ],
            [
                'restaurant_id' => 13,
                'name' => 'Bàn trung tâm Myeongdong',
                'capacity' => 4,
                'quantity' => 7,
                'price' => 150000,
                'discount_percent' => 0,
                'dynamic_price' => null,
                'note' => 'Phục vụ nhanh',
            ],
            [
                'restaurant_id' => 14,
                'name' => 'Bàn sân hiên Phuket',
                'capacity' => 4,
                'quantity' => 6,
                'price' => 220000,
                'discount_percent' => 10,
                'dynamic_price' => json_encode(['weekend' => 260000]),
                'note' => 'Gần khu nhìn ra biển',
            ],
            [
                'restaurant_id' => 14,
                'name' => 'Bàn gia đình hải sản',
                'capacity' => 6,
                'quantity' => 4,
                'price' => 360000,
                'discount_percent' => 5,
                'dynamic_price' => json_encode(['holiday' => 420000]),
                'note' => 'Phù hợp nhóm khách tour',
            ],
            [
                'restaurant_id' => 15,
                'name' => 'Bàn kiểu Kyoto',
                'capacity' => 4,
                'quantity' => 5,
                'price' => 280000,
                'discount_percent' => 0,
                'dynamic_price' => null,
                'note' => 'Không gian gỗ yên tĩnh',
            ],
            [
                'restaurant_id' => 15,
                'name' => 'Bàn đoàn nhỏ',
                'capacity' => 6,
                'quantity' => 3,
                'price' => 420000,
                'discount_percent' => 5,
                'dynamic_price' => json_encode(['weekend' => 470000]),
                'note' => 'Gần khu bếp mở',
            ],
            [
                'restaurant_id' => 16,
                'name' => 'Bàn hải sản Jeju',
                'capacity' => 4,
                'quantity' => 6,
                'price' => 240000,
                'discount_percent' => 5,
                'dynamic_price' => json_encode(['weekend' => 280000]),
                'note' => 'Phù hợp khách đi cặp và nhóm nhỏ',
            ],
            [
                'restaurant_id' => 16,
                'name' => 'Bàn đoàn view kính',
                'capacity' => 6,
                'quantity' => 4,
                'price' => 380000,
                'discount_percent' => 10,
                'dynamic_price' => json_encode(['holiday' => 430000]),
                'note' => 'Nhìn ra khu ven biển',
            ],
        ];

        foreach ($tables as &$table) {
            $table['created_at'] = $now;
            $table['updated_at'] = $now;
        }

        DB::table('restaurant_tables')->insert($tables);
    }
}