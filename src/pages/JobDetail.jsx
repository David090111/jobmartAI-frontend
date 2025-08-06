
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/index";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Failed to fetch job:", err);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) return <p className="text-center mt-10">Loading job details...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">{job.title}</h2>
      <p className="text-gray-600 mb-1">
        <strong>Company:</strong> {job.company}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Location:</strong> {job.location}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Category:</strong> {job.category}
      </p>
      <p className="text-green-600 mb-3">
        <strong>Salary:</strong> ${job.salary}
      </p>
      <p className="text-gray-800 mb-4 whitespace-pre-line">
        <strong>Description:</strong> {job.description}
      </p>
      <p className="text-gray-800 mb-4 whitespace-pre-line">
        <strong>Email:</strong> {job.email}
      </p>
      {job.requirements && (
        <div className="mb-4">
          <strong className="text-gray-800">Requirements:</strong>
          <ul className="list-disc pl-5 text-gray-700">
            {job.requirements.split("\n").map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>
      )}
      <p className="text-sm text-gray-500">
        Posted by: {job.owner?.name}
      </p>
    </div>
  );
};

export default JobDetail;
