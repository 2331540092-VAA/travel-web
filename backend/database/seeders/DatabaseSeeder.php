<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            CountriesSeeder::class,
            ThemeSeeder::class,
            LocationsSeeder::class,
            RestaurantSeeder::class,
            RestaurantTableSeeder::class,
            HotelSeeder::class,
            HotelRoomSeeder::class,
            TourSeeder::class,
            TourScheduleSeeder::class,
            TourDepartureSeeder::class,
            BlogSeeder::class,
            BookingSeeder::class,
        ]);
    }
}
