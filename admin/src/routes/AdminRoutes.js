import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
// Pages
import Dashboard from "../pages/dashboard/Dashboard";
import AdminLogin from "../pages/admin/AdminLogin";
// User
import UserList from "../pages/users/UserList";
import UserCreate from "../pages/users/UserCreate";
import UserEdit from "../pages/users/UserEdit";
// Location
import LocationsList from "../pages/locations/LocationList";
import LocationCreate from "../pages/locations/LocationCreate";
import LocationEdit from "../pages/locations/LocationEdit";
// Hotels
import HotelsList from "../pages/hotels/HotelList";
import HotelCreate from "../pages/hotels/HotelCreate";
import HotelEdit from "../pages/hotels/HotelEdit";
// Rooms
import HotelRooms from "../pages/hotels/HotelRooms";
import RoomCreate from "../pages/hotels/RoomCreate";
import RoomEdit from "../pages/hotels/RoomEdit";
// Restaurants
import RestaurantList from "../pages/restaurants/RestaurantList";
import RestaurantCreate from "../pages/restaurants/RestaurantCreate";
import RestaurantEdit from "../pages/restaurants/RestaurantEdit";
// Restaurant Tables
import RestaurantTableList from "../pages/restaurants/RestaurantTableList";
import RestaurantTableCreate from "../pages/restaurants/RestaurantTableCreate";
import RestaurantTableEdit from "../pages/restaurants/RestaurantTableEdit";
// TOURS
import TourList from "../pages/tours/TourList";
import TourCreate from "../pages/tours/TourCreate";
import TourEdit from "../pages/tours/TourEdit";
// TOUR SCHEDULES
import TourScheduleList from "../pages/tours/TourScheduleList";
import TourScheduleCreate from "../pages/tours/TourScheduleCreate";
import TourScheduleEdit from "../pages/tours/TourScheduleEdit";
// TOUR DEPARTURES
import TourDepartureList from "../pages/tours/TourDeparturesList";
import TourDepartureCreate from "../pages/tours/TourDeparturesCreate";
import TourDepartureEdit from "../pages/tours/TourDeparturesEdit";
// BLOGS
import BlogList from "../pages/blogs/BlogList";
import BlogCreate from "../pages/blogs/BlogCreate";
import BlogEdit from "../pages/blogs/BlogEdit";
// Bookings
import BookingList from "../pages/bookings/BookingList";
import BookingDetail from "../pages/bookings/BookingDetail";
// Reviews
import ReviewList from "../pages/reviews/ReviewList";
// Reports
import Reports from "../pages/reports/Reports";
const AdminRoutes = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/admin/login", element: _jsx(AdminLogin, {}) }), _jsxs(Route, { path: "/admin", element: _jsx(AdminLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "users", element: _jsx(UserList, {}) }), _jsx(Route, { path: "users/create", element: _jsx(UserCreate, {}) }), _jsx(Route, { path: "users/edit/:id", element: _jsx(UserEdit, {}) }), _jsx(Route, { path: "reviews", element: _jsx(ReviewList, {}) }), _jsx(Route, { path: "locations", element: _jsx(LocationsList, {}) }), _jsx(Route, { path: "locations/create", element: _jsx(LocationCreate, {}) }), _jsx(Route, { path: "locations/edit/:id", element: _jsx(LocationEdit, {}) }), _jsx(Route, { path: "hotels", element: _jsx(HotelsList, {}) }), _jsx(Route, { path: "hotels/create", element: _jsx(HotelCreate, {}) }), _jsx(Route, { path: "hotels/edit/:id", element: _jsx(HotelEdit, {}) }), _jsx(Route, { path: "hotels/:hotelId/rooms", element: _jsx(HotelRooms, {}) }), _jsx(Route, { path: "hotels/:hotelId/rooms/create", element: _jsx(RoomCreate, {}) }), _jsx(Route, { path: "hotels/:hotelId/rooms/edit/:roomId", element: _jsx(RoomEdit, {}) }), _jsx(Route, { path: "restaurants", element: _jsx(RestaurantList, {}) }), _jsx(Route, { path: "restaurants/create", element: _jsx(RestaurantCreate, {}) }), _jsx(Route, { path: "restaurants/edit/:id", element: _jsx(RestaurantEdit, {}) }), _jsx(Route, { path: "restaurants/:restaurantId/tables", element: _jsx(RestaurantTableList, {}) }), _jsx(Route, { path: "restaurants/:restaurantId/tables/create", element: _jsx(RestaurantTableCreate, {}) }), _jsx(Route, { path: "restaurants/:restaurantId/tables/edit/:id", element: _jsx(RestaurantTableEdit, {}) }), _jsx(Route, { path: "tours", element: _jsx(TourList, {}) }), _jsx(Route, { path: "tours/create", element: _jsx(TourCreate, {}) }), _jsx(Route, { path: "tours/edit/:id", element: _jsx(TourEdit, {}) }), _jsx(Route, { path: "tours/:id/departures", element: _jsx(TourDepartureList, {}) }), _jsx(Route, { path: "tours/:id/departures/create", element: _jsx(TourDepartureCreate, {}) }), _jsx(Route, { path: "tours/:id/departures/edit/:departureId", element: _jsx(TourDepartureEdit, {}) }), _jsx(Route, { path: "tours/:id/schedules", element: _jsx(TourScheduleList, {}) }), _jsx(Route, { path: "tours/:id/schedules/create", element: _jsx(TourScheduleCreate, {}) }), _jsx(Route, { path: "tours/:id/schedules/edit/:scheduleId", element: _jsx(TourScheduleEdit, {}) }), _jsx(Route, { path: "blogs", element: _jsx(BlogList, {}) }), _jsx(Route, { path: "blogs/create", element: _jsx(BlogCreate, {}) }), _jsx(Route, { path: "blogs/edit/:id", element: _jsx(BlogEdit, {}) }), _jsx(Route, { path: "bookings", element: _jsx(BookingList, {}) }), _jsx(Route, { path: "bookings/:id", element: _jsx(BookingDetail, {}) }), _jsx(Route, { path: "reports", element: _jsx(Reports, {}) })] }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/admin/login", replace: true }) })] }));
};
export default AdminRoutes;
