import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Download } from "lucide-react";
import "../styles/OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const orderId = location.state?.orderId;

  const downloadInvoice = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const response = await fetch(
        `https://cartnova-backend-erst.onrender.com/api/invoice/${orderId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Invoice download failed");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `Invoice-${orderId}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Invoice Error:", error);

      alert("Unable to download invoice");
    }
  };

  return (
    <div className="success-container">
      <div className="success-card">
        <CheckCircle size={90} color="green" />

        <h1>Payment Successful 🎉</h1>

        <p>
          Thank you for shopping with Cartify. Your order has been confirmed.
        </p>

        {orderId && (
          <div className="order-id">
            <h3>Order ID</h3>

            <p>{orderId}</p>
          </div>
        )}

        <button onClick={downloadInvoice}>
          <Download size={18} />
          Download Invoice
        </button>

        <button onClick={() => navigate("/orders")}>View My Orders</button>

        <button className="shop-btn" onClick={() => navigate("/products")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
