import React, { useRef, useState } from 'react';
import { PRODUCTS, COMPLEMENTARY_PRODUCTS } from '../../data/productsData';
import { useCommerce } from '../../context/CommerceContext';
import { useSound } from '../../context/SoundContext';
import { ArrowUpRight, Flame, ChevronLeft, ChevronRight } from 'lucide-react';

const TRENDING_CATEGORIES = [
  'NEW ARRIVALS',
  'BEST SELLERS',
  'CELEBRITY INSPIRED',
  'SEASONAL EDIT',
] as const;

export const TrendingHorizontal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<typeof TRENDING_CATEGORIES[number]>('NEW ARRIVALS');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { openQuickView, formatPrice } = useCommerce();
  const { playClick, playHover } = useSound();

  const allItems = [...PRODUCTS, ...COMPLEMENTARY_PRODUCTS];

  // Derive products for category
  const filteredProducts =
    activeTab === 'NEW ARRIVALS'
      ? allItems.slice(0, 5)
      : activeTab === 'BEST SELLERS'
      ? [PRODUCTS[1], PRODUCTS[0], PRODUCTS[3], PRODUCTS[4], PRODUCTS[2]]
      : activeTab === 'CELEBRITY INSPIRED'
      ? [PRODUCTS[5], PRODUCTS[1], COMPLEMENTARY_PRODUCTS[1], PRODUCTS[4]]
      : [PRODUCTS[0], PRODUCTS[3], PRODUCTS[2], PRODUCTS[5]];

  const scroll = (direction: 'left' | 'right') => {
    playClick();
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -420 : 420;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="trending" className="relative w-full py-28 px-6 sm:px-12 md:px-16 bg-noir border-t border-white/10 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-14">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono tracking-[0.3em] text-champagne uppercase mb-2">
              <Flame size={14} />
              <span>CULTURAL RESONANCE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-ivory tracking-tight uppercase">
              THE TRENDING EDITORIAL
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {TRENDING_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClick();
                  setActiveTab(cat);
                }}
                onMouseEnter={playHover}
                data-cursor="FILTER"
                className={`py-2 px-3 sm:px-4 text-[11px] font-mono tracking-widest uppercase transition-all duration-300 border ${
                  activeTab === cat
                    ? 'border-champagne text-champagne bg-champagne/10 font-bold'
                    : 'border-white/10 text-titanium hover:text-ivory hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Parallax Scroll Track */}
      <div className="relative max-w-[1400px] mx-auto">
        {/* Navigation Arrows */}
        <div className="hidden lg:flex absolute -top-16 right-0 space-x-2 z-20">
          <button
            onClick={() => scroll('left')}
            className="p-3 border border-white/20 hover:border-champagne text-ivory hover:text-champagne transition-colors bg-obsidian"
            title="Scroll Left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-3 border border-white/20 hover:border-champagne text-ivory hover:text-champagne transition-colors bg-obsidian"
            title="Scroll Right"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex space-x-6 sm:space-x-8 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProducts.map((product, idx) => (
            <div
              key={product.id}
              onClick={() => openQuickView(product)}
              onMouseEnter={playHover}
              data-cursor="VIEW PIECE"
              className="w-[280px] sm:w-[360px] md:w-[420px] shrink-0 group cursor-pointer snap-start flex flex-col"
            >
              {/* Product Card Image with Parallax Shift Effect */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-charcoal border border-white/10">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center filter grayscale-[15%] group-hover:scale-105 group-hover:grayscale-0 transition-transform duration-700 ease-luxury"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                {/* Badge Tag */}
                <div className="absolute top-4 left-4 bg-obsidian/80 px-2.5 py-1 border border-white/10 font-mono text-[9px] tracking-widest text-champagne uppercase">
                  {activeTab} • NO. 0{idx + 1}
                </div>

                {/* Floating Action Arrow */}
                <div className="absolute bottom-4 right-4 p-2.5 rounded-full bg-ivory text-obsidian transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              {/* Info */}
              <div className="pt-4 flex justify-between items-start border-b border-white/5 pb-2">
                <div>
                  <h4 className="font-serif text-lg sm:text-xl text-ivory uppercase group-hover:text-champagne transition-colors">
                    {product.name}
                  </h4>
                  <p className="font-sans text-xs text-titanium mt-0.5 font-light">
                    {product.subtitle}
                  </p>
                </div>
                <span className="font-mono text-sm text-ivory tracking-widest shrink-0">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
