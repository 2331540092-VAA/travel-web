import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import HotelList from "./pages/hotels/HotelList";
import HotelForm from "./pages/hotels/HotelForm";
import TourList from "./pages/tours/TourList";
import TourForm from "./pages/tours/TourForm";
import UserList from "./pages/users/UserList";
import RestaurantList from "./pages/restaurants/RestaurantList";
import RestaurantForm from "./pages/restaurants/RestaurantForm";
import BlogList from "./pages/blogs/BlogList";
import BlogForm from "./pages/blogs/BlogForm";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes (Protected) */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              
              {/* User Management */}
              <Route path="users" element={<UserList />} />
              
              {/* Hotel Management */}
              <Route path="hotels" element={<HotelList />} />
              <Route path="hotels/create" element={<HotelForm />} />
              <Route path="hotels/:id/edit" element={<HotelForm />} />

              {/* Tour Management */}
              <Route path="tours" element={<TourList />} />
              <Route path="tours/create" element={<TourForm />} />
              <Route path="tours/:id/edit" element={<TourForm />} />


              
              {/* Placeholder for other pages */}
              <Route path="users" element={<div className="p-8"><h1 className="text-2xl font-bold">Quản lý người dùng</h1><p className="mt-4 text-gray-500 italic">Tính năng đang phát triển...</p></div>} />
              
              <Route path="restaurants" element={<RestaurantList />} />
              <Route path="restaurants/create" element={<RestaurantForm />} />
              <Route path="restaurants/:id/edit" element={<RestaurantForm />} />
              
              <Route path="blogs" element={<BlogList />} />
              <Route path="blogs/create" element={<BlogForm />} />
              <Route path="blogs/:id/edit" element={<BlogForm />} />
              
              <Route path="settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Cài đặt</h1><p className="mt-4 text-gray-500 italic">Tính năng đang phát triển...</p></div>} />
            </Route>
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

