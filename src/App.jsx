import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Addresses from "./pages/Addresses";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Categories from "./pages/Categories";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";
import AdminCategories from "./admin/AdminCategories";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute";

function App() {
  const location = useLocation();

  // Check whether the current page belongs to the Admin Panel
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Customer Navbar - hidden on Admin pages */}
      {!isAdminPage && <Navbar />}

      <main>
        <Routes>

          {/* Customer Routes */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/addresses"
            element={<Addresses />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/categories"
            element={<Categories />}
          />


          {/* Admin Routes */}

          <Route path="/admin/login" element={<AdminLogin />} />

<Route
  path="/admin/dashboard"
  element={
    <ProtectedAdminRoute>
      <AdminDashboard />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/products"
  element={
    <ProtectedAdminRoute>
      <AdminProducts />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/orders"
  element={
    <ProtectedAdminRoute>
      <AdminOrders />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <ProtectedAdminRoute>
      <AdminUsers />
    </ProtectedAdminRoute>
  }
/>

<Route
  path="/admin/categories"
  element={
    <ProtectedAdminRoute>
      <AdminCategories />
    </ProtectedAdminRoute>
  }
/>

        </Routes>
      </main>

      {/* Customer Footer - hidden on Admin pages */}
      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;