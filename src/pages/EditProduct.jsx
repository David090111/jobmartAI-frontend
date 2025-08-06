import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/index";
import logo from "../assets/Images/logo.png";


export const EditProduct = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    email: "",
    phone: "",
    address: "",
  });
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch current product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await API.get(`/products/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        const { name, description, price, phone, email, address, image } = res.data;
        setForm({ name, description, price, phone, email, address });
        setExistingImage(image);
      } catch (err) {
        setError("Failed to load product");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = new FormData();
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("phone", form.phone);
      data.append("address", form.address);
      data.append("email", form.email);
      

      if (image) {
        data.append("image", image);
      }

      await API.put(`/products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Product updated successfully!");
      setTimeout(() => navigate("/my-products"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-lg p-8 rounded-2xl border border-gray-200">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-16 w-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">
          Edit Product
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        {message && (
          <p className="text-green-600 text-sm mb-4 text-center">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={4}
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            required
          />

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-4 file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 file:border-none"
          />
          {existingImage && !image && (
            <img
              src={existingImage}
              alt="Existing"
              className="w-full h-40 object-cover rounded-lg border"
            />
          )}
          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-orange-700 transition"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};


