import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, User } from "lucide-react";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        <ShoppingCart className="brand-icon" aria-hidden="true" />
        <span>CartNova</span>
      </Link>


      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        {token && (
          <>
            <Link to="/cart" className="cart-link">
              <ShoppingCart size={20} />
              Cart
            </Link>

            <Link to="/wishlist">
              <Heart size={20} />
              Wishlist
            </Link>

            <Link to="/orders">Orders</Link>
          </>
        )}
      </div>


      <div className="nav-actions">
        {!token ? (
          <>
            <Link className="login-btn" to="/login">
              Login
            </Link>

            <Link className="signup-btn" to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <button
              className="profile-btn"
              onClick={() => navigate("/profile")}
            >
              <User size={18} />
              Profile
            </button>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
