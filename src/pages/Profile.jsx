import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

function Profile() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(
    (state) => state.auth.user
  );

  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!isLoggedIn) {
    return (
      <div className="login-required">

        <User size={60} />

        <h1>Welcome to BeautyBloom</h1>

        <p>
          Login to access your account.
        </p>

        <Link
          to="/login"
          className="shop-button"
        >
          Login
        </Link>

      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-header">

        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h1>Hello, {user?.name}</h1>
          <p>{user?.email}</p>
        </div>

      </div>

      <div className="profile-container">

        <aside className="profile-sidebar">

          <Link to="/profile">
            <User size={18} />
            My Profile
          </Link>

          <Link to="/orders">
            <Package size={18} />
            My Orders
          </Link>

          <Link to="/wishlist">
            <Heart size={18} />
            Wishlist
          </Link>

          <Link to="/addresses">
            <MapPin size={18} />
            My Addresses
          </Link>

          <Link to="/settings">
            <Settings size={18} />
            Settings
          </Link>

          <button onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </button>

        </aside>

        <section className="profile-content">

          <h2>Personal Information</h2>

          <div className="profile-details">

            <div>
              <span>Full Name</span>
              <strong>{user?.name}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{user?.email}</strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>+91 XXXXX XXXXX</strong>
            </div>

          </div>

          <button className="edit-profile">
            Edit Profile
          </button>

        </section>

      </div>

    </div>
  );
}

export default Profile;