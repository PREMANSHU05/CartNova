import React from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  PlusCircle,
} from "lucide-react";

import "../styles/AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <h2 className="logo">Cartify</h2>

      <nav>
        <NavLink to="/admin">
          <LayoutDashboard />
          Dashboard
        </NavLink>

        <NavLink to="/admin/products">
          <Package />
          Products
        </NavLink>

        <NavLink to="/admin/add-product">
          <PlusCircle />
          Add Product
        </NavLink>

        <NavLink to="/admin/orders">
          <ShoppingCart />
          Orders
        </NavLink>

        <NavLink to="/admin/users">
          <Users />
          Users
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
