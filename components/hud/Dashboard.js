'use client';

import React from 'react';
import { useStore } from '@/lib/store';
import { Volume2, VolumeX, Cpu, Radio, ShieldCheck } from 'lucide-react';

export default function Dashboard() {
  const { volume, setVolume, isMuted, toggleMute, systemStatus } = useStore();

  return (
    <div className="absolute inset-0 flex flex-col justify-between p-8 pointer-events-none select-none">
      
      {/* TOP BAR: System Stats */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="p-4 border-l-2 border-os-cyan bg-os-cyan/5 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-1">
            <Cpu size={14} className="text-os-cyan animate-pulse" />
            <span className="text-[10px] tracking-widest text-os-cyan/80 font-bold uppercase">System_Core</span>
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-white">M-OS // VAULT</h1>
          <p className="text-[9px] text-os-cyan/60 font-mono mt-1">STATUS: {systemStatus}</p>
        </div>

        <div className="text-right font-mono text-[10px] text-os-cyan/40 leading-tight uppercase">
          <p>Location: 35.5951° N, 82.5515° W</p>
          <p>Encryption: AES-256-GCM</p>
          <p>Buffer: 1024ms</p>
        </div>
      </div>

      {/* CENTER: Interaction Area (Empty for 3D Core visibility) */}
      <div className="flex-grow" />

      {/* BOTTOM BAR: Audio Controls */}
      <div className="flex justify-center items-end pointer-events-auto">
        <div className="w-full max-w-2xl p-6 border-t border-os-cyan/20 bg-black/40 backdrop-blur-xl rounded-t-3xl">
          <div className="flex items-center gap-6">
            
            {/* Mute Toggle */}
            <button 
              onClick={toggleMute}
              className={`p-3 rounded-full border transition-all duration-300 ${
                isMuted ? 'border-red-500 text-red-500' : 'border-os-cyan text-os-cyan hover:bg-os-cyan/20'
              }`}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            {/* Volume Slider Container */}
            <div className="flex-grow flex flex-col gap-2">
              <div className="flex justify-between text-[10px] font-mono text-os-cyan/80 uppercase">
                <span>Output_Gain</span>
                <span>{isMuted ? '0' : volume}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={volume} 
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-full h-1 bg-os-cyan/20 appearance-none cursor-pointer accent-os-cyan"
              />
            </div>

            {/* Decorative Status Icon */}
            <div className="hidden sm:flex items-center gap-3 pl-6 border-l border-os-cyan/20">
              <div className="flex flex-col items-end">
                <span className="text-[8px] text-os-cyan/50 uppercase">Network</span>
                <span className="text-[10px] text-os-cyan font-mono">ENCRYPTED</span>
              </div>
              <ShieldCheck size={24} className="text-os-cyan/80" />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
