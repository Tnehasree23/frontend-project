import { Link } from "react-router-dom";
import { Package, ShoppingBag } from "lucide-react";

function Orders() {

  const orders = [
    {
      id: "BB10001",
      date: "30 August 2026",
      status: "Delivered",
      total: 1498,
      products: [
        {
          name: "Hydrating Face Serum",
          quantity: 1,
          price: 699
        },
        {
          name: "Rose Face Mist",
          quantity: 1,
          price: 299
        }
      ]
    },
    {
      id: "BB10002",
      date: "25 August 2026",
      status: "Shipped",
      total: 1299,
      products: [
        {
          name: "Luxury Eau De Parfum",
          quantity: 1,
          price: 1299
        }
      ]
    }
  ];

  return (
    <div className="orders-page">

      <div className="page-heading">
        <h1>My Orders</h1>
        <p>Track and manage your BeautyBloom orders.</p>
      </div>

      <div className="orders-container">

        {orders.map((order) => (

          <div className="order-card" key={order.id}>

            <div className="order-header">

              <div>
                <p>Order ID</p>
                <strong>{order.id}</strong>
              </div>

              <div>
                <p>Order Date</p>
                <strong>{order.date}</strong>
              </div>

              <div className="order-status">
                {order.status}
              </div>

            </div>

            <div className="order-products">

              {order.products.map((product, index) => (

                <div
                  className="order-product"
                  key={index}
                >

                  <div className="order-product-icon">
                    <Package size={25} />
                  </div>

                  <div>
                    <h3>{product.name}</h3>
                    <p>
                      Quantity: {product.quantity}
                    </p>
                  </div>

                  <strong>
                    ₹{product.price}
                  </strong>

                </div>

              ))}

            </div>

            <div className="order-footer">

              <strong>
                Total: ₹{order.total}
              </strong>

              <button>
                View Details
              </button>

            </div>

          </div>

        ))}

        <Link
          to="/products"
          className="continue-shopping"
        >
          <ShoppingBag size={18} />
          Continue Shopping
        </Link>

      </div>

    </div>
  );
}

export default Orders;