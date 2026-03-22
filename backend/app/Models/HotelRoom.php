<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HotelRoom extends Model
{
    use HasFactory;

    protected $table = 'hotel_rooms';

    protected $fillable = [
        'hotel_id',
        'name',
        'price_per_night',
        'capacity',
        'quantity',
        'description',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */

    // Phòng thuộc về 1 khách sạn
    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }

    // Phòng có thể được đặt nhiều lần
    public function bookings()
    {
        return $this->hasMany(Booking::class, 'hotel_room_id');
    }
}
