import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/index";
import logo from "../assets/Images/logo.png";

const PostJob = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    email: "",
    requirements: "",
    category: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setError("");
   setMessage(" Job posted successfully!");
   const user = JSON.parse(localStorage.getItem("user"));
   if (!user || !user.token) {
     setError("You must be logged in to post a job.");
     return;
   }

   try {
     await API.post("/jobs", form, {
       headers: {
         Authorization: `Bearer ${user.token}`,
       },
     });
     setMessage("Job posted successfully!");
     setTimeout(() => navigate("/my-jobs"), 1500);
   } catch (err) {
     console.error(err);
     setError(err.response?.data?.message || "Failed to post job.");
   }
 };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-lg p-8 rounded-2xl border border-gray-200">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="JobMartAI Logo" className="h-16 w-auto" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">
          Post a New Job
        </h2>

        {message && (
          <p className="text-green-600 text-sm mb-4 text-center">{message}</p>
        )}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* Company */}
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={form.company}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            name="email"
            placeholder="Email to contact"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* Salary */}
          <input
            type="text"
            name="salary"
            placeholder="Salary ($)"
            value={form.salary}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* Requirements */}
          <textarea
            name="requirements"
            placeholder="Requirements"
            value={form.requirements}
            onChange={handleChange}
            rows={3}
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Job Description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* Category */}
          <input
            type="text"
            name="category"
            placeholder="Category (e.g., IT, Marketing)"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            Submit Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
