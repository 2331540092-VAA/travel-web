import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProfileLayout from "../layouts/ProfileLayout";

// Pages
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import GoogleCallback from "../pages/auth/GoogleCallback";
import Profile from "../pages/profile/Profile";

// Blog
import BlogDetail from "../pages/blog/BlogDetail";

// Explore
import ExploreList from "../pages/explore/ExploreList";
import ExploreDetail from "../pages/explore/ExploreDetail";

// Locations
import LocationPage from "../pages/locations/LocationPage";
import LocationDetail from "../pages/locations/LocationDetail";
import Favorites from "../pages/locations/Favorites";

// Services
import ServicePage from "../pages/services/ServicePage";
import ServiceDetail from "../pages/services/ServiceDetail";
import ServiceBooking from "../pages/services/ServiceBooking";

// Tours
import TourPage from "../pages/tours/TourPage";
import TourDetail from "../pages/tours/TourDetail";
import Payment from "../pages/tours/Payment";
import PaymentSuccess from "../pages/tours/PaymentSuccess";
import BookingHistory from "../pages/bookings/BookingHistory";
import BookingDetail from "../pages/bookings/BookingDetail";
import StaffScan from "../pages/staff/StaffScan";

function AppRoutes() {
  return (
    <Routes>
      {/* ================= MAIN WEBSITE ================= */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        {/* Blog detail */}
        <Route path="/blogs/:id" element={<BlogDetail />} />

        {/* Explore */}
        <Route path="/explore/:slug" element={<ExploreList />} />
        <Route path="/explore/detail/:id" element={<ExploreDetail />} />

        {/* Locations */}
        <Route path="/locations" element={<LocationPage />} />
        <Route path="/locations/:id" element={<LocationDetail />} />
        <Route path="/favorites" element={<Favorites />} />

        {/* Services */}
        <Route path="/services" element={<ServicePage />} />
        <Route path="/services/:type/:id" element={<ServiceDetail />} />
        <Route path="/services/:type/:id/book" element={<ServiceBooking />} />

        {/* Tours */}
        <Route path="/tours" element={<TourPage />} />
        <Route path="/tours/:id" element={<TourDetail />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-return" element={<PaymentSuccess />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/bookings" element={<BookingHistory />} />
        <Route path="/bookings/:id" element={<BookingDetail />} />

        {/* Staff Tools */}
        <Route path="/staff/scan" element={<StaffScan />} />
      </Route>

      {/* ================= AUTH ================= */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
      </Route>

      {/* ================= PROFILE ================= */}
      <Route element={<ProfileLayout />}>
        <Route path="/profile/:id" element={<Profile />} />
      </Route>

      {/* ================= 404 ================= */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default AppRoutes;
