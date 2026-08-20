import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles } from '@react-three/drei';

function Trophy() {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={[0, -0.6, 0]}>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.9, 1.1, 0.45, 16]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Stem */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.9, 16]} />
        <meshStandardMaterial color="#c5a880" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Bowl */}
      <mesh 
        position={[0, 1.6, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[1.05, 0.4, 1.3, 16]} />
        <meshStandardMaterial 
          color={hovered ? '#e2d4c0' : '#c5a880'} 
          roughness={0.05} 
          metalness={0.95} 
        />
      </mesh>

      {/* Handles */}
      <mesh position={[-0.85, 1.8, 0]} rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[0.42, 0.08, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#c5a880" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.85, 1.8, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <torusGeometry args={[0.42, 0.08, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#c5a880" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Internal Core light */}
      <pointLight position={[0, 1.6, 0]} color="#c5a880" intensity={1} />
    </group>
  );
}

export default function Achievements3D() {
  const [webglError, setWebglError] = useState(false);

  if (webglError) {
    return <FallbackUI />;
  }

  return (
    <div className="w-full h-full min-h-[250px] relative bg-[#060814] rounded-2xl overflow-hidden">
      <Suspense fallback={<FallbackUI />}>
        <Canvas
          onError={() => setWebglError(true)}
          className="w-full h-full"
        >
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 5, 2]} intensity={1.8} />
          
          {/* Gold Sparkles */}
          <Sparkles count={30} scale={5} size={1.5} speed={0.8} color="#c5a880" opacity={0.9} />
          
          <Float speed={4} floatIntensity={1} rotationIntensity={0.5}>
            <Trophy />
          </Float>
        </Canvas>
      </Suspense>
    </div>
  );
}

function FallbackUI() {
  return (
    <div className="w-full h-full flex items-center justify-center min-h-[250px] bg-slate-900 border border-slate-800 rounded-xl">
      <div className="text-center">
        <div className="text-4xl animate-bounce mb-2">🏆</div>
        <span className="text-[10px] text-brand-gold uppercase tracking-widest font-semibold">
          Hall of Laurels
        </span>
      </div>
    </div>
  );
}
