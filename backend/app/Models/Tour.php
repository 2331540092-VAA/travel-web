<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tour extends Model
{
    use HasFactory;

    protected $fillable = [
        'location_id',
        'name',
        'days',
        'price',
        'discount_percent',
        'discounted_price',
        'description',
        'image_url'
    ];

    protected static function booted()
    {
        static::saving(function ($tour) {
            $price = floatval($tour->price ?? 0);
            $discount = floatval($tour->discount_percent ?? 0);
            $tour->discounted_price = $price * (1 - $discount / 100);
        });
    }

    protected $casts = [
        'price' => 'decimal:2',
        'discount_percent' => 'integer',
        'discounted_price' => 'decimal:2',
    ];

    protected $appends = ['discounted_price'];

    // ================= ACCESSORS =================

    public function getDiscountedPriceAttribute($value)
    {
        if ($value) return $value;
        $discount = $this->discount_percent ?? 0;
        return $this->price * (1 - $discount / 100);
    }

    // ================= RELATIONS =================

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function schedules()
    {
        return $this->hasMany(TourSchedule::class);
    }

    public function departures()
    {
        return $this->hasMany(TourDeparture::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'target_id')
            ->where('booking_type', 'tour');
    }

    public function gallery()
    {
        return $this->hasMany(MediaGallery::class, 'target_id')
            ->where('target_type', 'tour');
    }
}
