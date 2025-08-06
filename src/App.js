// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import CreateProduct from "./pages/CreateProduct";
import MyProducts from "./pages/MyProducts";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import PostJob from "./pages/PostJob";
import { EditProduct } from "./pages/EditProduct";
import MyJobs from "./pages/MyJobs";
import EditJob from "./pages/EditJob";
import AIChatBox from "./pages/AIChatBox";
import ViewAllJobs from "./pages/ViewAllJobs";
import ViewAllProducts from "./pages/ViewAllProducts";
import ProductDetails from "./pages/DetailsOfProducts";
import JobDetail from "./pages/JobDetail";
import FindJob from "./components/FindJob";
import ExploreProducts from "./components/ExploreProducts";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/create-job" element={<PostJob />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/my-jobs" element={<MyJobs />} />
            <Route path="/edit-job/:id" element={<EditJob />} />
            <Route path="/ai" element={<AIChatBox />} />
            <Route path="/view-all-jobs" element={<ViewAllJobs />} />
            <Route path="/view-all-products" element={<ViewAllProducts />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/find-job" element={<FindJob />} />
            <Route path="/explore-products" element={<ExploreProducts />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
