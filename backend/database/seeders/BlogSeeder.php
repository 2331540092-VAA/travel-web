<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Blog;
use App\Models\User;
use Illuminate\Support\Str;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('role', 'admin')->first();

        $blogs = [
            [
                'title' => 'Top 10 Điểm Đến Đông Nam Á Không Thể Bỏ Lỡ Năm 2026',
                'content' => 'Đông Nam Á luôn là điểm đến mơ ước của du khách toàn cầu. Từ vịnh Hạ Long huyền bí đến đền Angkor Wat kỳ vĩ, mỗi quốc gia đều mang một vẻ đẹp riêng biệt. Trong bài viết này, chúng tôi sẽ giới thiệu 10 điểm đến hot nhất năm 2026 mà bạn nhất định phải ghé thăm. Hạ Long Bay - Di sản thiên nhiên UNESCO với hàng nghìn hòn đảo đá vôi. Bangkok - Thành phố không bao giờ ngủ với chùa vàng lấp lánh. Bali - Hòn đảo thiên đường với ruộng bậc thang xanh mướt. Siem Reap - Cổng vào thế giới cổ đại Angkor. Đà Nẵng - Thành phố biển hiện đại với Cầu Vàng nổi tiếng.',
                'cover_url' => 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
                'is_published' => true,
            ],
            [
                'title' => 'Ẩm Thực Đường Phố Việt Nam: Hành Trình Từ Bắc Vào Nam',
                'content' => 'Việt Nam được biết đến là thiên đường ẩm thực đường phố. Từ tô phở Hà Nội nóng hổi buổi sáng đến đĩa cơm tấm Sài Gòn giữa trưa, mỗi vùng miền đều có những món ăn độc đáo. Phở Hà Nội - Nước dùng trong veo, thịt bò thái mỏng. Bún chả - Thịt nướng than hoa dậy mùi thơm. Mì Quảng Đà Nẵng - Sợi mì vàng tươi với nước lèo tôm cua. Bánh mì Sài Gòn - Sự kết hợp hoàn hảo giữa Đông và Tây. Cơm tấm - Cơm gạo tấm với sườn nướng, chả, bì.',
                'cover_url' => 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800',
                'is_published' => true,
            ],
            [
                'title' => 'Hướng Dẫn Du Lịch Bụi Đông Nam Á Với Budget 500 USD',
                'content' => 'Du lịch bụi Đông Nam Á không nhất thiết phải tốn kém. Với 500 USD, bạn hoàn toàn có thể trải nghiệm 2 tuần tuyệt vời. Bí quyết là chọn đúng thời điểm, đặt hostel giá rẻ, ăn uống tại quán địa phương và di chuyển bằng xe buýt hoặc tàu hỏa. Đây là cẩm nang chi tiết giúp bạn tối ưu chi phí mà vẫn có trải nghiệm tuyệt vời.',
                'cover_url' => 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800',
                'is_published' => true,
            ],
        ];

        foreach ($blogs as $blogData) {
            Blog::updateOrCreate(
                ['title' => $blogData['title']],
                array_merge($blogData, [
                    'author_id' => $admin?->id,
                    'slug' => Str::slug($blogData['title']),
                ])
            );
        }
    }
}
