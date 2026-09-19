import React from 'react';
import { ArrowDownRight, Compass, Volume2 } from 'lucide-react';
import { HeroScene3D } from './HeroScene3D';
import { useSound } from '../../context/SoundContext';

interface HeroExperienceProps {
  onExploreClick: () => void;
  onEnterExperience: () => void;
}

export const HeroExperience: React.FC<HeroExperienceProps> = ({
  onExploreClick,
  onEnterExperience,
}) => {
  const { playClick, playHover, isMuted } = useSound();

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[750px] flex flex-col justify-between overflow-hidden bg-obsidian pt-24 pb-8 px-6 sm:px-12 md:px-16 select-none"
    >
      {/* FULL-VIEWPORT 3D WEBGL SCENE (Behind and integrated with typography) */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <HeroScene3D />
      </div>

      {/* Atmospheric Vignette & Lighting Masks */}
      <div className="absolute inset-0 z-10 bg-radial-vignette pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-obsidian/90 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent pointer-events-none z-10" />

      {/* Left Vertical Editorial Coordinates Rail */}
      <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center space-y-6 pointer-events-none">
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-titanium/70 -rotate-90 origin-center whitespace-nowrap">
          ATELIER ARSATH • CIVITANOVA MARCHE • 43.3073° N, 13.7279° E
        </span>
        <div className="w-[1px] h-20 bg-white/20" />
        <span className="font-mono text-[9px] tracking-widest text-champagne">07</span>
      </div>

      {/* Right Vertical Editorial Series Rail */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center space-y-6 pointer-events-none">
        <span className="font-mono text-[9px] tracking-widest text-champagne">MMXXVI</span>
        <div className="w-[1px] h-20 bg-white/20" />
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-titanium/70 rotate-90 origin-center whitespace-nowrap">
          HAUTE MENSWEAR ARCHITECTURAL SCULPTURE
        </span>
      </div>

      {/* TOP STATUS BAR */}
      <div className="relative z-20 flex justify-between items-center text-[10px] font-mono tracking-[0.35em] text-titanium/80 uppercase">
        <div className="flex items-center space-x-3">
          <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
          <span>AUTUMN / WINTER 2026</span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="hidden sm:inline">SERIES NO. 07</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-1.5 text-champagne">
            <span className="w-1 h-3 bg-champagne animate-pulse" />
            <span className="w-1 h-4 bg-champagne" />
            <span className="w-1 h-2 bg-champagne" />
            <span className="text-[9px] tracking-widest ml-1 font-mono">{isMuted ? 'AUDIO MUTED' : '432 HZ ATMOSPHERE'}</span>
          </div>
          <span>BIELLA • HUDDERSFIELD • CIVITANOVA</span>
        </div>
      </div>

      {/* CENTER GIANT EDITORIAL HEADLINE LAYER (Interlocking with 3D Centerpiece) */}
      <div className="relative z-20 pointer-events-none my-auto flex flex-col justify-center items-center text-center">
        <div className="overflow-hidden">
          <p className="font-mono text-[11px] sm:text-xs tracking-[0.45em] text-champagne uppercase mb-4 opacity-90">
            [ PERMANENT COLLECTION • VOLUME VII ]
          </p>
        </div>

        <h1 className="hero-title-clamp font-serif font-light text-ivory tracking-tighter uppercase leading-[0.84] drop-shadow-2xl">
          CRAFTED<br />
          <span className="italic font-normal text-titanium/80 font-serif lowercase tracking-normal">for the</span><br />
          EXCEPTIONAL.
        </h1>

        <p className="mt-6 font-sans text-xs sm:text-sm text-titanium/90 max-w-lg mx-auto font-light tracking-widest leading-relaxed uppercase">
          Architectural tailoring forged through unyielding restraint.
        </p>
      </div>

      {/* BOTTOM ACTION & EDITORIAL FOOTER */}
      <div className="relative z-20 flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-white/10 gap-4">
        {/* Editorial Subtext */}
        <div className="text-left font-mono text-[10px] tracking-widest text-titanium/80 uppercase">
          <span className="text-champagne font-bold">01 / 06</span> ARCHIVAL COMPOSITION • SUPER 160S WORSTED
        </div>

        {/* CTAs */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              playClick();
              onExploreClick();
            }}
            onMouseEnter={playHover}
            data-cursor="EXPLORE"
            className="group relative inline-flex items-center space-x-3 bg-ivory text-obsidian px-8 py-3.5 text-xs font-sans uppercase tracking-[0.25em] font-semibold transition-all duration-300 hover:bg-champagne shadow-2xl"
          >
            <span>EXPLORE COLLECTION</span>
            <ArrowDownRight size={15} className="transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => {
              playClick();
              onEnterExperience();
            }}
            onMouseEnter={playHover}
            data-cursor="DISCOVER"
            className="inline-flex items-center space-x-2 border border-white/20 hover:border-champagne text-ivory px-6 py-3.5 text-xs font-sans uppercase tracking-[0.25em] font-medium transition-all duration-300 hover:text-champagne backdrop-blur-md"
          >
            <Compass size={15} className="text-champagne" />
            <span>ENTER EXPERIENCE</span>
          </button>
        </div>

        {/* Right Telemetry */}
        <div className="hidden sm:block text-right font-mono text-[10px] tracking-widest text-titanium/70 uppercase">
          DRAG TO ROTATE 360°
        </div>
      </div>
    </section>
  );
};
