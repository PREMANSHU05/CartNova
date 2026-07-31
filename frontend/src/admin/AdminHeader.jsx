import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../styles/AdminHeader.css";

const AdminHeader = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="admin-header">
      <h2>Admin Panel</h2>

      <button onClick={logout}>
        <LogOut size={18} />
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;
