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
        Schema::table('tours', function (Blueprint $table) {
            $table->decimal('rating', 2, 1)->default(0)->after('image_url');
            $table->unsignedInteger('reviews_count')->default(0)->after('rating');
            $table->string('rating_text')->nullable()->after('reviews_count');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tours', function (Blueprint $table) {
            $table->dropColumn(['rating', 'reviews_count', 'rating_text']);
        });
    }
};
