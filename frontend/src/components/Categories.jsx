import React from "react";
import { Laptop, Shirt, House, Gamepad2, BookOpen, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/Categories.css";

const categories = [
  { name: "Electronics", icon: <Laptop size={38} /> },
  { name: "Fashion", icon: <Shirt size={38} /> },
  { name: "Home", filter: "Furniture", icon: <House size={38} /> },
  { name: "Gaming", filter: "Electronics", icon: <Gamepad2 size={38} /> },
  { name: "Books", icon: <BookOpen size={38} /> },
  { name: "Beauty", filter: "Accessories", icon: <Heart size={38} /> },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="categories">
      <h2>Shop by Category</h2>
      <p>Find products from your favourite categories.</p>

      <div className="category-grid">
        {categories.map((item) => (
          <button
            className="category-card"
            key={item.name}
            type="button"
            onClick={() => navigate(`/products?category=${item.filter || item.name}`)}
          >
            <div className="category-icon">{item.icon}</div>
            <h3>{item.name}</h3>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
