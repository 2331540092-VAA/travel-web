<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('themes', function (Blueprint $table) {
            $table->id();

            $table->string('name');                          // Tên theme: "Tết Nguyên Đán", "Giáng Sinh"...
            $table->string('slug')->unique();                // slug: "tet-nguyen-dan", "giang-sinh"
            $table->string('type');                           // Loại: tet, christmas, halloween, valentine, mid_autumn...

            $table->string('banner_url')->nullable();        // Ảnh banner chính
            $table->string('logo_url')->nullable();          // Logo/icon theme
            $table->string('primary_color')->nullable();     // Màu chủ đạo (#e74c3c)
            $table->string('secondary_color')->nullable();   // Màu phụ
            $table->string('accent_color')->nullable();      // Màu nhấn

            $table->text('description')->nullable();         // Mô tả theme
            $table->json('config')->nullable();              // Config JSON mở rộng (snow effect, fireworks, etc.)

            $table->date('start_date')->nullable();          // Ngày bắt đầu áp dụng
            $table->date('end_date')->nullable();            // Ngày kết thúc

            $table->boolean('is_active')->default(false);    // Trạng thái bật/tắt (chỉ 1 theme active tại 1 thời điểm)

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('themes');
    }
};
