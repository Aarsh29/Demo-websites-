import React, { useState } from 'react';
import { PRODUCTS } from '../../data/productsData';
import { Product } from '../../types';
import { useCommerce } from '../../context/CommerceContext';
import { useSound } from '../../context/SoundContext';
import { ArrowUpRight, Plus, Eye, Heart } from 'lucide-react';

export const CollectionSection: React.FC = () => {
  const [activeProductId, setActiveProductId] = useState<string>(PRODUCTS[0].id);
  const { openQuickView, addToCart, toggleWishlist, isInWishlist, formatPrice } = useCommerce();
  const { playHover, playClick } = useSound();

  const handleProductSelect = (product: Product) => {
    setActiveProductId(product.id);
    openQuickView(product);
  };

  return (
    <section id="collection" className="relative w-full py-28 px-6 sm:px-12 md:px-16 bg-noir transition-colors duration-700">
      {/* Section Header with Editorial Counter */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8 gap-6">
          <div>
            <div className="flex items-center space-x-3 text-xs tracking-[0.3em] font-mono text-champagne uppercase mb-3">
              <span className="w-1.5 h-1.5 bg-champagne rounded-full" />
              <span>THE ARCHIVAL PERMANENT EDIT</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory tracking-tight uppercase">
              01 — 06 SIGNATURE PIECES
            </h2>
          </div>
          <div className="max-w-xs text-left md:text-right">
            <p className="font-sans text-xs text-titanium leading-relaxed font-light">
              A reductive wardrobe conceived as a single unified architectural system. Six eternal silhouettes developed with zero compromise on materiality.
            </p>
          </div>
        </div>
      </div>

      {/* Asymmetric Editorial Grid / Composition */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start">
        {PRODUCTS.map((product, index) => {
          // Asymmetric column spans and offsets for an editorial magazine layout
          const colSpan =
            index === 0
              ? 'lg:col-span-7'
              : index === 1
              ? 'lg:col-span-5 lg:mt-24'
              : index === 2
              ? 'lg:col-span-5'
              : index === 3
              ? 'lg:col-span-7 lg:-mt-12'
              : index === 4
              ? 'lg:col-span-6'
              : 'lg:col-span-6 lg:mt-16';

          const inWish = isInWishlist(product.id);

          return (
            <div
              key={product.id}
              className={`${colSpan} group relative flex flex-col`}
              onMouseEnter={() => {
                setActiveProductId(product.id);
                playHover();
              }}
            >
              {/* Image Frame with Asymmetric Aspect Ratio & Hover Expansion */}
              <div
                data-cursor="VIEW PIECE"
                onClick={() => handleProductSelect(product)}
                className="relative w-full overflow-hidden bg-charcoal cursor-pointer aspect-[3/4] sm:aspect-[4/5] transition-all duration-700 ease-luxury group-hover:shadow-2xl"
              >
                {/* Background Image */}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center filter grayscale-[25%] contrast-[1.05] transition-transform duration-1000 ease-luxury group-hover:scale-105 group-hover:grayscale-0"
                  loading="lazy"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Oversized Editorial Number Stamp */}
                <span className="absolute top-4 left-6 font-serif text-6xl sm:text-7xl font-bold text-white/10 group-hover:text-champagne/30 transition-colors duration-500 select-none pointer-events-none">
                  {product.number}
                </span>

                {/* Top Right Quick Actions */}
                <div className="absolute top-6 right-6 z-20 flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className={`p-2.5 rounded-full backdrop-blur-md transition-colors ${
                      inWish ? 'bg-champagne text-obsidian' : 'bg-obsidian/70 text-ivory hover:bg-ivory hover:text-obsidian'
                    }`}
                    title={inWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart size={16} className={inWish ? 'fill-current' : ''} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openQuickView(product);
                    }}
                    className="p-2.5 rounded-full bg-obsidian/70 text-ivory backdrop-blur-md hover:bg-champagne hover:text-obsidian transition-colors"
                    title="Quick View"
                  >
                    <Eye size={16} />
                  </button>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-6 left-6 right-6 z-10 flex justify-between items-end">
                  <div className="text-left">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-champagne uppercase block mb-1">
                      {product.materials.origin.split('&')[0]}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-ivory tracking-wide uppercase group-hover:text-champagne transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <span className="font-mono text-sm text-ivory tracking-widest bg-obsidian/70 px-3 py-1.5 backdrop-blur-sm border border-white/10">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>

              {/* Editorial Description & Subtitle beneath image */}
              <div className="mt-5 flex justify-between items-start pt-2 border-t border-white/5">
                <div className="pr-4">
                  <p className="font-sans text-xs text-titanium/80 tracking-wide font-light">
                    {product.subtitle}
                  </p>
                  <p className="font-mono text-[11px] text-titanium/60 mt-1 uppercase">
                    {product.materials.composition}
                  </p>
                </div>

                <button
                  onClick={() => {
                    playClick();
                    addToCart(product);
                  }}
                  data-cursor="ADD"
                  className="flex items-center space-x-1.5 text-xs font-mono uppercase tracking-widest text-ivory/80 hover:text-champagne transition-colors shrink-0 pt-0.5"
                >
                  <Plus size={14} />
                  <span>ADD TO BAG</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
