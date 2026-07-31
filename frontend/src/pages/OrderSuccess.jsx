import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Download } from "lucide-react";
import "../styles/OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const orderId = location.state?.orderId;

  const downloadInvoice = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    fetch(`http://localhost:5000/api/invoice/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = `Invoice-${orderId}.pdf`;

        document.body.appendChild(a);

        a.click();

        a.remove();

        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        console.log(err);

        alert("Unable to download invoice");
      });
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
