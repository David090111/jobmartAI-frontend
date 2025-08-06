
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Images/logo.png";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

const FindJob = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* 3D Background */}
      <Canvas className="absolute top-0 left-0 z-0">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars
          radius={100}
          depth={50}
          count={10000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>

      {/* Content */}
      <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center text-white text-center px-6">
        <img
          src={logo}
          alt="Logo"
          className="w-[300px] h-auto mb-4  animate-bounce-slow"
        />

        <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-600 text-transparent bg-clip-text slow-pulse drop-shadow">
          Find Your Dream Job
        </h1>

        <p className="mt-4 text-2xl max-w-2xl text-gray-200">
          Browse thousands of job listings tailored to your career goals.
        </p>

        <Link
          to="/view-all-jobs"
          className="mt-8 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-medium shadow-lg text-white text-lg hover:scale-105 transition-transform"
        >
          💼 View All Jobs
        </Link>
      </div>
    </div>
  );
};

export default FindJob;
