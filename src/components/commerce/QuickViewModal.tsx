import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { useSound } from '../../context/SoundContext';
import { X, Heart, Plus, ShieldCheck, Check } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isInWishlist, formatPrice } =
    useCommerce();
  const { playClick, playHover } = useSound();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedFit, setSelectedFit] = useState<string>('');

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWish = isInWishlist(product.id);
  const chosenColor = product.colors[selectedColorIdx]?.name || 'Standard';
  const chosenSize = selectedSize || product.sizes[0];
  const chosenFit = selectedFit || product.fits[0];

  const handleAddToCart = () => {
    addToCart(product, chosenColor, chosenSize, chosenFit);
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-[9400] bg-obsidian/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
      <div className="bg-noir border border-white/15 max-w-5xl w-full my-auto shadow-2xl overflow-hidden relative animate-fadeIn flex flex-col lg:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          data-cursor="CLOSE"
          className="absolute top-4 right-4 z-30 p-2 text-titanium hover:text-ivory rounded-full bg-obsidian/70 border border-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left Column: Multi-Angle Imagery (Cols 1-6) */}
        <div className="lg:w-1/2 bg-charcoal relative flex flex-col justify-between p-6 sm:p-8">
          <div className="relative w-full aspect-[3/4] overflow-hidden bg-obsidian flex items-center justify-center">
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center filter contrast-[1.05]"
            />
          </div>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="flex space-x-3 mt-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playClick();
                    setActiveImageIdx(idx);
                  }}
                  className={`w-16 h-20 border overflow-hidden transition-all ${
                    activeImageIdx === idx
                      ? 'border-champagne scale-105'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Angle view" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Specifications & Purchasing Controls (Cols 7-12) */}
        <div className="lg:w-1/2 p-6 sm:p-10 overflow-y-auto flex flex-col justify-between space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-xs tracking-[0.3em] text-champagne uppercase">
                {product.category} • NO. {product.number}
              </span>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 border border-emerald-800/40">
                {product.stockCount} IN ATELIER RESERVE
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-ivory uppercase tracking-wide mb-2">
              {product.name}
            </h3>
            <p className="font-sans text-xs text-titanium mb-4 font-light">
              {product.subtitle}
            </p>
            <div className="font-mono text-2xl text-ivory tracking-widest mb-6">
              {formatPrice(product.price)}
            </div>

            <p className="font-sans text-xs text-titanium/90 leading-relaxed font-light mb-6 border-l border-white/15 pl-4">
              {product.description}
            </p>

            {/* Colors */}
            <div className="mb-6">
              <span className="font-mono text-[11px] tracking-widest text-titanium uppercase block mb-2">
                SHADE: <strong className="text-ivory font-normal">{chosenColor}</strong>
              </span>
              <div className="flex space-x-2.5">
                {product.colors.map((c, idx) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      playClick();
                      setSelectedColorIdx(idx);
                    }}
                    style={{ backgroundColor: c.hex }}
                    className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center ${
                      selectedColorIdx === idx
                        ? 'border-champagne scale-110'
                        : 'border-white/20 hover:scale-105'
                    }`}
                    title={c.name}
                  >
                    {selectedColorIdx === idx && (
                      <Check size={12} className={c.hex === '#F7F6F2' ? 'text-black' : 'text-white'} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <span className="font-mono text-[11px] tracking-widest text-titanium uppercase block mb-2">
                SIZE
              </span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      playClick();
                      setSelectedSize(s);
                    }}
                    onMouseEnter={playHover}
                    className={`py-2 px-3 text-xs font-mono border transition-all ${
                      chosenSize === s
                        ? 'border-champagne text-champagne bg-champagne/10 font-bold'
                        : 'border-white/10 text-titanium hover:border-white/30 hover:text-ivory'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Fits */}
            {product.fits.length > 1 && (
              <div className="mb-6">
                <span className="font-mono text-[11px] tracking-widest text-titanium uppercase block mb-2">
                  FIT SILHOUETTE
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.fits.map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        playClick();
                        setSelectedFit(f);
                      }}
                      onMouseEnter={playHover}
                      className={`py-1.5 px-3 text-[11px] font-mono uppercase border transition-all ${
                        chosenFit === f
                          ? 'border-ivory text-ivory bg-white/5 font-bold'
                          : 'border-white/10 text-titanium hover:border-white/30'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Composition breakdown */}
            <div className="bg-obsidian border border-white/5 p-4 text-[11px] font-mono text-titanium space-y-1">
              <div>COMPOSITION: <span className="text-ivory">{product.materials.composition}</span></div>
              <div>PROVENANCE: <span className="text-ivory">{product.materials.origin}</span></div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-white/10 flex space-x-3">
            <button
              onClick={handleAddToCart}
              data-cursor="ADD"
              className="flex-1 bg-ivory hover:bg-champagne text-obsidian py-4 px-6 text-xs font-sans font-bold tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-2xl"
            >
              <Plus size={16} />
              <span>ACQUIRE PIECE ({formatPrice(product.price)})</span>
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`p-4 border transition-colors ${
                inWish
                  ? 'border-champagne text-champagne bg-champagne/10'
                  : 'border-white/20 text-ivory hover:border-ivory'
              }`}
              title={inWish ? 'Saved in Wishlist' : 'Add to Wishlist'}
            >
              <Heart size={18} className={inWish ? 'fill-current' : ''} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
