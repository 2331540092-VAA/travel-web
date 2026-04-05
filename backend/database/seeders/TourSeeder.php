<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tour;
use App\Models\Location;
use Carbon\Carbon;

class TourSeeder extends Seeder
{
    public function run(): void
    {
        $locations = [
            'Hà Nội' => Location::where('name', 'Hà Nội')->first(),
            'TP. Hồ Chí Minh' => Location::where('name', 'TP. Hồ Chí Minh')->first(),
            'Đà Nẵng' => Location::where('name', 'Đà Nẵng')->first(),
            'Đà Lạt' => Location::where('name', 'Đà Lạt')->first(),
            'Hạ Long' => Location::where('name', 'Hạ Long')->first(),
            'Bangkok' => Location::where('name', 'Bangkok')->first(),
            'Siem Reap' => Location::where('name', 'Siem Reap')->first(),
            'Phuket' => Location::where('name', 'Phuket')->first(),
            'Bali' => Location::where('name', 'Bali')->first(),
            'Singapore' => Location::where('name', 'Singapore')->first(),
            'Phú Quốc' => Location::where('name', 'Phú Quốc')->first(),
        ];

        $toursData = [
            [
                'loc' => 'Bali',
                'info' => [
                    'name' => 'Siêu Phẩm Bali: Cổng Trời - Xích Đu - Biển Xanh',
                    'days' => 5,
                    'price' => 12500000,
                    'discount_percent' => 5,
                    'description' => 'Hành trình khám phá hòn đảo thiên đường Bali, check-in Cổng Trời Lempuyang, trải nghiệm xích đu tử thần và đắm mình trong làn nước trong xanh tại Nusa Penida.',
                    'image_url' => 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
                ],
                'schedules' => [
                    ['day_number' => 1, 'title' => 'Hà Nội/HCM - Bali', 'activity' => 'Bay đến sân bay Denpasar. Xe đón và đưa về khách sạn tại Ubud.'],
                    ['day_number' => 2, 'title' => 'Cổng Trời Lempuyang', 'activity' => 'Khám phá đền Lempuyang với Cổng Trời nổi tiếng. Thăm đền nước Tirta Gangga.'],
                    ['day_number' => 3, 'title' => 'Bali Swing - Rice Terrace', 'activity' => 'Trải nghiệm xích đu tại Ubud, ngắm ruộng bậc thang Tegalalang. Thăm đền Tanah Lot lúc hoàng hôn.'],
                    ['day_number' => 4, 'title' => 'Đảo Nusa Penida', 'activity' => 'Đi tàu cao tốc sang đảo. Thăm bãi biển Kelingking (Sống lưng khủng long), Broken Beach.'],
                    ['day_number' => 5, 'title' => 'Shopping - Tiễn khách', 'activity' => 'Mua sắm quà lưu niệm. Tiễn khách ra sân bay.'],
                ],
            ],
            [
                'loc' => 'Singapore',
                'info' => [
                    'name' => 'Singapore Hiện Đại: Gardens by the Bay - Sentosa',
                    'days' => 4,
                    'price' => 15800000,
                    'discount_percent' => 0,
                    'description' => 'Khám phá quốc đảo sư tử sạch đẹp nhất hành tinh. Thăm quan siêu cây khổng lồ, Jewel Changi và vui chơi bất tận tại Universal Studios Sentosa.',
                    'image_url' => 'https://images.unsplash.com/photo-1525625293386-3fb0ad7c1fd6?w=800',
                ],
                'schedules' => [
                    ['day_number' => 1, 'title' => 'Đến Singapore - Jewel Changi', 'activity' => 'Đáp chuyến bay đến Changi. Thác nước trong nhà cao nhất thế giới tại Jewel. Về nhận phòng khách sạn.'],
                    ['day_number' => 2, 'title' => 'City Tour - Gardens by the Bay', 'activity' => 'Thăm Công viên Sư tử biển Merlion, Tòa nhà Quốc hội. Chiều khám phá Flower Dome và Cloud Forest.'],
                    ['day_number' => 3, 'title' => 'Đảo Sentosa - Universal Studios', 'activity' => 'Trọn ngày vui chơi tại Universal Studios Singapore. Xem show nhạc nước Wings of Time.'],
                    ['day_number' => 4, 'title' => 'Shopping - Trở về', 'activity' => 'Tự do mua sắm tại Orchard Road. Tiễn sân bay Changi.'],
                ],
            ],
            [
                'loc' => 'Phú Quốc',
                'info' => [
                    'name' => 'Thiên Đường Phú Quốc: Ngắm Hoàng Hôn - Lặn Ngắm San Hô',
                    'days' => 3,
                    'price' => 4500000,
                    'discount_percent' => 15,
                    'description' => 'Nghỉ dưỡng tại đảo Ngọc, tham gia tour 4 đảo bằng cano, câu cá, lặn ngắm san hô và chiêm ngưỡng hoàng hôn rực rỡ tại Sunset Sanato.',
                    'image_url' => 'https://images.unsplash.com/photo-1589394815804-964ed9be2eb3?w=800',
                ],
                'schedules' => [
                    ['day_number' => 1, 'title' => 'Đón khách - Sunset Sanato', 'activity' => 'Xe đón tại sân bay Phú Quốc. Chiều check-in Sunset Sanato ngắm hoàng hôn. Tối dạo chợ đêm.'],
                    ['day_number' => 2, 'title' => 'Tour Cano 4 Đảo', 'activity' => 'Khám phá Hòn Móng Tay, Hòn Mây Rút, lặn ngắm san hô. Trải nghiệm cáp treo Hòn Thơm.'],
                    ['day_number' => 3, 'title' => 'Vườn Tiêu - Trở về', 'activity' => 'Thăm vườn tiêu, nhà thùng nước mắm. Tiễn sân bay Phú Quốc.'],
                ],
            ],
            [
                'loc' => 'Bangkok',
                'info' => [
                    'name' => 'Thái Lan Rực Rỡ: Bangkok - Pattaya',
                    'days' => 5,
                    'price' => 7900000,
                    'discount_percent' => 10,
                    'description' => 'Tour truyền thống Thái Lan với những ngôi đền vàng, ẩm thực đường phố Bangkok và giải trí sôi động tại thành phố biển Pattaya.',
                    'image_url' => 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800',
                ],
                'schedules' => [
                    ['day_number' => 1, 'title' => 'Đến Bangkok', 'activity' => 'Xe đón tại sân bay Suvarnabhumi. Về khách sạn, tự do khám phá phố đi bộ Khaosan.'],
                    ['day_number' => 2, 'title' => 'Chùa Phật Vàng - Pattaya', 'activity' => 'Thăm chùa Wat Traimit, dạo thuyền trên sông Chao Phraya. Khởi hành đi Pattaya.'],
                    ['day_number' => 3, 'title' => 'Đảo Coral - Kancchanaburi', 'activity' => 'Đi cano ra đảo Coral, tắm biển. Chiều thăm Vườn nhiệt đới Nong Nooch.'],
                    ['day_number' => 4, 'title' => 'Muang Boran - Bangkok', 'activity' => 'Thăm thành phố cổ Muang Boran. Tối xem show Alcazar hoành tráng.'],
                    ['day_number' => 5, 'title' => 'Wat Saket - Shopping', 'activity' => 'Thăm Chùa Núi Vàng. Mua sắm tại Big C, Central World. Tiễn sân bay.'],
                ],
            ],
            [
                'loc' => 'Hạ Long',
                'info' => [
                    'name' => 'Hạ Long Kỳ Vĩ: Nghỉ Đêm Trên Du Thuyền 5 Sao',
                    'days' => 2,
                    'price' => 3800000,
                    'discount_percent' => 10,
                    'description' => 'Trải nghiệm đẳng cấp trên du thuyền, chèo Kayak giữa vịnh, thăm hang động và thưởng thức tiệc tối sang trọng.',
                    'image_url' => 'https://images.unsplash.com/photo-1524338198850-8a2ff63a610f?w=800',
                ],
                'schedules' => [
                    ['day_number' => 1, 'title' => 'Cảng Tuần Châu - Vịnh Hạ Long', 'activity' => 'Lên tàu, ăn trưa buffet. Chiều thăm hang Sửng Sốt, chèo thuyền Kayak.'],
                    ['day_number' => 2, 'title' => 'Bình Minh Trên Biển', 'activity' => 'Tập Taichi, thăm đảo Titop. Ăn trưa và về lại bến.'],
                ],
            ]
        ];

        foreach ($toursData as $data) {
            $loc = $locations[$data['loc']] ?? null;
            if (!$loc) continue;

            $data['info']['location_id'] = $loc->id;
            $tour = Tour::create($data['info']);

            foreach ($data['schedules'] as $schedule) {
                $tour->schedules()->create($schedule);
            }

            // Create departures
            for ($i = 0; $i < 2; $i++) {
                $tour->departures()->create([
                    'departure_date' => Carbon::now()->addDays(rand(5, 45))->format('Y-m-d'),
                    'capacity' => 20,
                    'booked' => rand(0, 10),
                    'price' => $data['info']['price'],
                    'discount_percent' => $data['info']['discount_percent'],
                    'status' => 'available',
                ]);
            }
        }

        // Add more basic tours for other locations to ensure data coverage
        $otherLocs = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Đà Lạt', 'Siem Reap', 'Phuket'];
        foreach ($otherLocs as $locName) {
            $loc = $locations[$locName] ?? null;
            if (!$loc) continue;

            $price = rand(20, 60) * 100000;
            $tour = Tour::create([
                'location_id' => $loc->id,
                'name' => "Khám phá sắc màu $locName",
                'days' => rand(2, 4),
                'price' => $price,
                'discount_percent' => rand(0, 15),
                'description' => "Trải nghiệm văn hóa và cảnh đẹp tại $locName với mức giá cực kỳ ưu đãi.",
                'image_url' => "https://source.unsplash.com/featured/?travel,$locName",
            ]);

            $tour->schedules()->create([
                'day_number' => 1,
                'title' => 'Khởi hành',
                'activity' => "Đón khách và tham quan trung tâm $locName."
            ]);

            $tour->departures()->create([
                'departure_date' => Carbon::now()->addDays(rand(5, 30))->format('Y-m-d'),
                'capacity' => 25,
                'booked' => 2,
                'price' => $price,
                'discount_percent' => 5,
                'status' => 'available',
            ]);
        }
    }
}

