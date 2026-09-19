import React, { useState } from 'react';
import { STYLE_OCCASIONS, STYLE_PERSONAS, CURATED_ENSEMBLES } from '../../data/looksData';
import { StyleEnsemble } from '../../types';
import { useCommerce } from '../../context/CommerceContext';
import { useSound } from '../../context/SoundContext';
import { Sparkles, RefreshCw, Bookmark, ShoppingBag, Check, Compass, Eye } from 'lucide-react';

export const AIStyleStudio: React.FC = () => {
  const [selectedOccasion, setSelectedOccasion] = useState<string>('BUSINESS');
  const [selectedPersona, setSelectedPersona] = useState<string>('MINIMAL');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { addToCart, formatPrice, openQuickView } = useCommerce();
  const { playClick, playHover, playSuccess, playTransition } = useSound();

  const currentKey = `${selectedOccasion}_${selectedPersona}`;
  const ensemble: StyleEnsemble = CURATED_ENSEMBLES[currentKey] || CURATED_ENSEMBLES['BUSINESS_MINIMAL'];

  const handleSynthesize = () => {
    playTransition();
    setIsSynthesizing(true);
    setIsSaved(false);
    setTimeout(() => {
      setIsSynthesizing(false);
      playSuccess();
    }, 450);
  };

  const handleShopTheLook = () => {
    playSuccess();
    addToCart(ensemble.items.blazer);
    addToCart(ensemble.items.shirt);
    addToCart(ensemble.items.trouser);
    addToCart(ensemble.items.shoe);
    addToCart(ensemble.items.accessory);
  };

  return (
    <section id="style-studio" className="relative w-full py-28 px-6 sm:px-12 md:px-16 bg-obsidian border-t border-white/10 overflow-hidden select-none">
      {/* Background ambient luxury glow */}
      <div className="absolute top-1/4 right-1/4 w-[750px] h-[750px] bg-champagne/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono tracking-[0.3em] text-champagne uppercase mb-2">
              <Sparkles size={14} />
              <span>NEURAL SARTORIAL ATELIER</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory tracking-tight uppercase">
              DEFINE YOUR LOOK.
            </h2>
          </div>
          <div className="text-left md:text-right">
            <span className="font-mono text-xs text-titanium uppercase block">
              ALGORITHMIC HAUTE CONSULTATION
            </span>
            <span className="font-sans text-xs text-titanium/70 font-light">
              Harmonic Drape & Material Synergy
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Editorial Consultation Deck (Cols 1-5) */}
        <div className="lg:col-span-5 bg-noir border border-white/10 p-8 sm:p-10 shadow-2xl flex flex-col space-y-8">
          {/* Step 1: Occasion Wheel */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-xs text-champagne tracking-widest uppercase">
                01 / CONTEXT
              </span>
              <span className="font-mono text-[11px] text-titanium uppercase">
                OCCASION: <strong className="text-ivory">{selectedOccasion}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {STYLE_OCCASIONS.map((occ) => {
                const isSelected = selectedOccasion === occ;
                return (
                  <button
                    key={occ}
                    onClick={() => {
                      playClick();
                      setSelectedOccasion(occ);
                      handleSynthesize();
                    }}
                    onMouseEnter={playHover}
                    className={`py-3 px-3 text-left font-mono text-xs tracking-wider uppercase transition-all duration-300 border ${
                      isSelected
                        ? 'bg-ivory text-obsidian font-bold border-ivory shadow-lg'
                        : 'bg-charcoal/40 text-titanium border-white/5 hover:border-white/20 hover:text-ivory'
                    }`}
                  >
                    {occ}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Persona Ethos */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-xs text-champagne tracking-widest uppercase">
                02 / AESTHETIC ETHOS
              </span>
              <span className="font-mono text-[11px] text-titanium uppercase">
                ETHOS: <strong className="text-ivory">{selectedPersona}</strong>
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {STYLE_PERSONAS.map((style) => {
                const isSelected = selectedPersona === style;
                return (
                  <button
                    key={style}
                    onClick={() => {
                      playClick();
                      setSelectedPersona(style);
                      handleSynthesize();
                    }}
                    onMouseEnter={playHover}
                    className={`py-2.5 px-4 font-mono text-xs tracking-wider uppercase transition-all duration-300 border ${
                      isSelected
                        ? 'bg-champagne text-obsidian font-bold border-champagne shadow-lg'
                        : 'bg-charcoal/40 text-titanium border-white/5 hover:border-white/20 hover:text-ivory'
                    }`}
                  >
                    {style}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Palette & Harmony Meter */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex justify-between items-center text-xs font-mono tracking-widest text-titanium mb-2">
              <span>COLOR HARMONY INDEX</span>
              <span className="text-champagne font-bold">{ensemble.harmonyScore}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 relative overflow-hidden mb-4">
              <div
                className="h-full bg-champagne transition-all duration-500"
                style={{ width: `${ensemble.harmonyScore}%` }}
              />
            </div>

            {/* Color Palette Swatches */}
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono text-titanium uppercase mr-2">PALETTE:</span>
              {ensemble.colorPalette.map((hex, idx) => (
                <div
                  key={idx}
                  style={{ backgroundColor: hex }}
                  className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                  title={hex}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Complete Look Synthesis Visual Showcase (Cols 6-12) */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div
            className={`bg-noir border border-white/10 p-8 sm:p-10 shadow-2xl transition-all duration-500 ${
              isSynthesizing ? 'opacity-40 blur-sm scale-[0.99]' : 'opacity-100 scale-100'
            }`}
          >
            {/* Header of synthesized ensemble */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-white/10 pb-6 mb-8 gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-[0.3em] text-champagne uppercase block mb-1">
                  SYNTHESIZED ARCHIVAL ENSEMBLE
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-ivory tracking-wide uppercase">
                  {ensemble.name}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-mono text-titanium uppercase block">COMPLETE ENSEMBLE</span>
                <span className="font-mono text-2xl text-ivory tracking-widest">
                  {formatPrice(ensemble.totalPrice)}
                </span>
              </div>
            </div>

            {/* Visual Ensemble Composition Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
              {[
                { label: 'JACKET', item: ensemble.items.blazer },
                { label: 'SHIRT', item: ensemble.items.shirt },
                { label: 'TROUSER', item: ensemble.items.trouser },
                { label: 'FOOTWEAR', item: ensemble.items.shoe },
                { label: 'HOROLOGY', item: ensemble.items.accessory },
              ].map(({ label, item }) => (
                <div
                  key={label}
                  onClick={() => openQuickView(item)}
                  data-cursor="VIEW"
                  className="group relative bg-charcoal border border-white/5 overflow-hidden flex flex-col cursor-pointer"
                >
                  <div className="aspect-[3/4] w-full overflow-hidden relative">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-75" />
                    <span className="absolute top-2 left-2 text-[9px] font-mono tracking-widest text-titanium uppercase bg-obsidian/80 px-1.5 py-0.5">
                      {label}
                    </span>
                    <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-ivory text-obsidian opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye size={12} />
                    </div>
                  </div>
                  <div className="p-2.5 bg-obsidian/90 border-t border-white/5 flex-1 flex flex-col justify-between">
                    <h5 className="font-serif text-[11px] text-ivory uppercase line-clamp-1">
                      {item.name}
                    </h5>
                    <span className="font-mono text-[10px] text-champagne mt-1">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sartorial Rationale */}
            <div className="bg-charcoal/40 border-l-2 border-champagne p-5 mb-8">
              <span className="text-[10px] font-mono tracking-widest text-champagne uppercase block mb-1">
                SARTORIAL HARMONY RATIONALE
              </span>
              <p className="font-sans text-xs sm:text-sm text-titanium/90 leading-relaxed font-light">
                {ensemble.stylingRationale}
              </p>
            </div>

            {/* Actions: Refine, Save, Shop */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleShopTheLook}
                data-cursor="ACQUIRE ALL"
                className="w-full sm:flex-1 bg-ivory hover:bg-champagne text-obsidian py-4 px-6 text-xs font-sans font-bold tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-2xl"
              >
                <ShoppingBag size={16} />
                <span>SHOP ENSEMBLE ({formatPrice(ensemble.totalPrice)})</span>
              </button>

              <button
                onClick={() => {
                  playClick();
                  setIsSaved((prev) => !prev);
                }}
                className={`w-full sm:w-auto py-4 px-6 border text-xs font-mono tracking-widest uppercase transition-colors flex items-center justify-center space-x-2 ${
                  isSaved
                    ? 'border-champagne text-champagne bg-champagne/10'
                    : 'border-white/20 text-ivory hover:border-ivory'
                }`}
              >
                {isSaved ? <Check size={16} /> : <Bookmark size={16} />}
                <span>{isSaved ? 'SAVED' : 'SAVE LOOK'}</span>
              </button>

              <button
                onClick={handleSynthesize}
                className="w-full sm:w-auto py-4 px-6 border border-white/20 hover:border-champagne text-ivory hover:text-champagne text-xs font-mono tracking-widest uppercase transition-colors flex items-center justify-center space-x-2"
                title="Refine Look"
              >
                <RefreshCw size={16} className={isSynthesizing ? 'animate-spin' : ''} />
                <span>REFINE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
