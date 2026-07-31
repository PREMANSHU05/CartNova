import React, { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/RecentOrders.css";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await API.get("/admin/recent-orders");

      setOrders(data.orders);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="recent-orders">
      <h2>Recent Orders</h2>

      <div className="orders-table">
        <div className="orders-header">
          <span>Customer</span>

          <span>Amount</span>

          <span>Payment</span>

          <span>Status</span>
        </div>

        {orders.map((order) => (
          <div className="order-row" key={order._id}>
            <span>{order.user?.name}</span>

            <span>₹{order.totalPrice}</span>

            <span>{order.paymentStatus}</span>

            <span>{order.orderStatus}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
