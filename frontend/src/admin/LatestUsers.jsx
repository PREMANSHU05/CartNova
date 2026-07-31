import React, { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/LatestUsers.css";

const LatestUsers = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const { data } = await API.get("/admin/latest-users");

      setUsers(data.users);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="latest-users">
      <h2>Latest Users</h2>

      <div className="users-table">
        <div className="users-header">
          <span>Name</span>

          <span>Email</span>

          <span>Role</span>

          <span>Joined</span>
        </div>

        {users.map((user) => (
          <div className="user-row" key={user._id}>
            <span>{user.name}</span>

            <span>{user.email}</span>

            <span>{user.role}</span>

            <span>{new Date(user.createdAt).toLocaleDateString("en-IN")}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestUsers;
