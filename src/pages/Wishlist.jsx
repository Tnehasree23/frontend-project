import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";

function Wishlist() {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const handleRemove = (product) => {
    dispatch(toggleWishlist(product));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="wishlist-page">

      <div className="page-heading">
        <h1>My Wishlist</h1>
        <p>Your favorite beauty products in one place.</p>
      </div>

      {wishlistItems.length === 0 ? (

        <div className="empty-state">
          <Heart size={60} />
          <h2>Your wishlist is empty</h2>

          <p>
            Save your favorite products here and
            shop them whenever you want.
          </p>

          <Link to="/products" className="shop-button">
            Continue Shopping
          </Link>
        </div>

      ) : (

        <div className="wishlist-grid">

          {wishlistItems.map((product) => (

            <div className="wishlist-card" key={product.id}>

              <div className="wishlist-image">
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="wishlist-info">

                <p>{product.category}</p>

                <h3>{product.name}</h3>

                <div className="rating">
                  ⭐ {product.rating}
                </div>

                <div className="price">
                  <span className="current-price">
                    ₹{product.price}
                  </span>

                  <span className="old-price">
                    ₹{product.oldPrice}
                  </span>
                </div>

                <div className="wishlist-actions">

                  <button
                    onClick={() =>
                      handleAddToCart(product)
                    }
                    className="add-cart-button"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>

                  <button
                    onClick={() =>
                      handleRemove(product)
                    }
                    className="remove-button"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Wishlist;