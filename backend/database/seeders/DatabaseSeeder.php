<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     * Order matters: Countries → Locations → Hotels/Restaurants/Tours → Blogs → Admin
     */
    public function run(): void
    {
        $this->call([
            CountrySeeder::class,
            LocationSeeder::class,
            HotelSeeder::class,
            RestaurantSeeder::class,
            TourSeeder::class,
            BlogSeeder::class,
            AdminUserSeeder::class,
        ]);
    }
}
