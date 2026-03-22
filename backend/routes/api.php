<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GoogleAuthController;

use App\Http\Controllers\Api\{
    CountryController,
    ExploreController,
    LocationController,
    HotelController,
    RestaurantController,
    TourController,
    BlogController,
    BookingController,
    PaymentController,
    UserMarkerController,
    ProfileController,
    ServiceBookingController
};

use App\Http\Controllers\Admin\{
    UserController as AdminUserController,
    CategoryController,
    ExploreController as AdminExploreController,
    LocationController as AdminLocationController,
    HotelController as AdminHotelController,
    RestaurantController as AdminRestaurantController,
    TourController as AdminTourController,
    BlogController as AdminBlogController
};

/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// Google OAuth
Route::get('/auth/google', [GoogleAuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/
Route::middleware(['auth.session', 'admin'])
    ->prefix('admin')
    ->group(function () {
        Route::apiResource('users', AdminUserController::class);
        Route::apiResource('categories', CategoryController::class)->except(['show']);
        Route::apiResource('explores', AdminExploreController::class)->except(['show']);
        Route::apiResource('locations', AdminLocationController::class);
        Route::apiResource('hotels', AdminHotelController::class)->except(['show']);
        Route::apiResource('restaurants', AdminRestaurantController::class)->except(['show']);
        Route::apiResource('tours', AdminTourController::class)->except(['show']);
        Route::apiResource('blogs', AdminBlogController::class)->except(['show']);
    });

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/
Route::get('/countries', [CountryController::class, 'index']);
Route::get('/countries/{id}', [CountryController::class, 'show']);

Route::get('/explores', [ExploreController::class, 'index']);
Route::get('/explores/{id}', [ExploreController::class, 'show']);

Route::get('/locations', [LocationController::class, 'index']);
Route::get('/locations/{id}', [LocationController::class, 'show']);

Route::get('/hotels', [HotelController::class, 'index']);
Route::get('/hotels/{id}', [HotelController::class, 'show']);

Route::get('/restaurants', [RestaurantController::class, 'index']);
Route::get('/restaurants/{id}', [RestaurantController::class, 'show']);

Route::get('/tours', [TourController::class, 'index']);
Route::get('/tours/{id}', [TourController::class, 'show']);

Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/{id}', [BlogController::class, 'show']);

Route::get('/hotels/{id}/rooms', [HotelController::class, 'rooms']);
Route::get('/restaurants/{id}/tables', [RestaurantController::class, 'tables']);

/*
|--------------------------------------------------------------------------
| BOOKINGS (NO AUTH MIDDLEWARE - CHECK USER_ID IN REQUEST)
|--------------------------------------------------------------------------
*/
Route::post('/bookings', [BookingController::class, 'store']);
Route::get('/bookings/{id}', [BookingController::class, 'show']);
Route::post('/bookings/{id}/cancel', [BookingController::class, 'cancel']);
Route::get('/my-bookings', [BookingController::class, 'myBookings']);

/*
|--------------------------------------------------------------------------
| USER (AUTH REQUIRED)
|--------------------------------------------------------------------------
*/
Route::middleware('auth.session')->group(function () {

    // PROFILE
    Route::get('/users/{id}', [ProfileController::class, 'show']);
    Route::put('/users/{id}', [ProfileController::class, 'update']);

    // SERVICE BOOKING (DÙNG CHUNG BOOKINGS)
    Route::get('/service/options', [ServiceBookingController::class, 'getOptions']);
    Route::post('/service/book', [ServiceBookingController::class, 'store']);
    Route::get('/service/my-bookings', [ServiceBookingController::class, 'myBookings']);

    // PAYMENTS
    Route::post('/payments', [PaymentController::class, 'store']);

    // MARKERS
    Route::get('/markers', [UserMarkerController::class, 'index']);
    Route::post('/markers', [UserMarkerController::class, 'store']);
});
Route::post('/payment/vnpay', [PaymentController::class, 'createPayment']);
Route::get('/payment/vnpay-return', [PaymentController::class, 'vnpayReturn']);