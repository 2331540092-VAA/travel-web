<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Country;

class CountrySeeder extends Seeder
{
    public function run(): void
    {
        $countries = [
            ['code' => 'VN', 'name' => 'Việt Nam', 'cover_url' => 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800'],
            ['code' => 'TH', 'name' => 'Thái Lan', 'cover_url' => 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800'],
            ['code' => 'KH', 'name' => 'Campuchia', 'cover_url' => 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800'],
            ['code' => 'LA', 'name' => 'Lào', 'cover_url' => 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?w=800'],
            ['code' => 'MM', 'name' => 'Myanmar', 'cover_url' => 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?w=800'],
            ['code' => 'SG', 'name' => 'Singapore', 'cover_url' => 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800'],
        ];

        foreach ($countries as $country) {
            Country::updateOrCreate(['code' => $country['code']], $country);
        }
    }
}
