import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart
} from "../redux/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const delivery = subtotal >= 999 || subtotal === 0
    ? 0
    : 49;

  const total = subtotal + delivery;

  return (
    <div className="cart-page">

      <div className="page-heading">
        <h1>Shopping Cart</h1>
        <p>Review your beauty products before checkout.</p>
      </div>

      {cartItems.length === 0 ? (

        <div className="empty-state">

          <ShoppingBag size={60} />

          <h2>Your cart is empty</h2>

          <p>
            Looks like you haven't added anything yet.
          </p>

          <Link
            to="/products"
            className="shop-button"
          >
            Start Shopping
          </Link>

        </div>

      ) : (

        <div className="cart-container">

          <div className="cart-items">

            {cartItems.map((item) => (

              <div className="cart-item" key={item.id}>

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-info">

                  <p>{item.category}</p>

                  <h3>{item.name}</h3>

                  <strong>
                    ₹{item.price}
                  </strong>

                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        dispatch(
                          decreaseQuantity(item.id)
                        )
                      }
                    >
                      <Minus size={16} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        dispatch(
                          increaseQuantity(item.id)
                        )
                      }
                    >
                      <Plus size={16} />
                    </button>

                  </div>

                </div>

                <div className="cart-item-right">

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>

                  <button
                    className="remove-button"
                    onClick={() =>
                      dispatch(
                        removeFromCart(item.id)
                      )
                    }
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

            ))}

          </div>

          <div className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>
                {delivery === 0
                  ? "FREE"
                  : `₹${delivery}`}
              </span>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>

            <Link
              to="/checkout"
              className="checkout-button"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/products"
              className="continue-shopping"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;