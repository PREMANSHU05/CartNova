import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-hot-toast";
import "../styles/MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const statusSteps = ["Pending", "Processing", "Shipped", "Delivered"];

  const cancelOrder = async (id) => {
    const reason = prompt("Reason for cancellation");

    if (!reason) return;

    try {
      await API.put(`/orders/cancel/${id}`, { reason });

      toast.success("Order cancelled");

      getOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to cancel order");
    }
  };

  const requestReturn = async (id) => {
    const reason = prompt("Reason for return");

    if (!reason) return;

    try {
      await API.put(`/orders/return/${id}`, { reason });

      toast.success("Return request submitted");

      getOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to submit return");
    }
  };

  const getOrders = async () => {
    try {
      const response = await API.get("/orders/my-orders");

      setOrders(response.data.orders || []);
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error("Unable to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) {
    return <h2 className="orders-loading">Loading Orders...</h2>;
  }

  return (
    <div className="orders-container">
      <h1 className="orders-title">My Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>No Orders Found</h2>

          <p>Start shopping and your orders will appear here.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>

            <div className="order-header">
              <div>
                <h3>Order ID</h3>

                <p>{order._id}</p>
              </div>

              <span
                className={
                  order.paymentStatus === "Paid"
                    ? "payment-paid"
                    : "payment-pending"
                }
              >
                {order.paymentStatus || "Pending"}
              </span>
            </div>

            <p className="order-date">
              Date: {new Date(order.createdAt).toLocaleDateString("en-IN")}
            </p>


            <div className="ordered-products">
              {order.items?.map((item) => (
                <div className="product-box" key={item._id}>
                  <img
                    src={item.product?.image || "https://placehold.co/120"}
                    alt={item.product?.name || "product"}
                  />

                  <div>
                    <h2>{item.product?.name || "Product Removed"}</h2>

                    <p>Quantity: {item.quantity}</p>

                    <p>Price: ₹{item.product?.price || 0}</p>
                  </div>
                </div>
              ))}
            </div>


            <div className="total-box">
              <span>Total Amount:</span>

              <strong>₹{order.totalPrice}</strong>
            </div>


            <div className="status-wrapper">
              {statusSteps.map((status, index) => {
                const currentIndex = statusSteps.indexOf(order.orderStatus);

                return (
                  <div
                    key={status}
                    className={
                      index <= currentIndex
                        ? "status-item active"
                        : "status-item"
                    }
                  >
                    <div className="status-circle">✓</div>

                    <p>{status}</p>
                  </div>
                );
              })}
            </div>

            {order.returnRequested && (
              <p className="return-status">
                Return Status: <strong>{order.returnStatus}</strong>
              </p>
            )}

            {order.orderStatus !== "Delivered" &&
              order.orderStatus !== "Cancelled" && (
                <button
                  className="cancel-btn"
                  onClick={() => cancelOrder(order._id)}
                >
                  Cancel Order
                </button>
              )}

            {order.orderStatus === "Delivered" && !order.returnRequested && (
              <button
                className="return-btn"
                onClick={() => requestReturn(order._id)}
              >
                Request Return
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
