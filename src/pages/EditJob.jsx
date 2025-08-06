import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/index";
import logo from "../assets/Images/logo.png";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    email: "",
    salary: "",
    requirements: "",
    category: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await API.get(`/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        const job = res.data;
        setForm({
          title: job.title,
          description: job.description,
          company: job.company,
          location: job.location,
          email: job.email,
          salary: job.salary,
          requirements: job.requirements,
          category: job.category,
        });
      } catch (err) {
        setError("Failed to load job details");
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await API.put(`/jobs/${id}`, form, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setMessage("Job updated successfully!");
      setTimeout(() => navigate("/my-jobs"), 1500);
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
          ✏️ Edit Job Post
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-600 text-center">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Job Title"
            required
            className="w-full border px-4 py-3 rounded-md"
          />
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
            required
            className="w-full border px-4 py-3 rounded-md"
          />
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full border px-4 py-3 rounded-md"
          />
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full border px-4 py-3 rounded-md"
          />
          <input
            type="text"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            placeholder="Salary"
            className="w-full border px-4 py-3 rounded-md"
          />
          <textarea
            name="requirements"
            value={form.requirements}
            onChange={handleChange}
            placeholder="Job Requirements"
            rows={3}
            className="w-full border px-4 py-3 rounded-md"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Job Description"
            rows={4}
            className="w-full border px-4 py-3 rounded-md"
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border px-4 py-3 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700"
          >
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
