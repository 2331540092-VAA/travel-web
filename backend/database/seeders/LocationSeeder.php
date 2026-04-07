<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        $vn_id = DB::table('countries')->where('code', 'VN')->value('id');
        $th_id = DB::table('countries')->where('code', 'TH')->value('id');
        
        $cat_sightseeing = DB::table('categories')->where('name', 'Địa điểm tham quan')->value('id');

        DB::table('locations')->insert([
            [
                'name' => 'Vịnh Hạ Long',
                'country_id' => $vn_id,
                'category_id' => $cat_sightseeing,
                'address' => 'Quảng Ninh, Việt Nam',
                'description' => 'Di sản thiên nhiên thế giới với hàng ngàn hòn đảo đá vôi kỳ vĩ.',
                'image_url' => 'https://images.unsplash.com/photo-1528127269322-539801943592',
                'rating' => 4.9,
                'review_count' => 1250,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Phố cổ Hội An',
                'country_id' => $vn_id,
                'category_id' => $cat_sightseeing,
                'address' => 'Quảng Nam, Việt Nam',
                'description' => 'Khu phố cổ kính với lồng đèn rực rỡ và kiến trúc độc đáo.',
                'image_url' => 'https://images.unsplash.com/photo-1555930644-6933b47bd036',
                'rating' => 4.8,
                'review_count' => 980,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Wat Arun',
                'country_id' => $th_id,
                'category_id' => $cat_sightseeing,
                'address' => 'Bangkok, Thailand',
                'description' => 'Ngôi đền Bình Minh lộng lẫy bên bờ sông Chao Phraya.',
                'image_url' => 'https://images.unsplash.com/photo-1563492065599-3520f775eeed',
                'rating' => 4.7,
                'review_count' => 2100,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
