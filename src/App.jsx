import { Routes, Route } from "react-router-dom";

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
function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>

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

        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;