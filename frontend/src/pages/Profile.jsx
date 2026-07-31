import React, { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/Profile.css";

import { User, Mail, Shield, Calendar, Upload } from "lucide-react";

import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const getProfile = async () => {
    try {
      const { data } = await API.get("/users/profile");

      setUser(data.user);
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // Upload Profile Image

  const uploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("image", file);

    try {
      await API.put("/users/profile-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile image uploaded");

      getProfile();
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error("Image upload failed");
    }
  };

  if (loading) {
    return <div className="profile-loading">Loading Profile...</div>;
  }

  if (!user) {
    return <div className="profile-loading">User not found</div>;
  }

  return (
    <div className="profile-container">
      <motion.div
        className="profile-card"
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <div className="profile-avatar">
          {user.profileImage ? (
            <img src={user.profileImage} alt="profile" />
          ) : (
            user.name.charAt(0).toUpperCase()
          )}
        </div>

        <h1>{user.name}</h1>

        {/* Upload Image */}

        <label className="upload-btn">
          <Upload size={18} />
          Upload Image
          <input type="file" accept="image/*" onChange={uploadImage} hidden />
        </label>

        <div className="profile-info">
          <p>
            <User size={20} />
            Name:
            <span>{user.name}</span>
          </p>

          <p>
            <Mail size={20} />
            Email:
            <span>{user.email}</span>
          </p>

          <p>
            <Shield size={20} />
            Role:
            <span>{user.role}</span>
          </p>

          <p>
            <Calendar size={20} />
            Joined:
            <span>{new Date(user.createdAt).toLocaleDateString("en-IN")}</span>
          </p>
        </div>

        <button
          className="edit-profile-btn"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </button>
      </motion.div>
    </div>
  );
};

export default Profile;
