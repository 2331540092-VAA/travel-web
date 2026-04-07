<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Địa điểm tham quan'],
            ['name' => 'Ẩm thực & Nhà hàng'],
            ['name' => 'Khách sạn & Nghỉ dưỡng'],
            ['name' => 'Tour du lịch'],
            ['name' => 'Văn hóa & Lịch sử'],
            ['name' => 'Biển & Escapes'],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
