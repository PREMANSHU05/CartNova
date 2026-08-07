import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecentOrders from "../admin/RecentOrders";
import RevenueChart from "../admin/RevenueChart";
import LatestUsers from "../admin/LatestUsers";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Package,
  Users,
  ShoppingCart,
  IndianRupee,
  PlusCircle,
  ClipboardList,
  Boxes,
  UserCog,
} from "lucide-react";

import API from "../api/axios";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    monthlySales: [],
    categorySales: [],
    lowStock: [],
    topProducts: [],
  });

  const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  const getStats = async () => {
    try {
      const { data } = await API.get("/analytics/dashboard");

      setStats({
        totalProducts: data.totalProducts,
        totalUsers: data.totalUsers,
        totalOrders: data.totalOrders,
        totalRevenue: data.totalRevenue,
        monthlySales: data.monthlySales || [],
        categorySales: data.categorySales || [],
        lowStock: data.lowStock || [],
        topProducts: data.topProducts || [],
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div className="admin-container">
      <h1 className="admin-title">Cartify Admin Dashboard</h1>


      <div className="stats-grid">
        <div className="stat-card">
          <Package size={40} />

          <h2>Products</h2>

          <p>{stats.totalProducts}</p>
        </div>

        <div className="stat-card">
          <Users size={40} />

          <h2>Users</h2>

          <p>{stats.totalUsers}</p>
        </div>

        <div className="stat-card">
          <ShoppingCart size={40} />

          <h2>Orders</h2>

          <p>{stats.totalOrders}</p>
        </div>

        <div className="stat-card">
          <IndianRupee size={40} />

          <h2>Revenue</h2>

          <p>₹{stats.totalRevenue.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="chart-box">
          <h2>Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.monthlySales}>
              <XAxis dataKey="_id" />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h2>Category Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.categorySales}
                dataKey="count"
                nameKey="_id"
                label
              >
                {stats.categorySales.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="tables-grid">
        <div className="table-box">
          <h2>Low Stock</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {stats.lowStock.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-box">
          <h2>Top Selling</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Sold</th>
              </tr>
            </thead>
            <tbody>
              {stats.topProducts.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.sold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RevenueChart data={[]} />
      <RecentOrders />
      <LatestUsers />

      <h2 className="quick-title">Quick Actions</h2>

      <div className="action-grid">
        <button
          className="action-btn"
          onClick={() => navigate("/admin/add-product")}
        >
          <PlusCircle />
          Add Product
        </button>

        <button
          className="action-btn"
          onClick={() => navigate("/admin/products")}
        >
          <ClipboardList />
          Manage Products
        </button>

        <button
          className="action-btn"
          onClick={() => navigate("/admin/orders")}
        >
          <Boxes />
          Manage Orders
        </button>

        <button className="action-btn" onClick={() => navigate("/admin/users")}>
          <UserCog />
          Manage Users
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
