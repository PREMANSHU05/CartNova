import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-hot-toast";
import "../styles/Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/forgot-password", { email });
      toast.success(data.message || "Reset token generated");
      setSubmitted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to process request");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Forgot password?</h1>
        <p>Enter your email to receive a reset token.</p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send reset link</button>
          </form>
        ) : (
          <div>
            <p>Use the reset token from the response to continue.</p>
            <Link to="/login">Back to login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
