<?php

namespace Database\Seeders;

use App\Models\Theme;
use Illuminate\Database\Seeder;

class ThemeSeeder extends Seeder
{
    public function run(): void
    {
        $themes = [
            [
                'name' => 'Tết Nguyên Đán 2026',
                'slug' => 'tet-nguyen-dan-2026',
                'type' => 'tet',
                'banner_url' => 'https://images.unsplash.com/photo-1611516491426-03025e6043c8?w=1200',
                'logo_url' => null,
                'primary_color' => '#dc2626',
                'secondary_color' => '#f59e0b',
                'accent_color' => '#fbbf24',
                'description' => 'Chúc Mừng Năm Mới - Xuân Bính Ngọ 2026',
                'config' => json_encode(['effect' => 'petals', 'intensity' => 'medium']),
                'start_date' => '2026-01-20',
                'end_date' => '2026-02-10',
                'is_active' => false,
            ],
            [
                'name' => 'Giáng Sinh Noel 2026',
                'slug' => 'giang-sinh-noel-2026',
                'type' => 'christmas',
                'banner_url' => 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=1200',
                'logo_url' => null,
                'primary_color' => '#16a34a',
                'secondary_color' => '#dc2626',
                'accent_color' => '#fbbf24',
                'description' => 'Merry Christmas - Giáng Sinh An Lành',
                'config' => json_encode(['effect' => 'snow', 'intensity' => 'high']),
                'start_date' => '2026-12-15',
                'end_date' => '2026-12-31',
                'is_active' => false,
            ],
            [
                'name' => 'Halloween 2026',
                'slug' => 'halloween-2026',
                'type' => 'halloween',
                'banner_url' => 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=1200',
                'logo_url' => null,
                'primary_color' => '#ea580c',
                'secondary_color' => '#7c3aed',
                'accent_color' => '#facc15',
                'description' => 'Happy Halloween - Đêm Hội Ma Quỷ',
                'config' => json_encode(['effect' => 'bats', 'intensity' => 'medium']),
                'start_date' => '2026-10-25',
                'end_date' => '2026-11-01',
                'is_active' => false,
            ],
            [
                'name' => 'Valentine 2026',
                'slug' => 'valentine-2026',
                'type' => 'valentine',
                'banner_url' => 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200',
                'logo_url' => null,
                'primary_color' => '#e11d48',
                'secondary_color' => '#ec4899',
                'accent_color' => '#fb7185',
                'description' => 'Happy Valentine - Ngày Lễ Tình Nhân',
                'config' => json_encode(['effect' => 'hearts', 'intensity' => 'high']),
                'start_date' => '2026-02-10',
                'end_date' => '2026-02-16',
                'is_active' => false,
            ],
            [
                'name' => 'Trung Thu 2026',
                'slug' => 'trung-thu-2026',
                'type' => 'mid_autumn',
                'banner_url' => 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=1200',
                'logo_url' => null,
                'primary_color' => '#d97706',
                'secondary_color' => '#dc2626',
                'accent_color' => '#fbbf24',
                'description' => 'Tết Trung Thu - Đêm Hội Trăng Rằm',
                'config' => json_encode(['effect' => 'lanterns', 'intensity' => 'medium']),
                'start_date' => '2026-09-20',
                'end_date' => '2026-09-30',
                'is_active' => false,
            ],
        ];

        foreach ($themes as $theme) {
            Theme::updateOrCreate(
                ['slug' => $theme['slug']],
                $theme
            );
        }
    }
}
