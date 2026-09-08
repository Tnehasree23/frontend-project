import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Checkout() {

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const [orderPlaced, setOrderPlaced] =
    useState(false);

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const delivery =
    subtotal >= 999 ? 0 : 49;

  const total = subtotal + delivery;

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="order-success">

        <div className="success-box">

          <div className="success-icon">
            ✓
          </div>

          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you for shopping with BeautyBloom.
          </p>

          <p>
            Your beauty products are on their way.
          </p>

          <Link
            to="/products"
            className="shop-button"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-state">

        <h2>Your cart is empty</h2>

        <Link
          to="/products"
          className="shop-button"
        >
          Shop Now
        </Link>

      </div>
    );
  }

  return (
    <div className="checkout-page">

      <div className="page-heading">

        <h1>Checkout</h1>

        <p>
          Complete your order securely.
        </p>

      </div>

      <div className="checkout-container">

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >

          <h2>Delivery Information</h2>

          <input
            type="text"
            placeholder="Full Name"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            required
          />

          <textarea
            placeholder="Delivery Address"
            rows="4"
            required
          />

          <input
            type="text"
            placeholder="City"
            required
          />

          <input
            type="text"
            placeholder="PIN Code"
            required
          />

          <h2>Payment Method</h2>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              defaultChecked
            />
            Cash on Delivery
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
            />
            UPI
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
            />
            Credit / Debit Card
          </label>

          <button
            type="submit"
            className="place-order-button"
          >
            Place Order — ₹{total}
          </button>

        </form>

        <div className="checkout-summary">

          <h2>Order Summary</h2>

          {cartItems.map((item) => (

            <div
              className="checkout-item"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div>
                <h4>{item.name}</h4>
                <p>
                  Qty: {item.quantity}
                </p>
              </div>

              <strong>
                ₹{item.price * item.quantity}
              </strong>

            </div>

          ))}

          <hr />

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

          <div className="summary-total">
            <span>Total</span>
            <strong>₹{total}</strong>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;