<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'country_id',
        'parent_id',
        'name',
        'type',
        'description',
        'address',
        'lat',
        'lng',
        'image_url'
    ];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function parent()
    {
        return $this->belongsTo(Location::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Location::class, 'parent_id');
    }

    public function hotels()
    {
        return $this->hasMany(Hotel::class);
    }

    public function restaurants()
    {
        return $this->hasMany(Restaurant::class);
    }

    public function tours()
    {
        return $this->hasMany(Tour::class);
    }

    public function gallery()
    {
        return $this->hasMany(MediaGallery::class);
    }
}
