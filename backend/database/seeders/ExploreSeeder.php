<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExploreSeeder extends Seeder
{
    public function run(): void
    {
        $vn_id = DB::table('countries')->where('code', 'VN')->value('id');
        $cat_culture = DB::table('categories')->where('name', 'Văn hóa & Lịch sử')->value('id');

        DB::table('explores')->insert([
            [
                'category_id' => $cat_culture,
                'country_id' => $vn_id,
                'title' => 'Khám phá văn hóa Cố đô Huế',
                'description' => 'Tìm hiểu về các triều đại phong kiến Việt Nam qua hệ thống cung điện, lăng tẩm tại Huế.',
                'image_url' => 'hue-culture.jpg',
                'tags' => json_encode(['Lịch sử', 'Kiến trúc', 'Cố đô']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => $cat_culture,
                'country_id' => $vn_id,
                'title' => 'Nghệ thuật Múa Rối Nước',
                'description' => 'Một loại hình nghệ thuật dân gian độc đáo của cư dân vùng đồng bằng Bắc Bộ.',
                'image_url' => 'mua-roi-nuoc.jpg',
                'tags' => json_encode(['Nghệ thuật', 'Dân gian', 'Hà Nội']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
