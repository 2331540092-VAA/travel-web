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
        'description',
        'image_url',
        'address',
        'lat',
        'lng'
    ];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
    public function rooms()
{
    return $this->hasMany(HotelRoom::class);
}

}
