<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaGallery extends Model
{
    protected $table = 'media_gallery';

    public $timestamps = false;
    // Table only has created_at, no updated_at

    protected $fillable = [
        'target_type',
        'target_id',
        'image_path',
        'is_primary',
        'created_at',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
        'created_at' => 'datetime',
    ];

    // ================= POLYMORPHIC ACCESSOR =================

    /**
     * Get the parent model (Hotel, Tour, Restaurant, etc.)
     */
    public function target()
    {
        $modelMap = [
            'hotel'      => Hotel::class,
            'tour'       => Tour::class,
            'restaurant' => Restaurant::class,
            'place'      => Location::class,
        ];

        $modelClass = $modelMap[$this->target_type] ?? null;

        if ($modelClass) {
            return $this->belongsTo($modelClass, 'target_id');
        }

        return null;
    }
}
