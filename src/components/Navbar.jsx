import { Link } from "react-router-dom";
import { Search, Heart, ShoppingBag, User } from "lucide-react";
import { useSelector } from "react-redux";

function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">BeautyBloom</Link>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Shop</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/about">About</Link>
        
        <Link to="/contact">Contact</Link>
      </nav>

      <div className="nav-icons">
        <Link to="/products">
          <Search size={21} />
        </Link>

        <Link to="/wishlist" className="icon-wrapper">
          <Heart size={21} />
          {wishlistItems.length > 0 && (
            <span>{wishlistItems.length}</span>
          )}
        </Link>

        <Link to="/cart" className="icon-wrapper">
          <ShoppingBag size={21} />
          {cartCount > 0 && <span>{cartCount}</span>}
        </Link>

        <Link to="/profile">
          <User size={21} />
        </Link>
      </div>
    </header>
  );
}

export default Navbar;