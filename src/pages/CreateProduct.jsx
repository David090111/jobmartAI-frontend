import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/index";
import logo from "../assets/Images/logo.png";

const CreateProduct = () => {
  const [form, setForm] = useState({ name: "", description: "", price: "", phone: "", address: "", email: "" });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
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

      const user = JSON.parse(localStorage.getItem("user"));

      await API.post("/products", data, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/my-products");
    } catch (err) {
      console.error(err);
      setError(
        "Create failed: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white shadow-lg p-8 rounded-2xl border border-gray-200">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="JobMartAI Logo" className="h-16 w-auto" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">
          Create New Product
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            rows={4}
            required
          />

          {/* Price */}
          <input
            type="text"
            name="price"
            placeholder="Price ($)"
            value={form.price}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            required
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

          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm cursor-pointer bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 transition"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Submit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
