<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TourDeparture extends Model
{
    use HasFactory;

    protected $fillable = [
        'tour_id',
        'departure_date',
        'capacity',
        'booked',
        'price',
        'discount_percent',
        'is_promotion',
        'promotion_end',
        'status',
    ];

    protected $casts = [
        'departure_date' => 'date',
        'promotion_end' => 'datetime',
        'is_promotion' => 'boolean',
        'price' => 'decimal:2',
    ];

    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }

    /**
     * Check if seats are available
     */
    public function hasAvailability(): bool
    {
        return $this->booked < $this->capacity && $this->status === 'available';
    }

    /**
     * Get remaining seats
     */
    public function remainingSeats(): int
    {
        return max(0, $this->capacity - $this->booked);
    }

    /**
     * Get final price after discount
     */
    public function getFinalPriceAttribute(): float
    {
        return $this->price * (1 - $this->discount_percent / 100);
    }
}
