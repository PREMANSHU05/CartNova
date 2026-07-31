import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-hot-toast";
import "../styles/Checkout.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);

  const [coupon, setCoupon] = useState("");

  const [discount, setDiscount] = useState(0);

  const [finalAmount, setFinalAmount] = useState(0);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const getCart = async () => {
    try {
      const { data } = await API.get("/cart");

      setCart(data.cart);
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error("Unable to load cart");
    }
  };

  useEffect(() => {
    getCart();

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const applyCoupon = async () => {
    if (!coupon.trim()) {
      toast.error("Please enter a coupon code");

      return;
    }

    try {
      const { data } = await API.post("/coupons/apply", {
        code: coupon,
        amount: totalPrice,
      });

      setDiscount(data.discount);
      setFinalAmount(data.finalAmount);

      toast.success("Coupon Applied 🎉");
    } catch (error) {
      setDiscount(0);
      setFinalAmount(totalPrice);

      toast.error(error.response?.data?.message || "Invalid Coupon");
    }
  };

  const placeOrder = async () => {
    if (
      !address.fullName ||
      !address.phone ||
      !address.address ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      toast.error("Please fill all address details");

      return;
    }

    try {
      // Create order in database

      const orderResponse = await API.post("/orders", {
        shippingAddress: address,
        discount,
        totalPrice: finalAmount || totalPrice,
      });

      const order = orderResponse.data.order;

      // Create Razorpay order

      const paymentResponse = await API.post("/payment/create", {
        amount: finalAmount || totalPrice,
      });

      const razorpayOrder = paymentResponse.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: razorpayOrder.amount,

        currency: "INR",

        name: "Cartify",

        description: "Cartify Shopping Payment",

        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            const verifyResponse = await API.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_signature: response.razorpay_signature,

              orderId: order._id,
            });
            console.log("VERIFY RESPONSE:", verifyResponse.data);
            if (verifyResponse.data.success) {
              toast.success("Payment successful 🎉");

              navigate("/order-success", {
                state: {
                  orderId: order._id,
                },
              });
            }
          } catch (error) {
            console.log("VERIFY ERROR:", error.response?.data || error.message);

            toast.error("Payment verification failed");
          }
        },

        prefill: {
          name: address.fullName,

          contact: address.phone,
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error(error.response?.data?.message || "Payment failed");
    }
  };

  const validItems = cart?.items?.filter((item) => item.product) || [];

  const totalPrice = validItems.reduce(
    (total, item) => total + item.product.price * item.quantity,

    0,
  );

  useEffect(() => {
    setFinalAmount(totalPrice);
  }, [totalPrice]);

  if (!cart) {
    return <h2>Loading checkout...</h2>;
  }

  if (validItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <div className="address-box">
          <h2>Shipping Address</h2>

          <input
            placeholder="Full Name"
            value={address.fullName}
            onChange={(e) =>
              setAddress({
                ...address,
                fullName: e.target.value,
              })
            }
          />

          <input
            placeholder="Phone Number"
            value={address.phone}
            onChange={(e) =>
              setAddress({
                ...address,
                phone: e.target.value,
              })
            }
          />

          <textarea
            placeholder="Complete Address"
            value={address.address}
            onChange={(e) =>
              setAddress({
                ...address,
                address: e.target.value,
              })
            }
          />

          <input
            placeholder="City"
            value={address.city}
            onChange={(e) =>
              setAddress({
                ...address,
                city: e.target.value,
              })
            }
          />

          <input
            placeholder="State"
            value={address.state}
            onChange={(e) =>
              setAddress({
                ...address,
                state: e.target.value,
              })
            }
          />

          <input
            placeholder="Pincode"
            value={address.pincode}
            onChange={(e) =>
              setAddress({
                ...address,
                pincode: e.target.value,
              })
            }
          />
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="coupon-box">
            <input
              type="text"
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />

            <button onClick={applyCoupon}>Apply</button>
          </div>

          {validItems.map((item) => (
            <p key={item.product._id}>
              {item.product.name}
              {" x "}
              {item.quantity}
            </p>
          ))}

          <h3>Subtotal : ₹{totalPrice}</h3>

          {discount > 0 && (
            <h3 className="discount">Discount : -₹{discount}</h3>
          )}

          <h2 className="final-price">Total : ₹{finalAmount}</h2>

          <button onClick={placeOrder}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
