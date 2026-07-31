import React from "react";
import "../styles/ProductsSkeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>

      <div className="skeleton-line title"></div>

      <div className="skeleton-line price"></div>

      <div className="skeleton-button"></div>
    </div>
  );
};

export default ProductSkeleton;
