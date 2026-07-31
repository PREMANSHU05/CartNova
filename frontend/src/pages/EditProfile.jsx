import React, { useState } from "react";

import API from "../api/axios";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import "../styles/EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      await API.put("/users/profile", formData);

      toast.success("Profile updated");

      navigate("/profile");
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error("Update failed");
    }
  };

  return (
    <div className="edit-profile-container">
      <form className="edit-profile-card" onSubmit={updateProfile}>
        <h1>Edit Profile</h1>

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <button>Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
