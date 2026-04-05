<?php

use App\Models\Tour;
use App\Models\Hotel;
use App\Models\Restaurant;
use App\Models\Location;
use App\Models\MediaGallery;

echo "--- Fixing Prices and Images ---\n";

// 1. Fix Locations
$locationImages = [
    'Hà Nội' => 'https://images.unsplash.com/photo-1509030464152-c2321e33991f?w=1200',
    'Đà Nẵng' => 'https://images.unsplash.com/photo-1559592481-74488ece12f5?w=1200',
    'TP. Hồ Chí Minh' => 'https://images.unsplash.com/photo-1529154036614-a60975f5c760?w=1200',
    'Hội An' => 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200',
    'Hạ Long' => 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200',
    'Phú Quốc' => 'https://images.unsplash.com/photo-1589308415707-38034df65ad7?w=1200',
    'Đà Lạt' => 'https://images.unsplash.com/photo-1585056763266-9366d8e0f98e?w=1200',
    'Sapa' => 'https://images.unsplash.com/photo-1507963421379-307996c56158?w=1200',
    'Bangkok' => 'https://images.unsplash.com/photo-1508009603885-50cf7c579367?w=1200',
    'Phuket' => 'https://images.unsplash.com/photo-1589394811604-d22744ec6aba?w=1200',
    'Bali' => 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200',
    'Singapore' => 'https://images.unsplash.com/photo-1525625293386-3fb0ad7c1fd6?w=1200',
    'Siem Reap' => 'https://images.unsplash.com/photo-1540611025311-01df3cef54b5?w=1200',
];

foreach ($locationImages as $name => $url) {
    Location::where('name', $name)->update(['image_url' => $url]);
}
echo "Locations updated.\n";

// 2. Fix Tours
$tours = Tour::all();
foreach ($tours as $tour) {
    if (!$tour->image_url || strpos($tour->image_url, 'unsplash.com') === false) {
        $tour->image_url = 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1200';
    }
    // Force recalculate discounted_price
    $tour->save(); 
}
echo "Tours updated.\n";

// 3. Fix Hotels
$hotels = Hotel::all();
foreach ($hotels as $hotel) {
    if (!$hotel->image_url || strpos($hotel->image_url, 'unsplash.com') === false) {
        $hotel->image_url = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200';
    }
    $hotel->save();
}
echo "Hotels updated.\n";

// 4. Fix Restaurants
$restaurants = Restaurant::all();
foreach ($restaurants as $restaurant) {
    if (!$restaurant->image_url || strpos($restaurant->image_url, 'unsplash.com') === false) {
        $restaurant->image_url = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200';
    }
    $restaurant->save();
}
echo "Restaurants updated.\n";

// 5. Fix Gallery
MediaGallery::where('image_path', '')->orWhereNull('image_path')->delete();
$galleries = MediaGallery::all();
foreach ($galleries as $gallery) {
    if (strpos($gallery->image_path, 'unsplash.com') === false) {
       $gallery->image_path = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200';
       $gallery->save();
    }
}
echo "Gallery updated.\n";

echo "--- DONE ---\n";
