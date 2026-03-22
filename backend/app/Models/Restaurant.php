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
        'address',
        'lat',
        'lng'
    ];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
    public function tables()
{
    return $this->hasMany(RestaurantTable::class);
}

}
