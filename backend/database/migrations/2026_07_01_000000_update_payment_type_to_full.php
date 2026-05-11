<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Chuyển toàn bộ payment_type='deposit' sang 'full'
     * và cập nhật giá trị mặc định của cột.
     */
    public function up(): void
    {
        // Cập nhật tất cả bản ghi còn là 'deposit' → 'full'
        DB::table('bookings')
            ->where('payment_type', 'deposit')
            ->update(['payment_type' => 'full']);

        // Đổi giá trị default của cột về 'full'
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('payment_type')->default('full')->change();
        });
    }

    /**
     * Rollback: đổi default về 'deposit' (không khôi phục dữ liệu).
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('payment_type')->default('deposit')->change();
        });
    }
};
