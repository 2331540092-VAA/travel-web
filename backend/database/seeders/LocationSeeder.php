<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Location;
use App\Models\Country;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        $vn = Country::where('code', 'VN')->first();
        $th = Country::where('code', 'TH')->first();
        $kh = Country::where('code', 'KH')->first();

        if (!$vn) return;

        // Vietnam locations
        $hanoi = Location::updateOrCreate(
            ['name' => 'Hà Nội', 'country_id' => $vn->id],
            [
                'type' => 'city',
                'description' => 'Thủ đô nghìn năm văn hiến với phố cổ, hồ Hoàn Kiếm và ẩm thực đường phố nổi tiếng.',
                'address' => 'Hà Nội, Việt Nam',
                'lat' => 21.028511,
                'lng' => 105.804817,
                'image_url' => 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
            ]
        );

        $hcm = Location::updateOrCreate(
            ['name' => 'TP. Hồ Chí Minh', 'country_id' => $vn->id],
            [
                'type' => 'city',
                'description' => 'Thành phố năng động nhất Việt Nam với nhịp sống hiện đại và di tích lịch sử.',
                'address' => 'TP. Hồ Chí Minh, Việt Nam',
                'lat' => 10.762622,
                'lng' => 106.660172,
                'image_url' => 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
            ]
        );

        $danang = Location::updateOrCreate(
            ['name' => 'Đà Nẵng', 'country_id' => $vn->id],
            [
                'type' => 'city',
                'description' => 'Thành phố biển xinh đẹp với Cầu Vàng, Bà Nà Hills và bãi biển Mỹ Khê.',
                'address' => 'Đà Nẵng, Việt Nam',
                'lat' => 16.054407,
                'lng' => 108.202164,
                'image_url' => 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800',
            ]
        );

        $dalat = Location::updateOrCreate(
            ['name' => 'Đà Lạt', 'country_id' => $vn->id],
            [
                'type' => 'city',
                'description' => 'Thành phố ngàn hoa trên cao nguyên Lâm Đồng, khí hậu mát mẻ quanh năm.',
                'address' => 'Đà Lạt, Lâm Đồng',
                'lat' => 11.940419,
                'lng' => 108.458313,
                'image_url' => 'https://images.unsplash.com/photo-1586999768265-24af89630739?w=800',
            ]
        );

        $halong = Location::updateOrCreate(
            ['name' => 'Hạ Long', 'country_id' => $vn->id],
            [
                'type' => 'destination',
                'description' => 'Di sản thiên nhiên thế giới với hàng nghìn hòn đảo đá vôi kỳ vĩ.',
                'address' => 'Hạ Long, Quảng Ninh',
                'lat' => 20.959902,
                'lng' => 107.042542,
                'image_url' => 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
            ]
        );

        // Thailand
        if ($th) {
            Location::updateOrCreate(
                ['name' => 'Bangkok', 'country_id' => $th->id],
                [
                    'type' => 'city',
                    'description' => 'Thủ đô sôi động của Thái Lan với chùa vàng, chợ nổi và ẩm thực đường phố.',
                    'address' => 'Bangkok, Thái Lan',
                    'lat' => 13.756331,
                    'lng' => 100.501765,
                    'image_url' => 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800',
                ]
            );

            Location::updateOrCreate(
                ['name' => 'Phuket', 'country_id' => $th->id],
                [
                    'type' => 'destination',
                    'description' => 'Hòn ngọc của biển Andaman với những bãi biển tuyệt đẹp và cuộc sống về đêm sôi động.',
                    'address' => 'Phuket, Thái Lan',
                    'lat' => 7.8804,
                    'lng' => 98.3923,
                    'image_url' => 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800',
                ]
            );
        }

        // Indonesia
        $id = Country::where('code', 'ID')->first();
        if ($id) {
            Location::updateOrCreate(
                ['name' => 'Bali', 'country_id' => $id->id],
                [
                    'type' => 'destination',
                    'description' => 'Đảo của các vị thần với những ngôi đền cổ kính, ruộng bậc thang và bãi biển thơ mộng.',
                    'address' => 'Bali, Indonesia',
                    'lat' => -8.4095,
                    'lng' => 115.1889,
                    'image_url' => 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
                ]
            );
        }

        // Singapore
        $sg = Country::where('code', 'SG')->first();
        if ($sg) {
            Location::updateOrCreate(
                ['name' => 'Singapore', 'country_id' => $sg->id],
                [
                    'type' => 'city',
                    'description' => 'Quốc đảo sư tử với kiến trúc hiện đại, công viên Gardens by the Bay và trung tâm mua sắm sầm uất.',
                    'address' => 'Singapore',
                    'lat' => 1.3521,
                    'lng' => 103.8198,
                    'image_url' => 'https://images.unsplash.com/photo-1525625293386-3fb0ad7c1fd6?w=800',
                ]
            );
        }

        // Cambodia
        if ($kh) {
            Location::updateOrCreate(
                ['name' => 'Siem Reap', 'country_id' => $kh->id],
                [
                    'type' => 'city',
                    'description' => 'Cổng vào kỳ quan Angkor Wat huyền bí.',
                    'address' => 'Siem Reap, Campuchia',
                    'lat' => 13.3622,
                    'lng' => 103.8601,
                    'image_url' => 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800',
                ]
            );
        }

        // Extra Vietnam
        Location::updateOrCreate(
            ['name' => 'Phú Quốc', 'country_id' => $vn->id],
            [
                'type' => 'destination',
                'description' => 'Đảo ngọc với những bãi cát trắng mịn, nước biển trong xanh và hải sản tươi ngon.',
                'address' => 'Phú Quốc, Kiên Giang',
                'lat' => 10.2289,
                'lng' => 103.9572,
                'image_url' => 'https://images.unsplash.com/photo-1570737103014-68939c76926c?w=800',
            ]
        );
    }
}
