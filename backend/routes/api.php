<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GoogleAuthController;
use App\Http\Controllers\Admin\AdminAuthController;

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
    HotelRoomController as AdminHotelRoomController,
    RestaurantController as AdminRestaurantController,
    RestaurantTableController as AdminRestaurantTableController,
    TourController as AdminTourController,
    TourScheduleController as AdminTourScheduleController,
    BlogController as AdminBlogController,
    DashboardController
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
| ADMIN AUTH
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->group(function () {
    Route::post('/login',  [AdminAuthController::class, 'login']);
    Route::post('/logout', [AdminAuthController::class, 'logout']);
    Route::get('/me',      [AdminAuthController::class, 'me']);
});

/*
|--------------------------------------------------------------------------
| ADMIN CRUD
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->group(function () {
    Route::get('/dashboard/stats', [DashboardController::class, 'index']);
    Route::apiResource('users', AdminUserController::class);
    Route::apiResource('categories', CategoryController::class)->except(['show']);
    Route::apiResource('explores', AdminExploreController::class)->except(['show']);
    Route::apiResource('locations', AdminLocationController::class);
    Route::apiResource('hotels', AdminHotelController::class);
    Route::apiResource('restaurants', AdminRestaurantController::class);
    Route::apiResource('tours', AdminTourController::class);
    Route::apiResource('blogs', AdminBlogController::class);

    // Hotel Rooms
    Route::get('hotels/{hotel}/rooms', [AdminHotelRoomController::class, 'byHotel']);
    Route::get('hotel-rooms/{id}', [AdminHotelRoomController::class, 'show']);
    Route::post('hotel-rooms', [AdminHotelRoomController::class, 'store']);
    Route::put('hotel-rooms/{id}', [AdminHotelRoomController::class, 'update']);
    Route::delete('hotel-rooms/{id}', [AdminHotelRoomController::class, 'destroy']);

    // Restaurant Tables
    Route::get('restaurants/{restaurant}/tables', [AdminRestaurantTableController::class, 'byRestaurant']);
    Route::get('restaurant-tables/{id}', [AdminRestaurantTableController::class, 'show']);
    Route::post('restaurant-tables', [AdminRestaurantTableController::class, 'store']);
    Route::put('restaurant-tables/{id}', [AdminRestaurantTableController::class, 'update']);
    Route::delete('restaurant-tables/{id}', [AdminRestaurantTableController::class, 'destroy']);

    // Tour Schedules
    Route::get('tours/{tour}/schedules', [AdminTourScheduleController::class, 'byTour']);
    Route::get('tour-schedules/{id}', [AdminTourScheduleController::class, 'show']);
    Route::post('tour-schedules', [AdminTourScheduleController::class, 'store']);
    Route::put('tour-schedules/{id}', [AdminTourScheduleController::class, 'update']);
    Route::delete('tour-schedules/{id}', [AdminTourScheduleController::class, 'destroy']);
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
Route::get('/bookings/{id}/pdf', [BookingController::class, 'exportPdf']);
Route::post('/bookings/{id}/cancel', [BookingController::class, 'cancel']);
Route::post('/bookings/verify-qr', [BookingController::class, 'verifyQRCode']);
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
// PayOS Routes
Route::post('/payment/payos', [PaymentController::class, 'createPayosPayment']);
Route::get('/payment/payos-return', [PaymentController::class, 'payosReturn']);
Route::post('/payment/payos-webhook', [PaymentController::class, 'payosWebhook']);
Route::post('/payment/payos-simulate', [PaymentController::class, 'simulatePayosSuccess']);

// MoMo Routes
Route::post('/payment/momo', [PaymentController::class, 'createMomoPayment']);
Route::get('/payment/momo-return', [PaymentController::class, 'momoReturn']);
Route::post('/payment/momo-ipn', [PaymentController::class, 'momoIpn']);
Route::post('/payment/momo-simulate', [PaymentController::class, 'simulateMomoSuccess']);

/*
|--------------------------------------------------------------------------
| PUBLIC TOUR SCHEDULES
|--------------------------------------------------------------------------
*/
Route::get('tours/{tour}/schedules', [AdminTourScheduleController::class, 'byTour']);