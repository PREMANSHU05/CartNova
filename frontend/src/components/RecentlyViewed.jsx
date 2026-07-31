import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "../styles/RecentlyViewed.css";

const RecentlyViewed = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem("recentProducts")) || [];
    setProducts(viewed);
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="recent-section">
      <h2>Recently Viewed</h2>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
