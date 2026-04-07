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
            CountrySeeder::class,
            CategorySeeder::class,
            LocationSeeder::class,
            ExploreSeeder::class,
            RestaurantSeeder::class,
            HotelSeeder::class,
            TourSeeder::class,
            BlogSeeder::class,
            BookingSeeder::class,
        ]);
    }
}
