import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toggleWishlist } from "../redux/slices/wishlistSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  const handleCart = () => {
    dispatch(addToCart(product));
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="product-card">

      <div className="product-image-container">

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        <button
          className={`wishlist-button ${
            isWishlisted ? "active" : ""
          }`}
          onClick={handleWishlist}
        >
          <Heart
            size={20}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>

      </div>

      <div className="product-info">

        <p className="product-category">
          {product.category}
        </p>

        <Link to={`/products/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>

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

        <button
          className="add-cart-button"
          onClick={handleCart}
        >
          <ShoppingBag size={18} />
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ProductCard;