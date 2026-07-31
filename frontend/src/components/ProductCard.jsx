import { useState } from "react";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-hot-toast";

import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const [wishlisted, setWishlisted] = useState(false);

  // Add To Cart
  const addToCart = async () => {
    try {
      await API.post("/cart/add", {
        productId: product._id,

        quantity: 1,
      });

      toast.success("Product added to cart 🛒");
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error(error.response?.data?.message || "Please login first");
    }
  };

  // Add Wishlist
  const addToWishlist = async (e) => {
    e.stopPropagation();

    try {
      await API.post(`/wishlist/add/${product._id}`);

      setWishlisted(true);

      toast.success("Added to wishlist ❤️");
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error(error.response?.data?.message || "Please login first");
    }
  };

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div className="product-image">
        <div className="discount">20% OFF</div>

        <button
          className={wishlisted ? "wishlist-btn active" : "wishlist-btn"}
          onClick={addToWishlist}
        >
          <Heart
            size={20}
            fill={wishlisted ? "red" : "none"}
            color={wishlisted ? "red" : "black"}
          />
        </button>

        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
        />
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>

        <div className="rating">
          <Star size={18} fill="#facc15" color="#facc15" />

          <span>{(product.rating || 0).toFixed(1)}</span>
        </div>

        <div className="price">₹{product.price}</div>

        <button
          className="cart-btn"
          onClick={(e) => {
            e.stopPropagation();

            addToCart();
          }}
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
