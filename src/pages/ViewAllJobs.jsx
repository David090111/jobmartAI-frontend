import React, { useEffect, useState } from "react";
import API from "../api/index";
import { Link } from "react-router-dom";

const ViewAllJobs = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const JOBS_PER_PAGE = 10;

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  // Fetch all jobs on mount
  useEffect(() => {
    const fetchInitialJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setAllJobs(res.data);
        setCurrentPage(1);
        setVisibleJobs(res.data.slice(0, JOBS_PER_PAGE));

        // Extract unique categories and locations
        setCategories([...new Set(res.data.map((j) => j.category))]);
        setLocations([...new Set(res.data.map((j) => j.location))]);
      } catch (error) {
        console.error("Failed to fetch initial jobs:", error);
      }
    };
    fetchInitialJobs();
  }, []);

  const handleSearch = async () => {
    try {
      const trimmedSearch = search.trim();
      const params = {
        search: trimmedSearch,
        category,
        location,
      };
      const res = await API.get("/jobs", { params });
      setAllJobs(res.data);
      setCurrentPage(1);
      setVisibleJobs(res.data.slice(0, JOBS_PER_PAGE));
    } catch (error) {
      console.error("Error fetching filtered jobs:", error);
    }
  };

  const handleViewMore = () => {
    const nextPage = currentPage + 1;
    const start = (nextPage - 1) * JOBS_PER_PAGE;
    const end = nextPage * JOBS_PER_PAGE;
    const moreJobs = allJobs.slice(start, end);
    setVisibleJobs((prev) => [...prev, ...moreJobs]);
    setCurrentPage(nextPage);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        💼 All Job Listings
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Search by title or company"
          className="p-2 border border-gray-300 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 border border-gray-300 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="p-2 border border-gray-300 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((loc, idx) => (
            <option key={idx} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 text-right">
        <button
          onClick={handleSearch}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded shadow-md transition"
        >
          🔍 Search
        </button>
      </div>

      {/* Job List */}
      {visibleJobs.length === 0 ? (
        <p className="text-gray-500 text-center">No matching jobs found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {visibleJobs.map((job) => (
            <div
              key={job._id}
              className="border p-4 rounded shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-indigo-700">
                {job.title}
              </h3>
              <p className="text-gray-600">
                {job.company} • {job.location}
              </p>
              <p className="text-gray-500">{job.category}</p>
              <p className="text-green-600 font-medium mt-1">
                ${job.salary.toLocaleString()}
              </p>
              <Link
                to={`/job/${job._id}`}
                className="inline-block mt-3 text-sm text-blue-600 hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* View More Button */}
      {visibleJobs.length < allJobs.length && (
        <div className="text-center mt-6">
          <button
            onClick={handleViewMore}
            className="bg-gray-100 hover:bg-gray-200 text-indigo-600 px-6 py-2 rounded shadow"
          >
            👀 View More
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewAllJobs;
