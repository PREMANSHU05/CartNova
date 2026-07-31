import React, { useEffect, useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import API from "../api/axios";
import { toast } from "react-hot-toast";
import "../styles/Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);

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
  }, []);

  const updateQuantity = async (productId, quantity) => {
    try {
      await API.put(`/cart/update/${productId}`, {
        quantity,
      });

      getCart();
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error("Failed to update quantity");
    }
  };

  const removeProduct = async (productId) => {
    try {
      await API.delete(`/cart/remove/${productId}`);

      toast.success("Product removed");

      getCart();
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error("Failed to remove product");
    }
  };

  if (!cart) {
    return <h2 className="cart-loading">Loading Cart...</h2>;
  }

  const validItems = cart.items?.filter((item) => item.product) || [];

  if (validItems.length === 0) {
    return (
      <div className="empty-cart">
        <ShoppingBag size={80} />

        <h2>Your cart is empty</h2>

        <p>Add some products to continue shopping</p>
      </div>
    );
  }

  const totalPrice = validItems.reduce(
    (total, item) => total + item.product.price * item.quantity,

    0,
  );

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-items">
          {validItems.map((item) => (
            <div className="cart-card" key={item.product._id}>
              <img
                src={item.product.image || "https://placehold.co/300x300"}
                alt={item.product.name}
              />

              <div className="cart-details">
                <h3>{item.product.name}</h3>

                <p>₹{item.product.price}</p>

                <div className="quantity-control">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product._id,

                        Math.max(
                          1,

                          item.quantity - 1,
                        ),
                      )
                    }
                  >
                    <Minus size={16} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product._id,

                        item.quantity + 1,
                      )
                    }
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                className="delete-btn"
                onClick={() => removeProduct(item.product._id)}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Products</span>

            <span>{validItems.length}</span>
          </div>

          <div className="summary-row">
            <span>Total</span>

            <span>₹{totalPrice}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
