import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const SpinningSphere = ({ position = [0, 0, 0] }) => {
  const meshRef = useRef();
  const [color] = useState(new THREE.Color("#00ffff"));
  let hue = useRef(0);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x += 0.002;

      hue.current += delta * 0.1;
      const newColor = new THREE.Color(
        `hsl(${(hue.current * 60) % 360}, 45%, 45%)`
      );
      meshRef.current.material.emissive = newColor;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        color="#111"
        emissive={color}
        emissiveIntensity={1.5}
        roughness={0.2}
        metalness={0.6}
      />
    </mesh>
  );
};

const TextBlock = () => (
  <Html transform={false} zIndexRange={[0, 0]}>
    <div className="absolute top-1/2 left-2/3 -translate-y-1/2 -translate-x-1/2 max-w-md text-left px-4 z-10">
      <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#eb6163] via-yellow-500 to-green-500 bg-clip-text text-transparent drop-shadow-md mb-4">
        🚀 Find Jobs Easily – Shop Conveniently
      </h1>
      <p className="text-lg md:text-2xl font-bold text-white mb-8 drop-shadow-md">
        Discover tailored career opportunities and unique products with AI
        support
      </p>
      <div className="flex gap-4 flex-wrap">
        <a
          href="/find-job"
          className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          👉 Find a Job Now
        </a>
        <a
          href="/explore-products"
          className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-600 hover:to-teal-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          🛒 Explore Products
        </a>
      </div>
    </div>
  </Html>
);


const GlowSphere = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8] }} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Stars radius={100} depth={50} count={2000} factor={4} fade speed={2} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />

      <SpinningSphere position={[-3, 0, 0]} />
      <TextBlock position={[2.5, 0, 0]} />

      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.1}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default GlowSphere;
