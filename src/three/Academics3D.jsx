import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Sparkles } from '@react-three/drei';

function AcademicShapes() {
  const [hovered, setHovered] = useState(null);
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.8;
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. The Central Atomic Nucleus (Gold) */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1}>
        <mesh 
          onPointerOver={() => setHovered('atom')} 
          onPointerOut={() => setHovered(null)}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color={hovered === 'atom' ? '#dfc198' : '#c5a880'} 
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Orbit Rings */}
        <group ref={ringRef}>
          <mesh>
            <torusGeometry args={[1.9, 0.05, 8, 64]} />
            <meshStandardMaterial color="#2563eb" emissive="#2563eb" emissiveIntensity={0.8} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.2, 0.03, 8, 64]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.6} />
          </mesh>
        </group>
      </Float>

      {/* 2. Floating Science Cone */}
      <Float speed={1.8} floatIntensity={0.8} rotationIntensity={0.5}>
        <mesh 
          position={[-3.5, 1.5, -1]} 
          rotation={[Math.PI / 6, 0, Math.PI / 4]}
          onPointerOver={() => setHovered('cone')} 
          onPointerOut={() => setHovered(null)}
        >
          <coneGeometry args={[0.7, 1.6, 4]} />
          <meshPhysicalMaterial 
            color={hovered === 'cone' ? '#c5a880' : '#10b981'} 
            transmission={0.5}
            roughness={0.15}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>

      {/* 3. Floating Technology Cube */}
      <Float speed={3} floatIntensity={1.2} rotationIntensity={1}>
        <mesh 
          position={[3.5, -1.2, 0.5]} 
          rotation={[0, Math.PI / 3, Math.PI / 6]}
          onPointerOver={() => setHovered('cube')} 
          onPointerOut={() => setHovered(null)}
        >
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial 
            color={hovered === 'cube' ? '#2563eb' : '#081430'} 
            roughness={0.1}
            metalness={0.9}
            emissive={hovered === 'cube' ? '#2563eb' : '#040b1b'}
          />
        </mesh>
      </Float>

      {/* Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 3]} intensity={1.5} />
      <pointLight position={[-3, 3, 2]} color="#c5a880" intensity={1.2} />
      <pointLight position={[3, -3, 2]} color="#2563eb" intensity={1.2} />
    </group>
  );
}

export default function Academics3D() {
  const [webglError, setWebglError] = useState(false);

  if (webglError) {
    return <FallbackUI />;
  }

  return (
    <div className="w-full h-full relative min-h-[300px] bg-[#060814] rounded-2xl overflow-hidden">
      <Suspense fallback={<FallbackUI />}>
        <Canvas
          onError={() => setWebglError(true)}
          className="w-full h-full"
        >
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
          
          {/* Shimmering float dust */}
          <Sparkles count={40} scale={8} size={1.2} speed={0.5} color="#c5a880" opacity={0.8} />
          <Sparkles count={25} scale={6} size={1.5} speed={0.7} color="#2563eb" opacity={0.6} />

          <AcademicShapes />
        </Canvas>
      </Suspense>
    </div>
  );
}

function FallbackUI() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-900 border border-slate-800 rounded-2xl min-h-[300px] relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="h-16 w-16 rounded-full border-2 border-brand-gold/30 border-t-brand-gold animate-spin flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border border-dashed border-brand-royal/40"></div>
        </div>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
          Academic Dynamics Engine
        </span>
      </div>
    </div>
  );
}
