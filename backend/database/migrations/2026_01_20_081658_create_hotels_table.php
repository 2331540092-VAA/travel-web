<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();

            $table->foreignId('location_id')
                  ->nullable()
                  ->constrained('locations')
                  ->nullOnDelete();

            $table->string('name', 150);
            $table->decimal('rating', 2, 1)->nullable();
            $table->decimal('price_per_night', 12, 2);
            $table->integer('discount_percent')->default(0);
            $table->text('description')->nullable();
            $table->string('image_url')->nullable();
            $table->string('address')->nullable();

            $table->decimal('lat', 9, 6)->nullable();
            $table->decimal('lng', 9, 6)->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hotels');
    }
};
