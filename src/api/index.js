import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || "https://jobmartai-backend.onrender.com/api",
});


API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.message;
    if (
      msg === "Not authorized, token failed" ||
      msg === "jwt expired" ||
      err.response?.status === 401
    ) {
      localStorage.removeItem("user");
      window.location.href = "/login"; 
    }
    return Promise.reject(err);
  }
);

export default API;
