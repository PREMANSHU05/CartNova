import React, { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/AdminUsers.css";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [updating, setUpdating] = useState(null);

  const getUsers = async () => {
    try {
      const { data } = await API.get("/admin/users");

      setUsers(data.users);
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/admin/users/${id}`);

      setUsers(users.filter((user) => user._id !== id));

      toast.success("User deleted successfully");
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error("Delete failed");
    }
  };

  const changeRole = async (id, role) => {
    try {
      setUpdating(id);

      await API.put(`/admin/users/${id}/role`, {
        role,
      });

      setUsers(
        users.map((user) => (user._id === id ? { ...user, role } : user)),
      );

      toast.success("Role updated successfully");
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error("Role update failed");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="admin-users-container">
        <h2>Loading Users...</h2>
      </div>
    );
  }

  return (
    <div className="admin-users-container">
      <h1>Manage Users</h1>

      <div className="users-table">
        <div className="users-header">
          <span>Name</span>

          <span>Email</span>

          <span>Role</span>

          <span>Action</span>
        </div>

        {users.length === 0 ? (
          <h3 className="no-users">No Users Found</h3>
        ) : (
          users.map((user) => (
            <div className="users-row" key={user._id}>
              <span>{user.name}</span>

              <span>{user.email}</span>

              <select
                value={user.role}
                disabled={updating === user._id}
                onChange={(e) => changeRole(user._id, e.target.value)}
              >
                <option value="user">User</option>

                <option value="admin">Admin</option>
              </select>

              <button
                className="delete-user"
                onClick={() => deleteUser(user._id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
