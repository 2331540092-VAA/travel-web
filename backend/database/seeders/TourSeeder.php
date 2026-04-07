<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TourSeeder extends Seeder
{
    public function run(): void
    {
        $location_id = DB::table('locations')->where('name', 'Vịnh Hạ Long')->value('id');

        $tour_id = DB::table('tours')->insertGetId([
            'location_id' => $location_id,
            'name' => 'Tour Du Thuyền Hạ Long 2 Ngày 1 Đêm',
            'slug' => Str::slug('Tour Du Thuyền Hạ Long 2 Ngày 1 Đêm'),
            'days' => 2,
            'transport' => 'Du thuyền 5 sao',
            'departure_location' => 'Hà Nội',
            'description' => 'Hành trình khám phá vẻ đẹp kỳ vĩ của vịnh Hạ Long trên du thuyền sang trọng.',
            'content' => 'Chi tiết hành trình: Ngày 1 tham quan hang Luồn, đảo Ti Tốp. Ngày 2 khám phá hang Sửng Sốt.',
            'image_url' => 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('tour_departures')->insert([
            [
                'tour_id' => $tour_id,
                'departure_date' => now()->addDays(7)->format('Y-m-d'),
                'price' => 3500000,
                'capacity' => 20,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tour_id' => $tour_id,
                'departure_date' => now()->addDays(14)->format('Y-m-d'),
                'price' => 3200000,
                'capacity' => 15,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        DB::table('tour_schedules')->insert([
            [
                'tour_id' => $tour_id,
                'day_number' => 1,
                'title' => 'Khởi hành & Tham quan Hang Luồn',
                'activity' => 'Đón khách tại Hà Nội, lên tàu và tham quan Hang Luồn bằng chèo thuyền Kayak.',
                'image_url' => 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tour_id' => $tour_id,
                'day_number' => 2,
                'title' => 'Khám phá Hang Sửng Sốt & Trở về',
                'activity' => 'Tham quan hang động lớn nhất Vịnh Hạ Long và quay về bến tàu.',
                'image_url' => 'https://images.unsplash.com/photo-1550850839-8dc894ed385a',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
