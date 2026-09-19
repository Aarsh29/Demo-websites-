import React, { useState } from 'react';
import { PRODUCTS, COMPLEMENTARY_PRODUCTS } from '../../data/productsData';
import { Product } from '../../types';
import { useCommerce } from '../../context/CommerceContext';
import { useSound } from '../../context/SoundContext';
import { ShoppingBag, Share2, Bookmark, Check, Layers, Eye } from 'lucide-react';

type SlotCategory = 'blazer' | 'shirt' | 'trouser' | 'shoe' | 'accessory';

export const LookBuilder: React.FC = () => {
  const [selectedBlazer, setSelectedBlazer] = useState<Product>(PRODUCTS[1]); // Architect Blazer
  const [selectedShirt, setSelectedShirt] = useState<Product>(PRODUCTS[0]); // Signature Shirt
  const [selectedTrouser, setSelectedTrouser] = useState<Product>(PRODUCTS[3]); // Essential Trouser
  const [selectedShoe, setSelectedShoe] = useState<Product>(PRODUCTS[2]); // Monolith Sneaker
  const [selectedAccessory, setSelectedAccessory] = useState<Product>(PRODUCTS[4]); // Noir Chronograph

  const [activeSlot, setActiveSlot] = useState<SlotCategory>('blazer');
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { addToCart, formatPrice, openQuickView } = useCommerce();
  const { playClick, playHover, playSuccess } = useSound();

  const allAvailable = [...PRODUCTS, ...COMPLEMENTARY_PRODUCTS];

  const getOptionsForSlot = (slot: SlotCategory): Product[] => {
    switch (slot) {
      case 'blazer':
        return allAvailable.filter((p) => p.category === 'Tailoring' && p.name.includes('BLAZER') || p.category === 'Outerwear');
      case 'shirt':
        return allAvailable.filter((p) => p.name.includes('SHIRT') || p.name.includes('POLO'));
      case 'trouser':
        return allAvailable.filter((p) => p.category === 'Trousers');
      case 'shoe':
        return allAvailable.filter((p) => p.category === 'Footwear');
      case 'accessory':
        return allAvailable.filter((p) => p.category === 'Horology' || p.category === 'Accessories');
    }
  };

  const handleSelectProductForSlot = (slot: SlotCategory, product: Product) => {
    playClick();
    switch (slot) {
      case 'blazer':
        setSelectedBlazer(product);
        break;
      case 'shirt':
        setSelectedShirt(product);
        break;
      case 'trouser':
        setSelectedTrouser(product);
        break;
      case 'shoe':
        setSelectedShoe(product);
        break;
      case 'accessory':
        setSelectedAccessory(product);
        break;
    }
  };

  const currentTotal =
    selectedBlazer.price +
    selectedShirt.price +
    selectedTrouser.price +
    selectedShoe.price +
    selectedAccessory.price;

  const handleAddAllToBag = () => {
    playSuccess();
    addToCart(selectedBlazer);
    addToCart(selectedShirt);
    addToCart(selectedTrouser);
    addToCart(selectedShoe);
    addToCart(selectedAccessory);
  };

  const handleShare = () => {
    playClick();
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const SLOTS: { id: SlotCategory; label: string; current: Product }[] = [
    { id: 'blazer', label: '01 / JACKET', current: selectedBlazer },
    { id: 'shirt', label: '02 / SHIRT', current: selectedShirt },
    { id: 'trouser', label: '03 / TROUSERS', current: selectedTrouser },
    { id: 'shoe', label: '04 / FOOTWEAR', current: selectedShoe },
    { id: 'accessory', label: '05 / HOROLOGY', current: selectedAccessory },
  ];

  return (
    <section id="look-builder" className="relative w-full py-28 px-6 sm:px-12 md:px-16 bg-noir border-t border-white/10 overflow-hidden select-none">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-3 text-xs tracking-[0.3em] font-mono text-champagne uppercase mb-2">
            <Layers size={14} />
            <span>HAUTE DIGITAL STYLING STUDIO</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-ivory tracking-tight uppercase">
            THE LOOK BUILDER CANVAS
          </h2>
        </div>
        <div className="text-left md:text-right">
          <span className="text-[10px] font-mono tracking-widest text-titanium uppercase block">ASSEMBLED COMMISSION</span>
          <span className="font-mono text-2xl sm:text-3xl text-ivory tracking-widest">
            {formatPrice(currentTotal)}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Layering Canvas (Cols 1-7) */}
        <div className="lg:col-span-7 bg-obsidian border border-white/10 p-6 sm:p-10 shadow-2xl relative">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10 text-xs font-mono tracking-widest text-titanium">
            <span>DISSECTED SILHOUETTE MATRIX</span>
            <span className="text-champagne font-bold">5 PIECES HARMONIZED</span>
          </div>

          {/* Interactive Garment Layer Rows */}
          <div className="space-y-4">
            {SLOTS.map((slot) => {
              const isActive = activeSlot === slot.id;
              return (
                <div
                  key={slot.id}
                  onClick={() => {
                    playClick();
                    setActiveSlot(slot.id);
                  }}
                  onMouseEnter={playHover}
                  data-cursor="SWAP PIECE"
                  className={`group cursor-pointer p-4 border transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? 'border-champagne bg-charcoal/90 shadow-xl scale-[1.01]'
                      : 'border-white/5 bg-noir/70 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Image Thumbnail */}
                    <div className="w-16 h-20 bg-charcoal overflow-hidden shrink-0 border border-white/10 relative">
                      <img
                        src={slot.current.images[0]}
                        alt={slot.current.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openQuickView(slot.current);
                        }}
                        className="absolute bottom-1 right-1 p-1 bg-obsidian/80 text-white hover:text-champagne transition-colors"
                        title="Quick View"
                      >
                        <Eye size={10} />
                      </button>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] tracking-widest text-champagne uppercase block">
                        {slot.label}
                      </span>
                      <h4 className="font-serif text-base sm:text-lg text-ivory uppercase">
                        {slot.current.name}
                      </h4>
                      <p className="font-mono text-xs text-titanium/80 mt-0.5">
                        {slot.current.subtitle.split('•')[0]}
                      </p>
                      <span className="text-[10px] font-mono text-titanium/60 block mt-1">
                        {slot.current.materials.origin.split('&')[0]}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-sm text-ivory tracking-wider block">
                      {formatPrice(slot.current.price)}
                    </span>
                    <span className={`text-[10px] font-mono uppercase tracking-widest mt-1 block transition-opacity ${
                      isActive ? 'text-champagne font-bold' : 'text-titanium/60 opacity-0 group-hover:opacity-100'
                    }`}>
                      {isActive ? 'EDITING • SWAP' : 'SELECT →'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Actions */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
            <button
              onClick={handleAddAllToBag}
              data-cursor="ADD ALL"
              className="flex-1 bg-ivory hover:bg-champagne text-obsidian py-4 px-6 text-xs font-sans font-bold tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-2xl"
            >
              <ShoppingBag size={16} />
              <span>COMMISSION COMPLETE LOOK ({formatPrice(currentTotal)})</span>
            </button>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  playClick();
                  setIsSaved(!isSaved);
                }}
                className={`p-4 border text-xs font-mono uppercase tracking-widest transition-colors flex items-center space-x-2 ${
                  isSaved ? 'border-champagne text-champagne bg-champagne/10' : 'border-white/20 text-ivory hover:border-ivory'
                }`}
                title="Save Look"
              >
                {isSaved ? <Check size={16} /> : <Bookmark size={16} />}
              </button>

              <button
                onClick={handleShare}
                className="p-4 border border-white/20 hover:border-champagne text-ivory hover:text-champagne transition-colors"
                title="Share Look"
              >
                {isCopied ? <Check size={16} className="text-emerald-400" /> : <Share2 size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Piece Selector Drawer for Active Slot (Cols 8-12) */}
        <div className="lg:col-span-5 bg-noir border border-white/10 p-6 sm:p-8 shadow-2xl">
          <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-champagne uppercase block">
                ATELIER DRAWER
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-ivory uppercase">
                SELECT {activeSlot}
              </h3>
            </div>
            <div className="flex space-x-1.5">
              {SLOTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    playClick();
                    setActiveSlot(s.id);
                  }}
                  className={`w-7 h-7 text-[10px] font-mono flex items-center justify-center border transition-all ${
                    activeSlot === s.id
                      ? 'border-champagne text-champagne bg-champagne/10 font-bold'
                      : 'border-white/10 text-titanium hover:text-ivory'
                  }`}
                >
                  {s.id[0].toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Options Grid */}
          <div className="space-y-3.5 max-h-[520px] overflow-y-auto pr-2">
            {getOptionsForSlot(activeSlot).map((option) => {
              const isSelected =
                (activeSlot === 'blazer' && selectedBlazer.id === option.id) ||
                (activeSlot === 'shirt' && selectedShirt.id === option.id) ||
                (activeSlot === 'trouser' && selectedTrouser.id === option.id) ||
                (activeSlot === 'shoe' && selectedShoe.id === option.id) ||
                (activeSlot === 'accessory' && selectedAccessory.id === option.id);

              return (
                <div
                  key={option.id}
                  onClick={() => handleSelectProductForSlot(activeSlot, option)}
                  onMouseEnter={playHover}
                  data-cursor="SELECT"
                  className={`p-3.5 border cursor-pointer transition-all flex items-center space-x-4 ${
                    isSelected
                      ? 'border-champagne bg-charcoal shadow-lg'
                      : 'border-white/5 bg-obsidian hover:border-white/20'
                  }`}
                >
                  <div className="w-16 h-20 bg-charcoal overflow-hidden shrink-0 border border-white/5">
                    <img src={option.images[0]} alt={option.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-serif text-sm sm:text-base text-ivory uppercase">
                      {option.name}
                    </h5>
                    <p className="text-[11px] font-sans text-titanium line-clamp-1 mt-0.5">
                      {option.materials.composition}
                    </p>
                    <span className="font-mono text-xs text-champagne block mt-1">
                      {formatPrice(option.price)}
                    </span>
                  </div>
                  <div>
                    {isSelected && (
                      <span className="p-1.5 rounded-full bg-champagne text-obsidian block">
                        <Check size={14} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
