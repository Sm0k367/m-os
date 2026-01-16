'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// We load these dynamically with ssr: false. 
// This tells Next.js: "Only load this on the user's computer, never on the server."
const NeuralCanvas = dynamic(() => import('@/components/neural/NeuralCanvas'), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black" /> 
});

const AudioEngine = dynamic(() => import('@/components/audio/AudioEngine'), { 
  ssr: false 
});

const Dashboard = dynamic(() => import('@/components/hud/Dashboard'), { 
  ssr: false 
});

export default function Home() {
  return (
    <main className="relative h-screen w-full bg-black overflow-hidden scanlines crt-flicker">
      {/* 1. The 3D World (Background) */}
      <NeuralCanvas />

      {/* 2. The Logic Engine (Invisible) */}
      <AudioEngine />

      {/* 3. The User Interface (Foreground) */}
      <Dashboard />

      {/* 4. Global Overlay FX */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern bg-[size:40px_40px] z-0 opacity-20" />
      
      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10" />
    </main>
  );
}
