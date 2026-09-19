import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playClick: () => void;
  playHover: () => void;
  playTransition: () => void;
  playSuccess: () => void;
  playSliderTick: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    const saved = localStorage.getItem('atelier_sound_muted');
    return saved !== null ? saved === 'true' : false; // subtle audio enabled by default for luxury experience
  });

  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  // Initialize Web Audio API on first user interaction
  useEffect(() => {
    const initAudio = () => {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          setAudioCtx(ctx);
        }
      }
    };

    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('touchstart', initAudio, { once: true });
    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('touchstart', initAudio);
    };
  }, [audioCtx]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      localStorage.setItem('atelier_sound_muted', String(next));
      return next;
    });
  }, []);

  // Tactile micro-click sound (ultra-short damped sine wave)
  const playClick = useCallback(() => {
    if (isMuted || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch {
      // Audio context graceful fallback
    }
  }, [isMuted, audioCtx]);

  // Soft hover harmonic tick
  const playHover = useCallback(() => {
    if (isMuted || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.03);
      
      gain.gain.setValueAtTime(0.025, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.03);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.035);
    } catch {
      // Graceful fallback
    }
  }, [isMuted, audioCtx]);

  // Gentle slider notch tick
  const playSliderTick = useCallback(() => {
    if (isMuted || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, audioCtx.currentTime);
      
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.015);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.02);
    } catch {
      // Fallback
    }
  }, [isMuted, audioCtx]);

  // Warm luxury sweep transition
  const playTransition = useCallback(() => {
    if (isMuted || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      const gain = audioCtx.createGain();
      
      osc.type = 'sawtooth';
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.2);
      filter.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.4);
      
      gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.45);
    } catch {
      // Fallback
    }
  }, [isMuted, audioCtx]);

  // Resonant deep chord for adding to bag or completing outfit
  const playSuccess = useCallback(() => {
    if (isMuted || !audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const freqs = [220, 277.18, 329.63, 440]; // A major 7th resonant chord
      freqs.forEach((f, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, audioCtx.currentTime + idx * 0.04);
        
        gain.gain.setValueAtTime(0.04 / freqs.length, audioCtx.currentTime + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.7);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(audioCtx.currentTime + idx * 0.04);
        osc.stop(audioCtx.currentTime + 0.75);
      });
    } catch {
      // Fallback
    }
  }, [isMuted, audioCtx]);

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute,
        playClick,
        playHover,
        playTransition,
        playSuccess,
        playSliderTick,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
