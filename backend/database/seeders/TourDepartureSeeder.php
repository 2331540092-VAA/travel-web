<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TourDepartureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('tour_departures')->truncate();

        $tourNameByLegacyId = [
            1 => 'Tour Đà Nẵng 3N2Đ: Đường lên Tiên Cảnh',
            2 => 'Tour Hà Nội: Hào khí Thăng Long',
            3 => 'Tour Bangkok - Pattaya: Xứ sở Chùa Vàng',
            4 => 'Tour Singapore: Đảo quốc Sư Tử',
            5 => 'Tour Bali: Thiên đường nhiệt đới',
            6 => 'Tour Tokyo: Hiện đại và Truyền thống',
            7 => 'Tour Seoul - Nami: Bản tình ca mùa đông',
            8 => 'Tour Bắc Kinh: Vẻ đẹp vĩnh cửu',
            9 => 'Tour Lào: Đất nước Triệu Voi',
            10 => 'Tour Campuchia: Bí ẩn Angkor',
            11 => 'Tour Vịnh Hạ Long: Du thuyền giữa Kỳ Quan',
            12 => 'Tour Phuket 4N3Đ: Biển Andaman Rực Nắng',
            13 => 'Tour Kyoto 4N3Đ: Nét Đẹp Cố Đô Nhật Bản',
            14 => 'Tour Jeju 4N3Đ: Đảo Tình Yêu Gió Biển',
        ];

        $departures = [
            // TOUR 1: Đà Nẵng
            ['tour_id' => 1, 'departure_date' => '2026-06-01', 'capacity' => 20, 'booked' => 5, 'price' => 5000000, 'discount_percent' => 10, 'is_promotion' => true, 'promotion_end' => '2026-05-25 23:59:59', 'status' => 'available'],
            ['tour_id' => 1, 'departure_date' => '2026-06-10', 'capacity' => 20, 'booked' => 8, 'price' => 5200000, 'discount_percent' => 0, 'is_promotion' => false, 'promotion_end' => null, 'status' => 'available'],

            // TOUR 2: Hà Nội
            ['tour_id' => 2, 'departure_date' => '2026-06-02', 'capacity' => 15, 'booked' => 3, 'price' => 3000000, 'discount_percent' => 0, 'is_promotion' => false, 'promotion_end' => null, 'status' => 'available'],
            ['tour_id' => 2, 'departure_date' => '2026-06-12', 'capacity' => 15, 'booked' => 6, 'price' => 3200000, 'discount_percent' => 5, 'is_promotion' => true, 'promotion_end' => '2026-06-05 00:00:00', 'status' => 'available'],

            // TOUR 3: Bangkok - Pattaya
            ['tour_id' => 3, 'departure_date' => '2026-06-03', 'capacity' => 25, 'booked' => 10, 'price' => 7000000, 'discount_percent' => 15, 'is_promotion' => true, 'promotion_end' => '2026-05-20 23:59:59', 'status' => 'available'],
            ['tour_id' => 3, 'departure_date' => '2026-06-15', 'capacity' => 25, 'booked' => 12, 'price' => 7200000, 'discount_percent' => 0, 'is_promotion' => false, 'promotion_end' => null, 'status' => 'available'],

            // TOUR 4: Singapore
            ['tour_id' => 4, 'departure_date' => '2026-06-04', 'capacity' => 20, 'booked' => 8, 'price' => 6000000, 'discount_percent' => 0, 'is_promotion' => false, 'promotion_end' => null, 'status' => 'available'],
            ['tour_id' => 4, 'departure_date' => '2026-06-18', 'capacity' => 20, 'booked' => 10, 'price' => 6200000, 'discount_percent' => 10, 'is_promotion' => true, 'promotion_end' => '2026-06-10 23:59:59', 'status' => 'available'],

            // TOUR 5: Bali
            ['tour_id' => 5, 'departure_date' => '2026-06-05', 'capacity' => 30, 'booked' => 12, 'price' => 9000000, 'discount_percent' => 20, 'is_promotion' => true, 'promotion_end' => '2026-05-30 23:59:59', 'status' => 'available'],
            ['tour_id' => 5, 'departure_date' => '2026-06-20', 'capacity' => 30, 'booked' => 15, 'price' => 9500000, 'discount_percent' => 0, 'is_promotion' => false, 'promotion_end' => null, 'status' => 'available'],

            // TOUR 6: Tokyo
            ['tour_id' => 6, 'departure_date' => '2026-06-06', 'capacity' => 20, 'booked' => 7, 'price' => 8000000, 'discount_percent' => 0, 'is_promotion' => false, 'promotion_end' => null, 'status' => 'available'],
            ['tour_id' => 6, 'departure_date' => '2026-06-22', 'capacity' => 20, 'booked' => 9, 'price' => 8200000, 'discount_percent' => 0, 'is_promotion' => false, 'promotion_end' => null, 'status' => 'available'],

            // TOUR 7: Seoul - Nami
            ['tour_id' => 7, 'departure_date' => '2026-06-07', 'capacity' => 20, 'booked' => 6, 'price' => 7500000, 'discount_percent' => 10, 'is_promotion' => true, 'promotion_end' => '2026-06-01 23:59:59', 'status' => 'available'],
            ['tour_id' => 7, 'departure_date' => '2026-06-24', 'capacity' => 20, 'booked' => 8, 'price' => 7800000, 'discount_percent' => 0, 'is_promotion' => false, 'promotion_end' => null, 'status' => 'available'],

            // TOUR 8: Bắc Kinh
            ['tour_id' => 8, 'departure_date' => '2026-06-08', 'capacity' => 25, 'booked' => 9, 'price' => 8500000, 'discount_percent' => 0, 'is_promotion' => false, 'promotion_end' => null, 'status' => 'available'],
            ['tour_id' => 8, 'departure_date' => '2026-06-26', 'capacity' => 25, 'booked' => 11, 'price' => 8800000, 'discount_percent' => 0, 'is_promotion' => false, 'promotion_end' => null, 'status' => 'available'],

            // TOUR 9: Lào
            ['tour_id' => 9, 'departure_date' => '2026-06-09', 'capacity' => 15, 'booked' => 4, 'price' => 4000000, 'discount_percent' => 5, 'is_promotion' => true, 'promotion_end' => '2026-06-01 23:59:59', 'status' => 'available'],
            ['tour_id' => 9, 'departure_date' => '2026-06-28', 'capacity' => 15, 'booked' => 6, 'price' => 4200000, 'discount_percent' => 0, 'is_promotion' => false, 'promotion_end' => null, 'status' => 'available'],

            // TOUR 10: Campuchia
            ['tour_id' => 10, 'departure_date' => '2026-06-10', 'capacity' => 20, 'booked' => 5, 'price' => 4500000, 'discount_percent' => 0, 'is_promotion' => false, 'promotion_end' => null, 'status' => 'available'],
            ['tour_id' => 10, 'departure_date' => '2026-06-30', 'capacity' => 20, 'booked' => 7, 'price' => 4700000, 'discount_percent' => 0, 'is_promotion' => false, 'promotion_end' => null, 'status' => 'available'],

            // TOUR 11: Hạ Long
            ['tour_id' => 11, 'departure_date' => '2026-06-11', 'capacity' => 20, 'booked' => 6, 'price' => 6500000, 'discount_percent' => 15, 'is_promotion' => true, 'promotion_end' => '2026-06-05 23:59:59', 'status' => 'available'],
            ['tour_id' => 11, 'departure_date' => '2026-07-02', 'capacity' => 20, 'booked' => 9, 'price' => 6800000, 'discount_percent' => 0, 'is_promotion' => false, 'promotion_end' => null, 'status' => 'available'],

            // TOUR 12: Phuket
            ['tour_id' => 12, 'departure_date' => '2026-06-14', 'capacity' => 20, 'booked' => 7, 'price' => 7900000, 'discount_percent' => 10, 'is_promotion' => true, 'promotion_end' => '2026-06-08 23:59:59', 'status' => 'available'],
            ['tour_id' => 12, 'departure_date' => '2026-07-06', 'capacity' => 20, 'booked' => 10, 'price' => 8200000, 'discount_percent' => 0, 'is_promotion' => false, 'promotion_end' => null, 'status' => 'available'],

            // TOUR 13: Kyoto
            ['tour_id' => 13, 'departure_date' => '2026-06-16', 'capacity' => 18, 'booked' => 6, 'price' => 9800000, 'discount_percent' => 5, 'is_promotion' => true, 'promotion_end' => '2026-06-10 23:59:59', 'status' => 'available'],
            ['tour_id' => 13, 'departure_date' => '2026-07-10', 'capacity' => 18, 'booked' => 8, 'price' => 10200000, 'discount_percent' => 0, 'is_promotion' => false, 'promotion_end' => null, 'status' => 'available'],

            // TOUR 14: Jeju
            ['tour_id' => 14, 'departure_date' => '2026-06-18', 'capacity' => 22, 'booked' => 9, 'price' => 9100000, 'discount_percent' => 8, 'is_promotion' => true, 'promotion_end' => '2026-06-12 23:59:59', 'status' => 'available'],
            ['tour_id' => 14, 'departure_date' => '2026-07-12', 'capacity' => 22, 'booked' => 12, 'price' => 9400000, 'discount_percent' => 0, 'is_promotion' => false, 'promotion_end' => null, 'status' => 'available'],
        ];

        foreach ($departures as &$item) {
            $legacyTourId = (int) $item['tour_id'];
            $tourName = $tourNameByLegacyId[$legacyTourId] ?? null;

            if (!$tourName) {
                throw new \RuntimeException("Không tìm thấy mapping tour cho legacy id: {$legacyTourId}");
            }

            $actualTourId = DB::table('tours')->where('name', $tourName)->value('id');
            if (!$actualTourId) {
                throw new \RuntimeException("Không tìm thấy tour '{$tourName}' trong bảng tours");
            }

            $item['tour_id'] = (int) $actualTourId;
            $item['created_at'] = $now;
            $item['updated_at'] = $now;
        }

        DB::table('tour_departures')->insert($departures);
    }
}