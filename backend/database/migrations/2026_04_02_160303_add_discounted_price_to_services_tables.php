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
            $table->decimal('discounted_price', 15, 2)->after('price')->nullable();
        });

        Schema::table('hotels', function (Blueprint $table) {
            $table->decimal('discounted_price', 15, 2)->after('price_per_night')->nullable();
        });

        Schema::table('restaurants', function (Blueprint $table) {
            $table->decimal('discounted_price', 15, 2)->after('avg_price')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tours', function (Blueprint $table) {
            $table->dropColumn('discounted_price');
        });

        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn('discounted_price');
        });

        Schema::table('restaurants', function (Blueprint $table) {
            $table->dropColumn('discounted_price');
        });
    }
};
