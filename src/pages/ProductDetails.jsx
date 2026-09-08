import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, ShoppingBag, Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import products from "../data/products";
import { addToCart } from "../redux/slices/cartSlice";
import { toggleWishlist } from "../redux/slices/wishlistSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  if (!product) {
    return (
      <div className="not-found">
        <h1>Product Not Found</h1>
        <Link to="/products">
          Back to Products
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="product-details-page">

      <div className="product-details-container">

        {/* IMAGE */}

        <div className="details-image">

          <img
            src={product.image}
            alt={product.name}
          />

        </div>

        {/* INFORMATION */}

        <div className="details-info">

          <p className="details-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <div className="details-rating">
            ⭐ {product.rating}
            <span> | 100+ Reviews</span>
          </div>

          <div className="details-price">

            <span>
              ₹{product.price}
            </span>

            <del>
              ₹{product.oldPrice}
            </del>

            <small>
              {Math.round(
                ((product.oldPrice - product.price) /
                  product.oldPrice) *
                  100
              )}
              % OFF
            </small>

          </div>

          <p className="details-description">
            {product.description}
          </p>

          <div className="benefits">

            <div>
              🚚 Free delivery above ₹999
            </div>

            <div>
              🔄 Easy returns
            </div>

            <div>
              ✨ Authentic beauty products
            </div>

          </div>

          {/* QUANTITY */}

          <div className="quantity-section">

            <span>Quantity:</span>

            <div className="quantity-controls">

              <button
                onClick={() =>
                  setQuantity(
                    Math.max(1, quantity - 1)
                  )
                }
              >
                <Minus size={16} />
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity(quantity + 1)
                }
              >
                <Plus size={16} />
              </button>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="details-actions">

            <button
              className="details-cart-button"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={20} />
              Add to Cart
            </button>

            <button
              className={`details-wishlist-button ${
                isWishlisted ? "active" : ""
              }`}
              onClick={() =>
                dispatch(toggleWishlist(product))
              }
            >
              <Heart
                size={21}
                fill={
                  isWishlisted
                    ? "currentColor"
                    : "none"
                }
              />
            </button>

          </div>

          <Link
            to="/products"
            className="back-products"
          >
            ← Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;