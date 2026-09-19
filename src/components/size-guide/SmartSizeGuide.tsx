import React, { useState } from 'react';
import { useSound } from '../../context/SoundContext';
import { Ruler, ShieldCheck, Check } from 'lucide-react';

type BodyType = 'SLIM' | 'ATHLETIC' | 'REGULAR' | 'BROAD';
type FitPreference = 'SLIM FIT' | 'REGULAR FIT' | 'OVERSIZED';

export const SmartSizeGuide: React.FC = () => {
  const [heightCm, setHeightCm] = useState(182);
  const [weightKg, setWeightKg] = useState(76);
  const [bodyType, setBodyType] = useState<BodyType>('ATHLETIC');
  const [fitPreference, setFitPreference] = useState<FitPreference>('REGULAR FIT');

  const { playSliderTick, playClick, playHover } = useSound();

  // Algorithmic sizing
  const calculateSize = () => {
    let baseChest = (weightKg / (heightCm / 100)) * 2.3;
    if (bodyType === 'ATHLETIC') baseChest += 4;
    if (bodyType === 'BROAD') baseChest += 7;
    if (bodyType === 'SLIM') baseChest -= 3;

    let sizeEu = '48';
    let sizeAlpha = 'M';
    let waist = '32W';

    if (baseChest < 94) {
      sizeEu = '44';
      sizeAlpha = 'XS';
      waist = '28W';
    } else if (baseChest < 98) {
      sizeEu = '46';
      sizeAlpha = 'S';
      waist = '30W';
    } else if (baseChest < 104) {
      sizeEu = '48';
      sizeAlpha = 'M';
      waist = '32W';
    } else if (baseChest < 110) {
      sizeEu = '50';
      sizeAlpha = 'L';
      waist = '34W';
    } else if (baseChest < 116) {
      sizeEu = '52';
      sizeAlpha = 'XL';
      waist = '36W';
    } else {
      sizeEu = '54';
      sizeAlpha = 'XXL';
      waist = '38W';
    }

    const confidence = Math.min(98, Math.max(92, Math.round(96 - Math.abs(weightKg - 75) * 0.1)));

    return {
      sizeEu,
      sizeAlpha,
      waist,
      chestCm: Math.round(baseChest),
      shoulderCm: Math.round(baseChest * 0.44),
      confidence,
    };
  };

  const fitResult = calculateSize();

  // Dynamic SVG silhouette morph calculation based on physical inputs
  const shoulderWidth = 140 + (fitResult.shoulderCm - 42) * 5;
  const waistWidth = 90 + (weightKg - 70) * 1.5 - (bodyType === 'ATHLETIC' ? 10 : 0);
  const hipWidth = waistWidth + 16;
  const legHeight = 180 + (heightCm - 175) * 2.2;

  const BODY_TYPES: BodyType[] = ['SLIM', 'ATHLETIC', 'REGULAR', 'BROAD'];
  const FIT_PREFS: FitPreference[] = ['SLIM FIT', 'REGULAR FIT', 'OVERSIZED'];

  return (
    <section id="size-guide" className="relative w-full py-28 px-6 sm:px-12 md:px-16 bg-obsidian border-t border-white/10 overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-champagne/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-[0.3em] text-champagne uppercase mb-3">
          <Ruler size={14} />
          <span>ANATOMICAL VOLUMETRIC CALIBRATION</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory tracking-tight uppercase">
          THE PRECISION FIT ALGORITHM
        </h2>
        <p className="font-sans text-xs sm:text-sm text-titanium mt-3 max-w-xl mx-auto font-light leading-relaxed">
          Proprietary architectural grading calibrated to your exact bodily geometry. Eliminates generic alpha sizing through dynamic volumetric contours.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Left Column: Bespoke Architectural Caliper Sliders (Cols 1-6) */}
        <div className="lg:col-span-6 bg-noir border border-white/10 p-8 sm:p-10 shadow-2xl flex flex-col justify-between space-y-8">
          {/* Height Caliper Scrubber */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-mono text-xs tracking-widest text-titanium uppercase">
                01 / STATURE (HEIGHT)
              </span>
              <span className="font-mono text-sm font-bold text-ivory">
                {heightCm} CM <span className="text-champagne font-normal">/ {Math.floor(heightCm / 30.48)}'{Math.round((heightCm % 30.48) / 2.54)}"</span>
              </span>
            </div>

            <div className="relative py-2">
              <input
                type="range"
                min={165}
                max={200}
                value={heightCm}
                onChange={(e) => {
                  setHeightCm(parseInt(e.target.value, 10));
                  playSliderTick();
                }}
                className="w-full accent-champagne bg-charcoal h-1 cursor-pointer appearance-none"
              />
              {/* Architectural measurement ticks */}
              <div className="flex justify-between text-[9px] font-mono text-titanium/40 mt-1">
                <span>165CM</span>
                <span>175CM</span>
                <span>185CM</span>
                <span>200CM</span>
              </div>
            </div>
          </div>

          {/* Weight Caliper Scrubber */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="font-mono text-xs tracking-widest text-titanium uppercase">
                02 / MASS (WEIGHT)
              </span>
              <span className="font-mono text-sm font-bold text-ivory">
                {weightKg} KG <span className="text-champagne font-normal">/ {Math.round(weightKg * 2.20462)} LBS</span>
              </span>
            </div>

            <div className="relative py-2">
              <input
                type="range"
                min={55}
                max={110}
                value={weightKg}
                onChange={(e) => {
                  setWeightKg(parseInt(e.target.value, 10));
                  playSliderTick();
                }}
                className="w-full accent-champagne bg-charcoal h-1 cursor-pointer appearance-none"
              />
              <div className="flex justify-between text-[9px] font-mono text-titanium/40 mt-1">
                <span>55KG</span>
                <span>75KG</span>
                <span>95KG</span>
                <span>110KG</span>
              </div>
            </div>
          </div>

          {/* Body Archetype Selector */}
          <div>
            <span className="font-mono text-xs tracking-widest text-titanium uppercase block mb-3">
              03 / ANATOMICAL ARCHETYPE
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {BODY_TYPES.map((bt) => (
                <button
                  key={bt}
                  onClick={() => {
                    playClick();
                    setBodyType(bt);
                  }}
                  onMouseEnter={playHover}
                  className={`py-3 px-2 text-center text-xs font-mono uppercase tracking-wider border transition-all ${
                    bodyType === bt
                      ? 'bg-ivory text-obsidian border-ivory font-bold shadow-lg'
                      : 'border-white/5 bg-charcoal/50 text-titanium hover:border-white/20 hover:text-ivory'
                  }`}
                >
                  {bt}
                </button>
              ))}
            </div>
          </div>

          {/* Drape Preference */}
          <div>
            <span className="font-mono text-xs tracking-widest text-titanium uppercase block mb-3">
              04 / DRAPE PHILOSOPHY
            </span>
            <div className="grid grid-cols-3 gap-2">
              {FIT_PREFS.map((fp) => (
                <button
                  key={fp}
                  onClick={() => {
                    playClick();
                    setFitPreference(fp);
                  }}
                  onMouseEnter={playHover}
                  className={`py-2.5 px-2 text-center text-[11px] font-mono uppercase tracking-wider border transition-all ${
                    fitPreference === fp
                      ? 'bg-champagne text-obsidian border-champagne font-bold shadow-lg'
                      : 'border-white/5 bg-charcoal/50 text-titanium hover:border-white/20 hover:text-ivory'
                  }`}
                >
                  {fp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Morphing SVG Mannequin & Specs (Cols 7-12) */}
        <div className="lg:col-span-6 bg-noir border border-white/10 p-8 sm:p-10 shadow-2xl flex flex-col justify-between text-left">
          <div>
            {/* Header / Confidence Badge */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
              <span className="text-[10px] font-mono tracking-[0.3em] text-champagne uppercase flex items-center gap-2">
                <ShieldCheck size={16} />
                CALIBRATED SPECIFICATION
              </span>
              <span className="font-mono text-xs text-emerald-400 bg-emerald-950/60 px-2.5 py-1 border border-emerald-800/40">
                {fitResult.confidence}% FIT CONFIDENCE
              </span>
            </div>

            {/* Recommended Size Display */}
            <div className="flex items-baseline space-x-6 mb-6">
              <div>
                <span className="text-xs font-mono text-titanium uppercase block">EU TAILORED SIZE</span>
                <span className="font-serif text-6xl sm:text-7xl text-ivory font-bold">
                  {fitResult.sizeEu}
                </span>
              </div>
              <div className="border-l border-white/10 pl-6">
                <span className="text-xs font-mono text-titanium uppercase block">ALPHA / WAIST</span>
                <span className="font-serif text-3xl sm:text-4xl text-champagne">
                  {fitResult.sizeAlpha} • {fitResult.waist}
                </span>
              </div>
            </div>

            {/* DYNAMIC MORPHING SVG ANATOMICAL SILHOUETTE */}
            <div className="bg-obsidian border border-white/5 p-6 mb-6 flex items-center justify-center relative overflow-hidden">
              <svg viewBox="0 0 300 260" className="w-full h-44 transition-all duration-500 ease-out">
                {/* Background grid lines */}
                <line x1="20" y1="60" x2="280" y2="60" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <line x1="20" y1="120" x2="280" y2="120" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <line x1="20" y1="180" x2="280" y2="180" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <line x1="150" y1="10" x2="150" y2="250" stroke="rgba(197,168,128,0.2)" strokeDasharray="2 2" />

                {/* Torso & Pagoda Shoulder Contour */}
                <path
                  d={`
                    M ${150 - shoulderWidth / 2} 45
                    Q ${150 - shoulderWidth / 2 - 12} 48, ${150 - shoulderWidth / 2 - 8} 68
                    L ${150 - waistWidth / 2} 125
                    L ${150 - hipWidth / 2} 165
                    L 150 172
                    L ${150 + hipWidth / 2} 165
                    L ${150 + waistWidth / 2} 125
                    L ${150 + shoulderWidth / 2 + 8} 68
                    Q ${150 + shoulderWidth / 2 + 12} 48, ${150 + shoulderWidth / 2} 45
                    L 170 38
                    L 150 48
                    L 130 38
                    Z
                  `}
                  fill="rgba(197,168,128,0.08)"
                  stroke="#C5A880"
                  strokeWidth="1.5"
                  className="transition-all duration-400 ease-out"
                />

                {/* Inverted Pleat Trouser Legs */}
                <line
                  x1="130"
                  y1="172"
                  x2="125"
                  y2={Math.min(250, 172 + legHeight * 0.4)}
                  stroke="#8E9094"
                  strokeWidth="1.2"
                  className="transition-all duration-400"
                />
                <line
                  x1="170"
                  y1="172"
                  x2="175"
                  y2={Math.min(250, 172 + legHeight * 0.4)}
                  stroke="#8E9094"
                  strokeWidth="1.2"
                  className="transition-all duration-400"
                />

                {/* Caliper Measurement Labels */}
                <text x="150" y="32" textAnchor="middle" fill="#C5A880" fontSize="9" fontFamily="monospace">
                  SHOULDER: {fitResult.shoulderCm} CM
                </text>
                <text x="150" y="145" textAnchor="middle" fill="#8E9094" fontSize="8" fontFamily="monospace">
                  CHEST: {fitResult.chestCm} CM
                </text>
              </svg>
            </div>

            <p className="font-sans text-xs text-titanium/90 leading-relaxed font-light">
              Calibrated for <strong>{fitPreference}</strong> with structured pagoda canvas pads. Designed to drape without tension across the lats while maintaining an immaculate line through the trouser break.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-titanium">
            <span>GUARANTEED BESPOKE EXCHANGE</span>
            <span className="text-champagne font-bold">COMPLIMENTARY WORLDWIDE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
