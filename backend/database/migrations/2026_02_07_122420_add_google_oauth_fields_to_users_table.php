<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Add Google OAuth fields
            $table->string('google_id')->nullable()->unique()->after('email');
            $table->string('auth_provider')->default('email')->after('google_id'); // 'email' or 'google'

            // Make password nullable for OAuth-only users
            $table->string('password')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['google_id', 'auth_provider']);

            // Revert password to required (this might fail if OAuth users exist)
            $table->string('password')->nullable(false)->change();
        });
    }
};
