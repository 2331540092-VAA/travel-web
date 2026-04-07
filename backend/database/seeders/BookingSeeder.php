<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookingSeeder extends Seeder
{
    public function run(): void
    {
        $user_id = DB::table('users')->where('email', 'admin@gmail.com')->value('id');
        $hotel_id = DB::table('hotels')->first()->id;

        $booking_id = DB::table('bookings')->insertGetId([
            'user_id' => $user_id,
            'booking_type' => 'hotel',
            'target_id' => $hotel_id,
            'check_in' => now()->addDays(5)->format('Y-m-d'),
            'check_out' => now()->addDays(7)->format('Y-m-d'),
            'quantity' => 1,
            'total_amount' => 5000000,
            'payment_type' => 'full',
            'status' => 'confirmed',
            'note' => 'Yêu cầu phòng tầng cao',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $user_id = DB::table('users')->where('email', 'admin@gmail.com')->value('id');

        DB::table('payments')->insert([
            'booking_id' => $booking_id,
            'user_id' => $user_id,
            'method' => 'vnpay',
            'amount' => 5000000,
            'transaction_code' => 'VNP12345678',
            'status' => 'success',
            'payment_date' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
