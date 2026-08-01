import { Link, useLocation } from "react-router-dom";
import "../styles/AuthRequired.css";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    const isAddingProduct = location.pathname === "/admin/add-product";

    return (
      <main className="auth-required" aria-labelledby="auth-required-title">
        <section className="auth-required-card">
          <h1 id="auth-required-title">
            {isAddingProduct ? "Sign in to add a product" : "Sign in required"}
          </h1>
          <p>
            {isAddingProduct
              ? "Please log in or create an account before adding a product."
              : "Please log in or create an account to continue."}
          </p>
          <div className="auth-required-actions">
            <Link className="auth-required-login" to="/login">
              Log in
            </Link>
            <Link className="auth-required-register" to="/register">
              Create account
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return children;
};

export default ProtectedRoute;
