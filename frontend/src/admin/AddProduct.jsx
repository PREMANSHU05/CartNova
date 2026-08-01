import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import "../styles/AddProduct.css";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    status: "active",
  });

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      alert("Image must be 5 MB or smaller");
      e.target.value = "";
      return;
    }

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("stock", formData.stock);
      data.append("status", formData.status);

      if (image) {
        data.append("image", image);
      }

      await API.post("/products", data);

      alert("Product Added Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Unable to add product");
    }
  };

  return (
    <div className="add-product-container">
      <h1>Add New Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <input type="file" accept="image/*" onChange={handleImage} required />

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" width="180" />
          </div>
        )}

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
