import React, { useEffect, useState } from "react";
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

  if (loading) {
    return (
      <section className="featured">
        <h2>Featured Products</h2>

        <div className="product-grid">
          {[1, 2, 3, 4].map((item) => (
            <ProductSkeleton key={item} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="featured">
      <h2>Featured Products</h2>

      <p>Explore our best selling products</p>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
