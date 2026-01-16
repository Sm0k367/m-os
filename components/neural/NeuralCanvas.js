'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import { useStore } from '@/lib/store';

function CentralCore() {
  const meshRef = useRef();
  const volume = useStore((state) => state.volume);
  
  // This makes the core pulse and rotate based on time and current volume
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
      
      // The volume scale makes the sphere grow slightly as the slider goes up
      const scale = 1.5 + (volume / 200);
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#00f2ff"
          emissive="#0066ff"
          emissiveIntensity={2}
          distort={0.4}
          speed={2}
          roughness={0}
          wireframe={true}
        />
      </Sphere>
    </Float>
  );
}

export default function NeuralCanvas() {
  return (
    <div className="fixed inset-0 z-0 bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00f2ff" intensity={2} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <CentralCore />
      </Canvas>
    </div>
  );
}
