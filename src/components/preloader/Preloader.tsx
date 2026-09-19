import React, { useEffect, useState } from 'react';
import { useSound } from '../../context/SoundContext';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'logo' | 'words' | 'exit'>('logo');
  const { playTransition } = useSound();

  useEffect(() => {
    // Fast, luxurious progress ramp
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 50 && phase === 'logo') {
      setPhase('words');
    }
    if (progress === 100) {
      setTimeout(() => {
        playTransition();
        setPhase('exit');
        setTimeout(onComplete, 800);
      }, 300);
    }
  }, [progress, phase, onComplete, playTransition]);

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-obsidian flex flex-col justify-between p-8 md:p-16 transition-all duration-800 ease-luxury ${
        phase === 'exit' ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100'
      }`}
    >
      {/* Top Bar / Location Index */}
      <div className="flex justify-between items-center text-xs tracking-widest text-titanium/80 uppercase font-mono">
        <span>PARIS • MILANO • TOKYO • NEW YORK</span>
        <span>EDITION 2026</span>
      </div>

      {/* Center Cinematic Stage */}
      <div className="flex flex-col items-center justify-center text-center my-auto">
        <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl tracking-[0.25em] text-ivory mb-6 select-none uppercase font-light">
          ATELIER ARSATH
        </h1>

        <div className="h-6 overflow-hidden">
          <p
            className={`text-xs md:text-sm tracking-[0.4em] uppercase text-champagne font-sans transition-all duration-500 transform ${
              phase === 'words' ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            CRAFT / FORM / MOTION
          </p>
        </div>
      </div>

      {/* Bottom Progress Counter & Metric */}
      <div className="flex justify-between items-end">
        <div className="w-32 md:w-64 h-[1px] bg-white/10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-champagne transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-right font-mono text-xs md:text-sm text-titanium tracking-widest">
          <span>{String(progress).padStart(3, '0')}</span>
          <span className="text-white/30 text-[10px] ml-1">%</span>
        </div>
      </div>
    </div>
  );
};
