'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/lib/store';

export default function AudioEngine() {
  const { volume, isMuted, setSystemStatus } = useStore();
  const audioContext = useRef(null);
  const gainNode = useRef(null);

  useEffect(() => {
    // Ensure we only run in the browser
    if (typeof window === 'undefined') return;

    const initAudio = () => {
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
        gainNode.current = audioContext.current.createGain();
        gainNode.current.connect(audioContext.current.destination);
        
        setSystemStatus('AUDIO_ENGINE_ACTIVE');
        console.log("OS_AUDIO: Initialized");
      }

      if (audioContext.current.state === 'suspended') {
        audioContext.current.resume();
      }
    };

    // Wake up audio on first user click or key press
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });

    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
  }, [setSystemStatus]);

  // Update volume when store changes
  useEffect(() => {
    if (gainNode.current && audioContext.current) {
      const targetVolume = isMuted ? 0 : volume / 100;
      // Linear ramp prevents "popping" or "clicking" sounds when changing volume
      gainNode.current.gain.setTargetAtTime(targetVolume, audioContext.current.currentTime, 0.05);
    }
  }, [volume, isMuted]);

  return null; // This component handles logic only, no visuals
}
