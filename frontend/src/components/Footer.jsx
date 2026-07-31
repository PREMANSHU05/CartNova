import React from "react";
import { Mail, Phone } from "lucide-react";

import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}

        <div className="footer-section">
          <h2>🛒 CartNova</h2>

          <p>
            Shop smarter with premium products, amazing deals and a seamless
            shopping experience.
          </p>

          <div className="social-icons">
            <span>📸</span>

            <span>📘</span>

            <span>🐦</span>
          </div>
        </div>

        {/* Quick Links */}

        <div className="footer-section">
          <h3>Quick Links</h3>

          <a href="/">Home</a>

          <a href="/products">Products</a>

          <a href="/cart">Cart</a>

          <a href="/orders">Orders</a>
        </div>

        {/* Support */}

        <div className="footer-section">
          <h3>Customer Support</h3>

          <p>
            <Mail size={18} />
            support@cartify.com
          </p>

          <p>
            <Phone size={18} />
            +91 99999 99999
          </p>
        </div>
      </div>

      <div className="footer-bottom">© 2026 Cartify. All Rights Reserved.</div>
    </footer>
  );
};

export default Footer;
