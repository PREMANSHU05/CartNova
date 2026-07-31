import React from "react";
import { Laptop, Shirt, House, Gamepad2, BookOpen, Heart } from "lucide-react";

import "../styles/Categories.css";

const categories = [
  {
    name: "Electronics",
    icon: <Laptop size={45} />,
  },
  {
    name: "Fashion",
    icon: <Shirt size={45} />,
  },
  {
    name: "Home",
    icon: <House size={45} />,
  },
  {
    name: "Gaming",
    icon: <Gamepad2 size={45} />,
  },
  {
    name: "Books",
    icon: <BookOpen size={45} />,
  },
  {
    name: "Beauty",
    icon: <Heart size={45} />,
  },
];

const Categories = () => {
  return (
    <section className="categories">
      <h2>Shop by Category</h2>

      <p>Find products from your favourite categories.</p>

      <div className="category-grid">
        {categories.map((item, index) => (
          <div className="category-card" key={index}>
            <div className="category-icon">{item.icon}</div>

            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
