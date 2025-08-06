import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Images/logo.png";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

const ExploreProducts = () => {
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

      {/* Foreground content */}
      <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center text-white text-center px-6">
        <img
          src={logo}
          alt="Logo"
          className="w-[300px] h-auto mb-4  animate-bounce-slow"
        />

        <h1 className="text-6xl font-bold bg-gradient-to-r from-teal-300 via-green-400 to-blue-500 text-transparent bg-clip-text drop-shadow-xl">
          Explore Amazing Products
        </h1>

        <p className="mt-4 text-2xl max-w-xl text-gray-200">
          Discover and shop unique items posted by our trusted sellers.
        </p>

        <Link
          to="/view-all-products"
          className="mt-8 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-medium shadow-lg text-white text-lg hover:scale-105 transition-transform"
        >
          🛒 View All Products
        </Link>
      </div>
    </div>
  );
};

export default ExploreProducts;
