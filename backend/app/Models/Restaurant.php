<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'location_id',
        'name',
        'description',
        'image_url',
        'avg_price',
        'discount_percent',
        'discounted_price',
        'address',
        'lat',
        'lng'
    ];

    protected static function booted()
    {
        static::saving(function ($restaurant) {
            $price = floatval($restaurant->avg_price ?? 0);
            $discount = floatval($restaurant->discount_percent ?? 0);
            $restaurant->discounted_price = $price * (1 - $discount / 100);
        });
    }

    protected $casts = [
        'avg_price' => 'decimal:2',
        'discount_percent' => 'integer',
        'discounted_price' => 'decimal:2',
    ];

    protected $appends = ['discounted_price'];

    // ================= ACCESSORS =================

    public function getDiscountedPriceAttribute($value)
    {
        if ($value) return $value;
        $discount = $this->discount_percent ?? 0;
        return $this->avg_price * (1 - $discount / 100);
    }

    // ================= RELATIONS =================

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function tables()
    {
        return $this->hasMany(RestaurantTable::class);
    }

    public function bookings()
    {
        return $this->hasManyThrough(
            Booking::class,
            RestaurantTable::class,
            'restaurant_id',
            'target_id',
            'id',
            'id'
        )->where('bookings.booking_type', 'restaurant');
    }

    public function gallery()
    {
        return $this->hasMany(MediaGallery::class, 'target_id')
            ->where('target_type', 'restaurant');
    }
}
