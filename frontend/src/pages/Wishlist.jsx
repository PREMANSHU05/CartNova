import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import toast from "react-hot-toast";

import "../styles/Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Get Wishlist
  const getWishlist = async () => {
    try {
      const { data } = await API.get("/wishlist");

      setWishlist(data.wishlist?.products || []);
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error("Failed to load wishlist");
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  // Remove Wishlist
  const removeWishlist = async (id) => {
    try {
      await API.delete(`/wishlist/remove/${id}`);

      toast.success("Removed from wishlist");

      getWishlist();
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error(error.response?.data?.message || "Failed to remove wishlist");
    }
  };

  // Add To Cart
  const addToCart = async (id) => {
    try {
      await API.post("/cart/add", {
        productId: id,
        quantity: 1,
      });

      toast.success("Added to cart 🛒");
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error(error.response?.data?.message || "Failed to add cart");
    }
  };

  return (
    <div className="wishlist-page">
      <h1>
        <Heart fill="red" color="red" />
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <h2 className="empty">Wishlist is empty ❤️</h2>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div className="wishlist-card" key={product._id}>
              <img
                src={product.image || "https://placehold.co/300"}
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <p>₹{product.price}</p>

              <div className="wishlist-actions">
                <button onClick={() => addToCart(product._id)}>
                  <ShoppingCart size={18} />
                  Add Cart
                </button>

                <button
                  className="remove"
                  onClick={() => removeWishlist(product._id)}
                >
                  <Trash2 size={18} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
