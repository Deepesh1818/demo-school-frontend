import React, { Suspense, useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

function ParticleGrid() {
  const pointsRef = useRef();
  const count = 40; // 40x40 grid of particles

  // Memoize grid geometry calculations
  const [positions, step] = useMemo(() => {
    const pos = [];
    const stepVal = 0.55;
    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        // Center the grid around origin
        const px = (x - count / 2) * stepVal;
        const pz = (z - count / 2) * stepVal;
        pos.push(px, 0, pz);
      }
    }
    return [new Float32Array(pos), stepVal];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const array = pointsRef.current.geometry.attributes.position.array;
    
    // Track pointer offsets for dynamic 3D cursor waves
    const mx = state.pointer.x * 2.5;
    const my = state.pointer.y * 2.5;

    let index = 0;
    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        const px = array[index];
        const pz = array[index + 2];

        // 3D Wave formulas using sine, distance, and mouse perturbations
        const distanceToCenter = Math.sqrt(px * px + pz * pz);
        const wave = Math.sin(distanceToCenter * 0.4 - time * 1.5) * 0.45;
        const mouseRipple = Math.cos((px - mx) * 0.5 + (pz - my) * 0.5) * 0.25;

        // Update Y height
        array[index + 1] = wave + mouseRipple;
        index += 3;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Smooth rotate camera slightly
    state.camera.position.x = Math.sin(time * 0.05) * 11 + mx * 0.4;
    state.camera.position.z = Math.cos(time * 0.05) * 11 + my * 0.4;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c5a880"
        size={0.065}
        sizeAttenuation={true}
        transparent
        opacity={0.7}
      />
    </points>
  );
}

export default function CampusHero3D() {
  const [webglError, setWebglError] = useState(false);

  if (webglError) {
    return <FallbackUI />;
  }

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-[#070b18] to-[#03040a] rounded-2xl overflow-hidden">
      {/* Space glow overlays */}
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none"></div>

      <Suspense fallback={<FallbackUI />}>
        <Canvas
          gl={{ antialias: true, alpha: true }}
          onError={() => setWebglError(true)}
          className="w-full h-full"
        >
          <perspectiveCamera makeDefault position={[0, 7, 12]} fov={45} />
          <ambientLight intensity={0.8} />

          {/* Floating stardust overlays */}
          <Sparkles count={40} scale={12} size={1} speed={0.4} color="#c5a880" opacity={0.6} />
          <Sparkles count={20} scale={10} size={1.2} speed={0.5} color="#2563eb" opacity={0.4} />

          <ParticleGrid />
        </Canvas>
      </Suspense>
    </div>
  );
}

function FallbackUI() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#070b18] to-[#03040a] relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="h-10 w-10 rounded-full border-2 border-brand-gold/30 border-t-brand-gold animate-spin"></div>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold font-display">
          Loading 3D Wave Dynamics...
        </span>
      </div>
    </div>
  );
}
