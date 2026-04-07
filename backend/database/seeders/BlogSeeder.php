<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('blogs')->insert([
            [
                'title' => 'Kinh nghiệm du lịch Hội An tự túc từ A-Z',
                'content' => 'Hội An không chỉ đẹp bởi những dãy nhà cổ mà còn hấp dẫn bởi nền ẩm thực phong phú...',
                'cover_url' => 'blog-hoian.jpg',
                'is_published' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Top 5 món ngon phải thử khi đến Bangkok',
                'content' => 'Pad Thai, Tom Yum, Xôi xoài là những món ăn bạn không thể bỏ qua...',
                'cover_url' => 'blog-bangkok.jpg',
                'is_published' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
