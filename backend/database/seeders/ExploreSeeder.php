<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Explore;
use App\Models\Country;
use App\Models\Category;

class ExploreSeeder extends Seeder
{
    public function run()
    {
        // Create categories
        $bienDao = Category::updateOrCreate(['slug' => 'bien-dao'], ['name' => 'Biển Đảo']);
        $vanHoa = Category::updateOrCreate(['slug' => 'van-hoa'], ['name' => 'Văn Hóa & Di Sản']);
        $amThuc = Category::updateOrCreate(['slug' => 'am-thuc'], ['name' => 'Ẩm Thực']);
        $thiNhien = Category::updateOrCreate(['slug' => 'thien-nhien'], ['name' => 'Thiên Nhiên']);
        $thanhPho = Category::updateOrCreate(['slug' => 'thanh-pho'], ['name' => 'Thành Phố']);

        // Get countries
        $vn = Country::where('code', 'VN')->first();
        $th = Country::where('code', 'TH')->first();
        $kh = Country::where('code', 'KH')->first();

        if (!$vn) return;

        $explores = [
            // ============ HẠ LONG - 3 bài ============
            [
                'title' => 'Du thuyền 5 sao trên Vịnh Hạ Long',
                'description' => 'Trải nghiệm ngủ đêm trên du thuyền sang trọng giữa kỳ quan thiên nhiên thế giới. Thức dậy giữa hàng ngàn đảo đá vôi hùng vĩ, thưởng thức bữa sáng trên boong tàu với tầm nhìn 360 độ. Du thuyền 5 sao mang đến trải nghiệm Michelin-level giữa thiên nhiên hoang sơ.',
                'image_url' => 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
                'category_id' => $bienDao->id,
                'country_id' => $vn->id,
            ],
            [
                'title' => 'Chèo kayak khám phá hang động Hạ Long',
                'description' => 'Luồn lạch qua những hang động đá vôi bí ẩn bằng thuyền kayak, ngắm nhìn thạch nhũ triệu năm tuổi lung linh ánh nước. Khám phá hang Sửng Sốt, hang Đầu Gỗ và làng chài Vung Viêng - nơi thời gian như ngừng trôi.',
                'image_url' => 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
                'category_id' => $thiNhien->id,
                'country_id' => $vn->id,
            ],
            [
                'title' => 'Ẩm thực hải sản tươi sống Hạ Long',
                'description' => 'Thưởng thức bữa tiệc hải sản trên bè nổi giữa vịnh với tôm hùm, cua hoàng đế và mực ống tươi ngon vừa đánh bắt. Đặc sản chả mực Hạ Long giã tay dai mềm, ngọt tự nhiên là điểm nhấn không thể bỏ qua.',
                'image_url' => 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
                'category_id' => $amThuc->id,
                'country_id' => $vn->id,
            ],

            // ============ ĐÀ NẴNG - 3 bài ============
            [
                'title' => 'Cầu Vàng Bà Nà Hills - Biểu tượng Đà Nẵng',
                'description' => 'Check-in tại cây cầu nổi tiếng nhất Việt Nam được hai bàn tay khổng lồ nâng đỡ giữa mây trời. Cáp treo Bà Nà giữ kỷ lục dài nhất thế giới đưa bạn lên độ cao 1.487m trong 20 phút, ngắm toàn cảnh Đà Nẵng từ trên cao.',
                'image_url' => 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80',
                'category_id' => $vanHoa->id,
                'country_id' => $vn->id,
            ],
            [
                'title' => 'Bãi biển Mỹ Khê - Top biển đẹp nhất hành tinh',
                'description' => 'Bãi biển được Forbes bình chọn 1 trong 6 bãi biển đẹp nhất hành tinh với cát trắng mịn dài 30km. Tắm biển, lướt sóng, ngắm bình minh hoặc đơn giản là nằm dài trên ghế bố thưởng thức cocktail giữa thiên đường.',
                'image_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
                'category_id' => $bienDao->id,
                'country_id' => $vn->id,
            ],
            [
                'title' => 'Phố cổ Hội An - Đèn lồng mộng mơ',
                'description' => 'Dạo bước qua những con phố cổ kính lung linh đèn lồng khi chiều buông. Thả hoa đăng trên sông Hoài, thưởng thức cao lầu và mì Quảng truyền thống. Hội An là nơi giao thoa văn hóa Việt-Nhật-Hoa độc nhất vô nhị.',
                'image_url' => 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?w=800&q=80',
                'category_id' => $vanHoa->id,
                'country_id' => $vn->id,
            ],

            // ============ ĐÀ LẠT - 3 bài ============
            [
                'title' => 'Săn mây đồi chè Cầu Đất lúc bình minh',
                'description' => 'Thức dậy lúc 4 giờ sáng để lên đỉnh đồi chè Cầu Đất đón bình minh giữa biển mây bồng bềnh. Những luống chè xanh ngắt uốn lượn trên sườn đồi, sương mù bao phủ tạo nên bức tranh thiên nhiên mê hoặc.',
                'image_url' => 'https://images.unsplash.com/photo-1586999768265-24af89630739?w=800&q=80',
                'category_id' => $thiNhien->id,
                'country_id' => $vn->id,
            ],
            [
                'title' => 'Quán cafe giữa rừng thông Đà Lạt',
                'description' => 'Nhâm nhi ly cà phê weasel chính gốc trong những quán cafe nằm giữa rừng thông bạt ngàn. Không gian yên bình, sương mai phủ trắng và tiếng chim hót ríu rít tạo nên trải nghiệm "chữa lành" hoàn hảo.',
                'image_url' => 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
                'category_id' => $amThuc->id,
                'country_id' => $vn->id,
            ],
            [
                'title' => 'Thung lũng Tình Yêu và hoa dã quỳ',
                'description' => 'Tháng 10-11, Đà Lạt khoác lên mình tấm áo vàng rực của hoa dã quỳ. Thung lũng Tình Yêu với hồ nước xanh biếc, vườn hoa bốn mùa và con đường tình yêu lãng mạn là điểm hẹn không thể bỏ lỡ.',
                'image_url' => 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80',
                'category_id' => $thiNhien->id,
                'country_id' => $vn->id,
            ],

            // ============ HÀ NỘI - 3 bài ============
            [
                'title' => 'Phố cổ Hà Nội - 36 phố phường',
                'description' => 'Lạc mình trong mê cung 36 phố phường cổ kính ngàn năm tuổi. Mỗi con phố mang một nghề, một câu chuyện riêng. Phố Hàng Mã rực rỡ đèn lồng, phố Tạ Hiện sôi động bia hơi và phố Hàng Đào nhộn nhịp mua sắm.',
                'image_url' => 'https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?w=800&q=80',
                'category_id' => $vanHoa->id,
                'country_id' => $vn->id,
            ],
            [
                'title' => 'Bún chả Obama - Huyền thoại ẩm thực Hà thành',
                'description' => 'Nơi cựu Tổng thống Mỹ Barack Obama từng ghé thăm cùng đầu bếp Anthony Bourdain. Bún chả thơm lừng nướng than hoa, nem rán giòn rụm và bia Hà Nội lạnh tê là combo hoàn hảo cho bữa trưa Hà Nội.',
                'image_url' => 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&q=80',
                'category_id' => $amThuc->id,
                'country_id' => $vn->id,
            ],
            [
                'title' => 'Văn Miếu Quốc Tử Giám - Trường đại học đầu tiên',
                'description' => 'Thăm trường đại học đầu tiên của Việt Nam, nơi lưu giữ 82 bia Tiến sĩ được UNESCO công nhận. Kiến trúc cổ kính nghìn năm tuổi giữa lòng thủ đô hiện đại, nơi sinh viên đến cầu may mỗi mùa thi.',
                'image_url' => 'https://images.unsplash.com/photo-1571078284868-3db1fdf61649?w=800&q=80',
                'category_id' => $vanHoa->id,
                'country_id' => $vn->id,
            ],

            // ============ SÀI GÒN - 3 bài ============
            [
                'title' => 'Sài Gòn về đêm - Thành phố không ngủ',
                'description' => 'Phố đi bộ Nguyễn Huệ lung linh ánh đèn, Bitexco Tower sáng rực trên nền trời đêm. Ghé rooftop bar tầng 52 ngắm toàn cảnh Sài Gòn, thưởng thức cocktail signature của bartender hàng đầu Đông Nam Á.',
                'image_url' => 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
                'category_id' => $thanhPho->id,
                'country_id' => $vn->id,
            ],
            [
                'title' => 'Cơm tấm Sài Gòn - Huyền thoại đường phố',
                'description' => 'Cơm tấm sườn bì chả kèm nước mắm pha chua ngọt vừa miệng, ăn kèm đồ chua giòn tan. Từ quán vỉa hè đến nhà hàng sang trọng, cơm tấm luôn là món ăn "quốc dân" của người Sài Gòn.',
                'image_url' => 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
                'category_id' => $amThuc->id,
                'country_id' => $vn->id,
            ],
            [
                'title' => 'Nhà thờ Đức Bà và Bưu điện Trung Tâm',
                'description' => 'Hai biểu tượng kiến trúc Pháp giữa lòng Sài Gòn. Nhà thờ xây từ năm 1863 với gạch đỏ nhập từ Marseille, nằm đối diện Bưu điện trung tâm theo phong cách Gothic hoành tráng mang đậm dấu ấn Đông Dương.',
                'image_url' => 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
                'category_id' => $vanHoa->id,
                'country_id' => $vn->id,
            ],

            // ============ BANGKOK - 3 bài ============
            [
                'title' => 'Chùa Vàng Wat Phra Kaew - Linh hồn Bangkok',
                'description' => 'Ngôi chùa linh thiêng nhất Thái Lan nằm trong khuôn viên Hoàng Cung. Pho tượng Phật Ngọc Lục Bảo 600 năm tuổi được điêu khắc từ một khối ngọc duy nhất, thu hút hàng triệu du khách mỗi năm.',
                'image_url' => 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80',
                'category_id' => $vanHoa->id,
                'country_id' => $th?->id ?? $vn->id,
            ],
            [
                'title' => 'Chợ nổi Damnoen Saduak - Trải nghiệm sông nước',
                'description' => 'Chợ nổi truyền thống 150 năm tuổi với hàng trăm chiếc thuyền gỗ chở đầy trái cây, hoa tươi và đồ ăn nóng hổi. Ngồi trên thuyền len lỏi qua các kênh rạch, mua pad thai tươi ngon từ tay người bán trên sông.',
                'image_url' => 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&q=80',
                'category_id' => $amThuc->id,
                'country_id' => $th?->id ?? $vn->id,
            ],
            [
                'title' => 'Khao San Road - Thiên đường ba lô',
                'description' => 'Con phố sôi động nhất châu Á dành cho dân phượt. Nhạc sống, ánh neon, pad thai vỉa hè và bia Chang lạnh tê - tất cả hòa quyện tạo nên năng lượng cuồng nhiệt không thể tìm thấy ở bất kỳ đâu.',
                'image_url' => 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80',
                'category_id' => $thanhPho->id,
                'country_id' => $th?->id ?? $vn->id,
            ],

            // ============ SIEM REAP - 3 bài ============
            [
                'title' => 'Angkor Wat - Kỳ quan thế giới',
                'description' => 'Quần thể đền Angkor Wat 900 năm tuổi - di sản thế giới lớn nhất bao phủ 400km². Ngắm bình minh tím hồng phản chiếu trên hào nước trước đền chính, khám phá đền Ta Prohm với rễ cây khổng lồ ôm ấp phế tích.',
                'image_url' => 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=80',
                'category_id' => $vanHoa->id,
                'country_id' => $kh?->id ?? $vn->id,
            ],
            [
                'title' => 'Hoàng hôn trên đền Bakheng',
                'description' => 'Leo 108 bậc đá lên đỉnh đồi Bakheng - ngôi đền Hindu cổ xưa nhất Angkor. Từ đây, ngắm hoàng hôn rực rỡ phủ ánh vàng lên toàn bộ quần thể Angkor Wat ẩn hiện giữa rừng xanh bất tận.',
                'image_url' => 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
                'category_id' => $thiNhien->id,
                'country_id' => $kh?->id ?? $vn->id,
            ],
            [
                'title' => 'Ẩm thực Khmer - Fish Amok và Lok Lak',
                'description' => 'Fish Amok - cá hấp lá chuối với sốt curry dừa béo ngậy mang hương vị Khmer đặc trưng. Kết hợp Lok Lak bò xào tiêu sốt lime chua cay và cơm Kampot thơm lừng. Bữa tối lý tưởng sau một ngày khám phá đền đài.',
                'image_url' => 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
                'category_id' => $amThuc->id,
                'country_id' => $kh?->id ?? $vn->id,
            ],
        ];

        // Clear old data
        Explore::truncate();

        foreach($explores as $e) {
            Explore::create($e);
        }
    }
}
