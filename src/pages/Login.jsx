import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/index";
import logo from "../assets/Images/logo.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", { email, password });

      if (res.data && res.data.user && res.data.token) {
        const { name, email, _id } = res.data.user;
        const token = res.data.token;

        // 💾 Lưu cả token vào localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({ name, email, id: _id, token })
        );

        console.log("Login successful:", res.data.user);
        navigate("/");
        window.location.reload();
      } else {
        setError("Login failed: invalid response from server.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.status === 403) {
        setError("Please verify your email. A new link has been sent.");
      } else {
        const message =
          err.response?.data?.message || "Invalid email or password";
        setError(message);
      }
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="JobMartAI Logo" className="h-16 w-auto" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-600">
          Login to <span className="text-yellow-500">JobMartAI</span>
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:scale-110 hover:bg-yellow-700 transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <div className="text-center mt-6 text-sm text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
