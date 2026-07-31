import React from "react";
import ProductCard from "./ProductCard";
import "../styles/RelatedProducts.css";

const RelatedProducts = ({ products }) => {
  return (
    <section className="related">
      <h2>Related Products</h2>

      <div className="related-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
