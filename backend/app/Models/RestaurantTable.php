<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RestaurantTable extends Model
{
    use HasFactory;

    protected $table = 'restaurant_tables';

    protected $fillable = [
        'restaurant_id',
        'name',
        'capacity',
        'quantity',
        'note',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */

    // Bàn thuộc về 1 nhà hàng
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    // Bàn có thể được đặt nhiều lần
    public function bookings()
    {
        return $this->hasMany(Booking::class, 'restaurant_table_id');
    }
}
