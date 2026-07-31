import React, { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/AdminOrders.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await API.get("/orders");

      setOrders(data.orders);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}/status`, {
        orderStatus: status,
      });

      getOrders();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const getStatusClass = (status) => {
    if (status === "Pending") return "pending";

    if (status === "Processing") return "processing";

    if (status === "Shipped") return "shipped";

    if (status === "Delivered") return "delivered";
  };

  return (
    <div className="admin-orders">
      <h1>Manage Orders</h1>

      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          <div className="order-top">
            <div>
              <h3>Order ID</h3>

              <p>#{order._id.slice(-8)}</p>
            </div>

            <span
              className={`status-badge ${getStatusClass(order.orderStatus)}`}
            >
              {order.orderStatus}
            </span>
          </div>

          <div className="section">
            <h3>👤 Customer</h3>

            <p>{order.user?.name}</p>

            <p>{order.user?.email}</p>
          </div>

          <div className="section">
            <h3>🛒 Products</h3>

            {order.items.map((item) => (
              <p key={item._id}>
                {item.product?.name}
                {" × "}
                {item.quantity}
              </p>
            ))}
          </div>

          <div className="section payment-box">
            <h3>💰 Payment</h3>

            <p>Status: {order.paymentStatus}</p>

            <p>Amount: ₹{order.totalPrice}</p>
          </div>

          <div className="timeline">
            <h3>Order Progress</h3>

            <div className="steps">
              <span className={order.orderStatus === "Pending" ? "active" : ""}>
                Pending
              </span>

              <span
                className={order.orderStatus === "Processing" ? "active" : ""}
              >
                Processing
              </span>

              <span className={order.orderStatus === "Shipped" ? "active" : ""}>
                Shipped
              </span>

              <span
                className={order.orderStatus === "Delivered" ? "active" : ""}
              >
                Delivered
              </span>
            </div>
          </div>

          <div className="change-status">
            <select
              value={order.orderStatus}
              onChange={(e) => updateStatus(order._id, e.target.value)}
            >
              <option>Pending</option>

              <option>Processing</option>

              <option>Shipped</option>

              <option>Delivered</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
