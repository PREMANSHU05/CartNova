import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import API from "../api/axios";
import "../styles/FeaturedProducts.css";
import ProductSkeleton from "./ProductSkeleton";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data.products);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="featured">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Popular right now</span>
          <h2>Featured Products</h2>
          <p>Explore customer favourites, selected just for you.</p>
        </div>
        <Link to="/products" className="view-all-link">
          View all <ArrowRight size={17} />
        </Link>
      </div>

      <div className="product-grid">
        {loading
          ? [1, 2, 3, 4].map((item) => <ProductSkeleton key={item} />)
          : products.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </section>
  );
};

export default FeaturedProducts;
