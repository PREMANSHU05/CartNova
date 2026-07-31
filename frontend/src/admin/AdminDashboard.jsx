import React, { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/AdminDashboard.css";

import { Users, Package, ShoppingCart, IndianRupee } from "lucide-react";

import { toast } from "react-hot-toast";
import RevenueChart from "./RevenueChart";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  // Dummy Revenue Data (Day 18)
  const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 24000 },
    { month: "May", revenue: 28000 },
    { month: "Jun", revenue: 35000 },
  ];

  const getStats = async () => {
    try {
      const { data } = await API.get("/admin/stats");

      setStats({
        totalUsers: data.totalUsers,
        totalProducts: data.totalProducts,
        totalOrders: data.totalOrders,
        totalRevenue: data.totalRevenue,
      });
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Statistics Cards */}

      <div className="stats-grid">
        <div className="stat-card">
          <Users size={40} />

          <div>
            <h3>Total Users</h3>

            <p>{stats.totalUsers}</p>
          </div>
        </div>

        <div className="stat-card">
          <Package size={40} />

          <div>
            <h3>Total Products</h3>

            <p>{stats.totalProducts}</p>
          </div>
        </div>

        <div className="stat-card">
          <ShoppingCart size={40} />

          <div>
            <h3>Total Orders</h3>

            <p>{stats.totalOrders}</p>
          </div>
        </div>

        <div className="stat-card">
          <IndianRupee size={40} />

          <div>
            <h3>Total Revenue</h3>

            <p>₹{stats.totalRevenue}</p>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}

      <RevenueChart data={revenueData} />
    </div>
  );
};

export default AdminDashboard;
