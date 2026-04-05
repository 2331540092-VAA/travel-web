<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Hotel;
use App\Models\HotelRoom;
use App\Models\Restaurant;
use App\Models\RestaurantTable;
use App\Models\Location;

class TestServicesSeeder extends Seeder
{
    public function run()
    {
        $locations = Location::all();

        $servicesData = [
            'Bali' => [
                'hotels' => [
                    [
                        'name' => 'Ayana Resort and Spa, Bali',
                        'rating' => 5,
                        'price' => 5500000,
                        'desc' => 'Khu nghỉ dưỡng sang trọng bậc nhất với hồ bơi vô cực hướng biển.',
                        'img' => 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
                        'addr' => 'Jimbaran, Bali, Indonesia'
                    ]
                ],
                'restaurants' => [
                    [
                        'name' => 'Locavore',
                        'desc' => 'Nhà hàng nổi tiếng với nguyên liệu địa phương và phong cách ẩm thực hiện đại.',
                        'img' => 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
                        'price' => 1200000,
                        'addr' => 'Ubud, Bali'
                    ]
                ]
            ],
            'Singapore' => [
                'hotels' => [
                    [
                        'name' => 'Marina Bay Sands',
                        'rating' => 5,
                        'price' => 12000000,
                        'desc' => 'Biểu tượng của Singapore với hồ bơi vô cực trên tầng thượng lớn nhất thế giới.',
                        'img' => 'https://images.unsplash.com/photo-1525625293386-3fb0ad7c1fd6?w=800',
                        'addr' => '10 Bayfront Ave, Singapore'
                    ]
                ],
                'restaurants' => [
                    [
                        'name' => 'Newton Food Centre',
                        'desc' => 'Trung tâm ẩm thực ngoài trời nổi tiếng với hải sản và món ăn địa phương.',
                        'img' => 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
                        'price' => 300000,
                        'addr' => '500 Clemenceau Ave N, Singapore'
                    ]
                ]
            ],
            'Hà Nội' => [
                'hotels' => [
                    [
                        'name' => 'Sofitel Legend Metropole Hanoi',
                        'rating' => 5,
                        'price' => 6000000,
                        'desc' => 'Khách sạn lịch sử phong cách Pháp cổ điển ngay trung tâm phố cổ.',
                        'img' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                        'addr' => '15 Ngô Quyền, Hoàn Kiếm, Hà Nội'
                    ]
                ],
                'restaurants' => [
                    [
                        'name' => 'Pizza 4P\'s Tràng Tiền',
                        'desc' => 'Sự kết hợp tuyệt vời giữa Pizza Ý và phong cách phục vụ Nhật Bản.',
                        'img' => 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
                        'price' => 450000,
                        'addr' => '43 Tràng Tiền, Hoàn Kiếm, Hà Nội'
                    ]
                ]
            ],
            'Đà Nẵng' => [
                'hotels' => [
                    [
                        'name' => 'InterContinental Danang Sun Peninsula',
                        'rating' => 5,
                        'price' => 15000000,
                        'desc' => 'Kiến tác nghệ thuật bên vịnh Bán đảo Sơn Trà.',
                        'img' => 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
                        'addr' => 'Bán đảo Sơn Trà, Đà Nẵng'
                    ]
                ],
                'restaurants' => [
                    [
                        'name' => 'Madame Lân',
                        'desc' => 'Không gian ẩm thực truyền thống bên bờ sông Hàn thơ mộng.',
                        'img' => 'https://images.unsplash.com/photo-1555396273-367ea462f6b8?w=800',
                        'price' => 350000,
                        'addr' => '04 Bạch Đằng, Đà Nẵng'
                    ]
                ]
            ],
            'Hạ Long' => [
                'hotels' => [
                    [
                        'name' => 'Vinpearl Resort & Spa Ha Long',
                        'rating' => 5,
                        'price' => 3500000,
                        'desc' => 'Khách sạn biệt lập trên đảo Rều với view toàn cảnh vịnh.',
                        'img' => 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
                        'addr' => 'Đảo Rều, Hạ Long'
                    ]
                ],
                'restaurants' => [
                    [
                        'name' => 'Nhà hàng Cua Vàng',
                        'desc' => 'Nổi tiếng với hải sản tươi sống và món lẩu cua vàng trứ danh.',
                        'img' => 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
                        'price' => 800000,
                        'addr' => 'Bãi Cháy, Hạ Long'
                    ]
                ]
            ],
            'Phú Quốc' => [
                'hotels' => [
                    [
                        'name' => 'JW Marriott Phu Quoc Emerald Bay',
                        'rating' => 5,
                        'price' => 9000000,
                        'desc' => 'Khu nghỉ dưỡng mang phong cách học viện cổ điển bên bãi Khem.',
                        'img' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                        'addr' => 'An Thới, Phú Quốc'
                    ]
                ],
                'restaurants' => [
                    [
                        'name' => 'Chuồn Chuồn Bistro',
                        'desc' => 'Địa điểm ngắm hoàng hôn đẹp nhất Phú Quốc trên đỉnh đồi.',
                        'img' => 'https://images.unsplash.com/photo-1533777857889-4be7c70387f8?w=800',
                        'price' => 400000,
                        'addr' => 'Dương Đông, Phú Quốc'
                    ]
                ]
            ],
            'Bangkok' => [
                'hotels' => [
                    [
                        'name' => 'The Siam Heritage',
                        'rating' => 4,
                        'price' => 2500000,
                        'desc' => 'Khách sạn cổ điển mang đậm nét văn hóa Thái Lan.',
                        'img' => 'https://images.unsplash.com/photo-1541979017773-518420e9a47a?w=800',
                        'addr' => 'Surawong Road, Bangkok'
                    ]
                ],
                'restaurants' => [
                    [
                        'name' => 'Jay Fai',
                        'desc' => 'Nhà hàng đường phố đạt sao Michelin với món trứng cuộn cua huyền thoại.',
                        'img' => 'https://images.unsplash.com/photo-1514328539067-635a81827552?w=800',
                        'price' => 1500000,
                        'addr' => 'Maha Chai Rd, Bangkok'
                    ]
                ]
            ],
            'Phuket' => [
                'hotels' => [
                    [
                        'name' => 'The Shore at Katathani',
                        'rating' => 5,
                        'price' => 11000000,
                        'desc' => 'Biệt thự hồ bơi riêng tư với tầm nhìn ra biển Andaman.',
                        'img' => 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800',
                        'addr' => 'Kata Noi Road, Phuket'
                    ]
                ],
                'restaurants' => [
                    [
                        'name' => 'Blue Elephant Phuket',
                        'desc' => 'Thưởng thức ẩm thực hoàng gia Thái trong dinh thự cổ kính.',
                        'img' => 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
                        'price' => 1800000,
                        'addr' => 'Krabi Road, Phuket'
                    ]
                ]
            ],
            'Đà Lạt' => [
                'hotels' => [
                    [
                        'name' => 'Ana Mandara Villas Dalat',
                        'rating' => 5,
                        'price' => 3000000,
                        'desc' => 'Khu biệt thự Pháp cổ giữa rừng thông thơ mộng.',
                        'img' => 'https://images.unsplash.com/photo-1505822404419-f9693977ebd3?w=800',
                        'addr' => 'Lê Lai, Đà Lạt'
                    ]
                ],
                'restaurants' => [
                    [
                        'name' => 'Cửa hàng Ăn uống Mậu Dịch',
                        'desc' => 'Không gian hoài niệm với các món ăn gia đình Việt Nam.',
                        'img' => 'https://images.unsplash.com/photo-1563379091339-0efb17c714be?w=800',
                        'price' => 200000,
                        'addr' => 'Trần Phú, Đà Lạt'
                    ]
                ]
            ],
            'TP. Hồ Chí Minh' => [
                'hotels' => [
                    [
                        'name' => 'Hotel Des Arts Saigon',
                        'rating' => 5,
                        'price' => 4500000,
                        'desc' => 'Sự hòa quyện giữa nghệ thuật, văn hóa và phong cách sống thượng lưu.',
                        'img' => 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
                        'addr' => '76-78 Nguyễn Thị Minh Khai, Quận 3'
                    ]
                ],
                'restaurants' => [
                    [
                        'name' => 'Secret Garden',
                        'desc' => 'Nhà hàng sân thượng ấm cúng với ẩm thực quê nhà giữa lòng thành phố.',
                        'img' => 'https://images.unsplash.com/photo-1502301103665-0b95cc738def?w=800',
                        'price' => 300000,
                        'addr' => '158 Pasteur, Quận 1'
                    ]
                ]
            ],
            'Siem Reap' => [
                'hotels' => [
                    [
                        'name' => 'Amansara',
                        'rating' => 5,
                        'price' => 25000000,
                        'desc' => 'Nơi nghỉ dưỡng đẳng cấp từng là dinh thự của Hoàng gia Campuchia.',
                        'img' => 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800',
                        'addr' => 'Road to Angkor, Siem Reap'
                    ]
                ],
                'restaurants' => [
                    [
                        'name' => 'Cuisine Wat Damnak',
                        'desc' => 'Sáng tạo tinh hoa ẩm thực Khmer đạt thứ hạng cao tại Châu Á.',
                        'img' => 'https://images.unsplash.com/photo-1551218808-94e220e031ad?w=800',
                        'price' => 1400000,
                        'addr' => 'Wat Damnak Market Street, Siem Reap'
                    ]
                ]
            ],
        ];

        foreach ($locations as $loc) {
            if (isset($servicesData[$loc->name])) {
                $data = $servicesData[$loc->name];
                
                foreach ($data['hotels'] as $h) {
                    Hotel::updateOrCreate(
                        ['name' => $h['name'], 'location_id' => $loc->id],
                        [
                            'rating' => $h['rating'],
                            'price_per_night' => $h['price'],
                            'description' => $h['desc'],
                            'image_url' => $h['img'],
                            'address' => $h['addr'],
                            'lat' => $loc->lat,
                            'lng' => $loc->lng,
                        ]
                    );
                }

                foreach ($data['restaurants'] as $r) {
                    Restaurant::updateOrCreate(
                        ['name' => $r['name'], 'location_id' => $loc->id],
                        [
                            'description' => $r['desc'],
                            'image_url' => $r['img'],
                            'avg_price' => $r['price'],
                            'address' => $r['addr'],
                            'lat' => $loc->lat,
                            'lng' => $loc->lng,
                        ]
                    );
                }
            }
        }
    }
}
