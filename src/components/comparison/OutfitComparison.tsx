import React, { useState, useRef, useCallback } from 'react';
import { useSound } from '../../context/SoundContext';
import { Sparkles, ArrowLeftRight } from 'lucide-react';

export const OutfitComparison: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { playSliderTick, playHover } = useSound();

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
      playSliderTick();
    },
    [playSliderTick]
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <section id="comparison" className="relative w-full py-28 px-6 sm:px-12 md:px-16 bg-noir border-t border-white/10 select-none overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-[0.3em] text-champagne uppercase mb-3">
          <Sparkles size={14} />
          <span>THE TRANSFORMATION MATRIX</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory tracking-tight uppercase max-w-4xl mx-auto">
          FROM CONVENTIONAL TO SOVEREIGN
        </h2>
        <p className="font-sans text-xs sm:text-sm text-titanium mt-4 max-w-xl mx-auto font-light leading-relaxed">
          Drag the architectural divider to observe the dramatic shift in poise, fabric drape, and shoulder geometry achieved through bespoke silhouette construction.
        </p>
      </div>

      {/* Comparison Container */}
      <div className="max-w-5xl mx-auto">
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          data-cursor="DRAG SLIDER"
          className="relative w-full aspect-[4/5] sm:aspect-[16/10] overflow-hidden bg-charcoal border border-white/10 cursor-ew-resize shadow-2xl"
        >
          {/* RIGHT / "AFTER" (Atelier Arsath Architectural Look) */}
          <div className="absolute inset-0 w-full h-full bg-obsidian">
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop"
              alt="After - Atelier Arsath Tailoring"
              className="w-full h-full object-cover object-center filter contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-black/20" />

            {/* "AFTER" Editorial Label */}
            <div className="absolute top-8 right-8 z-10 text-right">
              <span className="text-[10px] font-mono tracking-[0.3em] text-champagne uppercase block">
                TRANSFORMATION
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl text-ivory uppercase tracking-wider font-semibold">
                AFTER
              </h4>
              <p className="font-mono text-[11px] text-titanium uppercase mt-1">
                ATELIER ARSATH ARCHITECTURAL CUT
              </p>
              <div className="mt-4 flex flex-col items-end space-y-1 text-[10px] font-mono text-champagne/90">
                <span>+ SUPER 160S WORSTED WOOL</span>
                <span>+ ROPED PAGODA SHOULDERS</span>
                <span>+ INVERTED PLEAT DRAPE</span>
              </div>
            </div>
          </div>

          {/* LEFT / "BEFORE" (Standard Basic Look) with clip-path */}
          <div
            className="absolute inset-0 w-full h-full bg-charcoal overflow-hidden will-change-[clip-path]"
            style={{
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1600&auto=format&fit=crop"
              alt="Before - Generic Casual Outfit"
              className="w-full h-full object-cover object-center filter grayscale-[40%] brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* "BEFORE" Editorial Label */}
            <div className="absolute top-8 left-8 z-10 text-left">
              <span className="text-[10px] font-mono tracking-[0.3em] text-titanium/80 uppercase block">
                BASELINE
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl text-titanium uppercase tracking-wider font-semibold">
                BEFORE
              </h4>
              <p className="font-mono text-[11px] text-titanium/60 uppercase mt-1">
                GENERIC UNSTRUCTURED WEAR
              </p>
              <div className="mt-4 flex flex-col items-start space-y-1 text-[10px] font-mono text-titanium/70">
                <span>- SLOPED DROPPED SHOULDERS</span>
                <span>- SYNTHETIC BLEND FABRIC</span>
                <span>- LACKS TAILORED WAIST</span>
              </div>
            </div>
          </div>

          {/* Draggable Divider Handle Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-champagne z-20 pointer-events-none transition-shadow"
            style={{
              left: `${sliderPosition}%`,
              boxShadow: '0 0 15px rgba(197, 168, 128, 0.6)',
            }}
          >
            {/* Center Drag Handle Badge */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-obsidian border-2 border-champagne flex items-center justify-center text-champagne shadow-2xl pointer-events-auto">
              <ArrowLeftRight size={14} />
            </div>
          </div>

          {/* Bottom Metre Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-obsidian/80 px-4 py-1.5 border border-white/10 backdrop-blur-md text-[10px] font-mono tracking-widest text-titanium">
            ELEVATION INDEX: {Math.round(sliderPosition)}%
          </div>
        </div>
      </div>
    </section>
  );
};
