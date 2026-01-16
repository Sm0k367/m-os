import { create } from 'zustand';

export const useStore = create((set) => ({
  // Audio State
  volume: 80,
  isMuted: false,
  isPlaying: false,
  
  // System State
  isBooted: false,
  systemStatus: 'STANDBY',
  
  // Actions
  setVolume: (val) => set({ volume: val }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setIsPlaying: (val) => set({ isPlaying: val }),
  
  setBooted: (val) => set({ isBooted: val }),
  setSystemStatus: (status) => set({ systemStatus: status }),
}));
