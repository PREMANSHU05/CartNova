import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, Minus, ShoppingCart, Heart, Star } from "lucide-react";

import { motion } from "framer-motion";

import API from "../api/axios";

import { toast } from "react-hot-toast";

import RelatedProducts from "../components/RelatedProducts";
import ReviewSection from "../components/ReviewSection";

import "../styles/ProductDetails.css";
import "../styles/Reviews.css";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const [selectedImage, setSelectedImage] = useState("");

  const getProduct = useCallback(async () => {
    try {
      const response = await API.get(`/products/${id}`);

      const currentProduct = response.data.product;

      setProduct(currentProduct);

      let recent = JSON.parse(localStorage.getItem("recentProducts")) || [];

      recent = recent.filter((item) => item._id !== currentProduct._id);

      recent.unshift(currentProduct);

      recent = recent.slice(0, 10);

      localStorage.setItem("recentProducts", JSON.stringify(recent));

      setSelectedImage(currentProduct.image || "https://placehold.co/500x500");

      const productsResponse = await API.get("/products");

      const related = productsResponse.data.products
        .filter(
          (item) =>
            item.category === currentProduct.category &&
            item._id !== currentProduct._id,
        )
        .slice(0, 4);

      setRelatedProducts(related);
    } catch (error) {
      console.log(error.response?.data || error.message);

      if (error.response?.status === 404) {
        let recent = JSON.parse(localStorage.getItem("recentProducts")) || [];

        recent = recent.filter((item) => item._id !== id);

        localStorage.setItem("recentProducts", JSON.stringify(recent));

        toast.error("This product no longer exists.");
      } else {
        toast.error("Unable to load product");
      }
    }
  }, [id]);

  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      await getProduct();
    };

    if (isMounted) {
      loadProduct();
    }

    return () => {
      isMounted = false;
    };
  }, [getProduct]);

  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token || token === "null" || token === "undefined") {
      localStorage.removeItem("token");
      toast.error("Please log in or sign up to add items to your cart.");
      window.location.assign("/login");
      return;
    }

    try {
      await API.post("/cart/add", {
        productId: product._id,

        quantity,
      });

      toast.success("Product added to cart 🛒");
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        toast.error("Please log in or sign up to add items to your cart.");
        window.location.assign("/login");
        return;
      }

      toast.error(error.response?.data?.message || "Unable to add this item to your cart.");
    }
  };

  const addToWishlist = async () => {
    try {
      const { data } = await API.post(`/wishlist/add/${product._id}`);

      if (!data.success) {
        return;
      }

      toast.success("Added to Wishlist ❤️");
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error(error.response?.data?.message || "Please login first");
    }
  };

  if (!product) {
    return <h2 className="loading">Loading Product...</h2>;
  }

  return (
    <>
      <div className="product-details">

        <motion.div
          className="product-image"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img className="main-image" src={selectedImage} alt={product.name} />

          <div className="thumbnail">
            <img
              src={product.image}
              alt="thumb"
              onClick={() => setSelectedImage(product.image)}
            />
          </div>
        </motion.div>


        <motion.div
          className="product-info"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button className="details-wishlist" onClick={addToWishlist}>
            <Heart size={25} />
          </button>

          <div className="rating-display">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={22}
                fill={
                  star <= Math.round(product.ratings || 0) ? "#facc15" : "none"
                }
                color="#facc15"
              />
            ))}

            <span>
              {(product.ratings || 0).toFixed(1)} / 5 ({product.numReviews || 0}{" "}
              reviews)
            </span>
          </div>

          <h1>{product.name}</h1>

          <h2 className="price">₹{product.price}</h2>

          <div className="average-rating">
            <Star size={18} fill="#facc15" color="#facc15" />
            <span>{(product.ratings || 0).toFixed(1)} / 5</span>
          </div>

          <p>{product.description}</p>

          <h4>Category: {product.category}</h4>

          <h4>{product.stock > 0 ? "🟢 In Stock" : "🔴 Out of Stock"}</h4>


          <div className="quantity-box">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              <Minus size={20} />
            </button>

            <span>{quantity}</span>

            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            >
              <Plus size={20} />
            </button>
          </div>

          <button
            className="add-cart-btn"
            onClick={addToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart size={20} />

            {product.stock > 0 ? "Add To Cart" : "Out Of Stock"}
          </button>
        </motion.div>
      </div>

      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}

      <ReviewSection productId={product._id} />
    </>
  );
};

export default ProductDetails;
