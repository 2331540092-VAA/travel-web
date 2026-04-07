<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \Illuminate\Support\Facades\DB::table('countries')->insert([
            ['code' => 'VN', 'name' => 'Việt Nam', 'cover_url' => 'vn.jpg'],
            ['code' => 'TH', 'name' => 'Thái Lan', 'cover_url' => 'th.jpg'],
            ['code' => 'LA', 'name' => 'Lào', 'cover_url' => 'la.jpg'],
            ['code' => 'KH', 'name' => 'Campuchia', 'cover_url' => 'kh.jpg'],
            ['code' => 'MM', 'name' => 'Myanmar', 'cover_url' => 'mm.jpg'],
            ['code' => 'MY', 'name' => 'Malaysia', 'cover_url' => 'my.jpg'],
            ['code' => 'SG', 'name' => 'Singapore', 'cover_url' => 'sg.jpg'],
            ['code' => 'ID', 'name' => 'Indonesia', 'cover_url' => 'id.jpg'],
            ['code' => 'PH', 'name' => 'Philippines', 'cover_url' => 'ph.jpg'],
        ]);
    }
}
