
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

const Hero3DBackground = () => {
  return (
    <Canvas
      className="absolute top-0 left-0 w-full h-full"
      camera={{ position: [0, 0, 1] }}
      gl={{ alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <Stars radius={100} depth={50} count={2000} factor={4} fade speed={2} />
    </Canvas>
  );
};

export default Hero3DBackground;
