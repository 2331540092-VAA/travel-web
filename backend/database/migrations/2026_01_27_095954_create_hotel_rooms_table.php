<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('hotel_rooms', function (Blueprint $table) {
            $table->id();

            $table->foreignId('hotel_id')
                ->constrained('hotels')
                ->onDelete('cascade');

            $table->string('name'); // Phòng đơn, Phòng đôi, Deluxe...
            $table->integer('price_per_night');
            $table->integer('capacity')->default(2); // số người
            $table->integer('quantity')->default(1); // số phòng cùng loại

            $table->text('description')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hotel_rooms');
    }
};
