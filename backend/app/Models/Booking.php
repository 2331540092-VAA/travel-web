<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'booking_type',
        'target_id',
        'check_in',
        'check_out',
        'booking_date',
        'quantity',
        'total_amount',
        'payment_type',
        'status',
        'note',
        'checked_in_at'
    ];

    protected $casts = [
        'checked_in_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
    public function hotelRoom()
    {
        return $this->belongsTo(HotelRoom::class, 'target_id');
    }

    public function restaurantTable()
    {
        return $this->belongsTo(RestaurantTable::class, 'target_id');
    }
    
    public function tour()
    {
        return $this->belongsTo(Tour::class, 'target_id');
    }
}
