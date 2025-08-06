import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/index";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  const fetchMyJobs = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await API.get("/jobs/my-jobs", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load job posts");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this job?")) return;
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await API.delete(`/jobs/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete job");
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        💼 My Job Posts
      </h2>

      {error && (
        <p className="text-red-500 text-center text-sm mb-4">{error}</p>
      )}

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven't posted any jobs yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-gray-800">
                {job.title}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                {job.company} — {job.location}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                {job.email} 
              </p>
              <p className="text-gray-600 text-sm">
                {job.description?.slice(0, 100)}...
              </p>
              <p className="text-blue-600 font-medium mt-2">
                💰 {job.salary?.toLocaleString()} USD
              </p>
              <div className="flex justify-between items-center mt-4 text-sm">
                <Link
                  to={`/edit-job/${job._id}`}
                  className="text-blue-600 hover:underline"
                >
                  ✏️ Edit
                </Link>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="text-red-500 hover:underline"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
