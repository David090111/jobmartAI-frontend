import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/index";

const VerifyEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        console.log("Start verifying:", token);
        const res = await API.get(`/auth/verify-email/${token}`);
        console.log("Verification success:", res.data);

        localStorage.setItem("user", JSON.stringify(res.data.user));
        setMessage("Email verified! Redirecting...");

        setTimeout(() => navigate("/"), 3000);
      } catch (err) {
        console.error(
          "Verification failed:",
          err.response?.data || err.message
        );
        setMessage("Go back to the login page and enter your email and password to login.");
      }
    };

    if (token) {
      verify();
    } else {
      setMessage("Missing token in URL.");
    }
  }, [token, navigate]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow text-center max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Verify Email</h2>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
