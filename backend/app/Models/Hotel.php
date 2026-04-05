<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Hotel extends Model
{
    use HasFactory;

    protected $fillable = [
        'location_id',
        'name',
        'rating',
        'price_per_night',
        'discount_percent',
        'discounted_price',
        'description',
        'image_url',
        'address',
        'lat',
        'lng'
    ];

    protected static function booted()
    {
        static::saving(function ($hotel) {
            $price = floatval($hotel->price_per_night ?? 0);
            $discount = floatval($hotel->discount_percent ?? 0);
            $hotel->discounted_price = $price * (1 - $discount / 100);
        });
    }

    protected $casts = [
        'price_per_night' => 'decimal:2',
        'rating' => 'decimal:1',
        'discount_percent' => 'integer',
        'discounted_price' => 'decimal:2',
    ];

    protected $appends = ['discounted_price'];

    // ================= ACCESSORS =================

    public function getDiscountedPriceAttribute($value)
    {
        if ($value) return $value;
        $discount = $this->discount_percent ?? 0;
        return $this->price_per_night * (1 - $discount / 100);
    }

    // ================= RELATIONS =================

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function rooms()
    {
        return $this->hasMany(HotelRoom::class);
    }

    public function bookings()
    {
        return $this->hasManyThrough(
            Booking::class,
            HotelRoom::class,
            'hotel_id',   // FK on hotel_rooms
            'target_id',  // FK on bookings
            'id',         // Local key on hotels
            'id'          // Local key on hotel_rooms
        )->where('bookings.booking_type', 'hotel');
    }

    public function gallery()
    {
        return $this->hasMany(MediaGallery::class, 'target_id')
            ->where('target_type', 'hotel');
    }
}
