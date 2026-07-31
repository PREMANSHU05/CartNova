import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";
import "../styles/AdminProducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products/admin/products");

      setProducts(data.products);

      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search, category]);

  // Delete Product

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);

      fetchProducts();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // Change Product Status

  const changeStatus = async (id, status) => {
    try {
      await API.put(`/products/${id}`, {
        status,
      });

      fetchProducts();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="admin-products">
      <div className="products-header">
        <h1>Manage Products</h1>

        <button onClick={() => navigate("/admin/add-product")}>
          + Add Product
        </button>
      </div>

      {/* Search Filter */}

      <div className="product-controls">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);

            setPage(1);
          }}
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);

            setPage(1);
          }}
        >
          <option value="">All Categories</option>

          <option value="Electronics">Electronics</option>

          <option value="Fashion">Fashion</option>

          <option value="Shoes">Shoes</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Image</th>

            <th>Name</th>

            <th>Category</th>

            <th>Price</th>

            <th>Status</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img src={product.image} alt={product.name} />
              </td>

              <td>{product.name}</td>

              <td>{product.category}</td>

              <td>₹{product.price}</td>

              {/* Status */}

              <td>
                <select
                  value={product.status}
                  onChange={(e) => changeStatus(product._id, e.target.value)}
                >
                  <option value="active">Active</option>

                  <option value="inactive">Inactive</option>
                </select>
              </td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                >
                  <Edit size={18} />
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteProduct(product._id)}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
