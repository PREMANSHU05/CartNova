import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-hot-toast";
import "../styles/EditProduct.css";

const EditProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const getProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);

      setProduct(data.product);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,

      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/${id}`, product);

      toast.success("Product Updated Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error("Update Failed");
    }
  };

  if (loading) {
    return <h2>Loading Product...</h2>;
  }

  return (
    <div className="edit-product-container">
      <h1>Edit Product</h1>

      <form className="edit-product-form" onSubmit={updateProduct}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
        />

        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock"
        />

        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
        />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
