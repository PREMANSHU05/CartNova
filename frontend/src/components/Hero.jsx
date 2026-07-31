import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-tag">🛒 Welcome to Cartify</span>

        <h1>
          Shop Smarter,
          <br />
          Live Better.
        </h1>

        <p>
          Discover premium electronics, fashion, home essentials, accessories
          and much more at unbeatable prices.
        </p>

        <button className="hero-btn" onClick={() => navigate("/products")}>
          Shop Now
          <ArrowRight size={20} />
        </button>

        <div className="hero-highlights" aria-label="Cartify benefits">
          <div>
            <strong>10k+</strong>
            <span>Happy shoppers</span>
          </div>
          <div>
            <strong>Fast</strong>
            <span>Secure checkout</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>Customer support</span>
          </div>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=900"
          alt="Shopping"
        />
      </div>
    </section>
  );
};

export default Hero;
