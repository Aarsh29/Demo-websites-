import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { useSound } from '../../context/SoundContext';
import { ALL_PRODUCTS } from '../../data/productsData';
import { Search, X, ArrowUpRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openQuickView, formatPrice } = useCommerce();
  const { playClick, playHover } = useSound();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isSearchOpen) return null;

  const results = searchTerm.trim()
    ? ALL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.materials.composition.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const QUICK_SEARCHES = ['BLAZER', 'SNEAKER', 'CASHMERE', 'TITANIUM', 'GIZA COTTON', 'TROUSER'];

  return (
    <div className="fixed inset-0 z-[9600] bg-obsidian/95 backdrop-blur-2xl flex flex-col p-6 sm:p-12 md:p-16 animate-fadeIn">
      {/* Search Header */}
      <div className="max-w-4xl mx-auto w-full flex justify-between items-center border-b border-white/20 pb-4">
        <div className="flex items-center space-x-4 flex-1 mr-4">
          <Search size={24} className="text-champagne shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search archival silhouettes, fabrics, horology..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xl sm:text-2xl md:text-3xl font-serif text-ivory placeholder-titanium/40 focus:outline-none uppercase tracking-wide"
          />
        </div>
        <button
          onClick={() => {
            playClick();
            setIsSearchOpen(false);
          }}
          data-cursor="CLOSE"
          className="p-2 text-titanium hover:text-ivory rounded-full border border-white/10 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Suggested Hot Terms */}
      <div className="max-w-4xl mx-auto w-full mt-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono tracking-widest text-titanium uppercase mr-2">POPULAR:</span>
        {QUICK_SEARCHES.map((term) => (
          <button
            key={term}
            onClick={() => {
              playClick();
              setSearchTerm(term);
            }}
            onMouseEnter={playHover}
            className="text-xs font-mono tracking-wider text-titanium hover:text-champagne border border-white/10 hover:border-champagne/40 px-3 py-1 bg-noir/50 transition-colors uppercase"
          >
            {term}
          </button>
        ))}
      </div>

      {/* Results Display */}
      <div className="max-w-4xl mx-auto w-full mt-10 flex-1 overflow-y-auto pr-2">
        {searchTerm.trim() && results.length === 0 ? (
          <div className="py-16 text-center text-titanium">
            <p className="font-serif text-xl text-ivory/80 uppercase">NO PIECES MATCHED "{searchTerm}"</p>
            <p className="font-sans text-xs mt-2 font-light">
              Try searching by material (e.g. Wool, Silk, Titanium) or garment type.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  playClick();
                  openQuickView(product);
                  setIsSearchOpen(false);
                }}
                onMouseEnter={playHover}
                data-cursor="VIEW"
                className="group cursor-pointer bg-noir border border-white/10 p-4 transition-all hover:border-champagne"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-charcoal mb-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-champagne uppercase block">
                  {product.category}
                </span>
                <h4 className="font-serif text-base text-ivory uppercase group-hover:text-champagne transition-colors">
                  {product.name}
                </h4>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5 font-mono text-xs text-titanium">
                  <span>{formatPrice(product.price)}</span>
                  <ArrowUpRight size={14} className="text-champagne opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
