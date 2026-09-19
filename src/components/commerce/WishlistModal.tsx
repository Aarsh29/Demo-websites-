import React from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { useSound } from '../../context/SoundContext';
import { X, Trash2, Plus, ShoppingBag } from 'lucide-react';

export const WishlistModal: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart, formatPrice } =
    useCommerce();
  const { playClick, playSuccess } = useSound();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-[9300] bg-obsidian/85 backdrop-blur-md flex justify-end">
      <div className="w-full max-w-md md:max-w-lg bg-noir border-l border-white/10 h-full flex flex-col justify-between shadow-2xl animate-slideLeft">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-champagne uppercase block">
              SAVED PIECES
            </span>
            <h3 className="font-serif text-2xl text-ivory uppercase">
              YOUR WISHLIST ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={() => {
              playClick();
              setIsWishlistOpen(false);
            }}
            data-cursor="CLOSE"
            className="p-2 text-titanium hover:text-ivory rounded-full border border-white/10 hover:border-white/30 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-titanium">
              <p className="font-serif text-xl text-ivory/80 uppercase mb-2">
                NO SAVED PIECES
              </p>
              <p className="font-sans text-xs font-light max-w-xs mb-6">
                Save pieces as you explore the collection to curate your personal archive.
              </p>
              <button
                onClick={() => {
                  playClick();
                  setIsWishlistOpen(false);
                }}
                className="py-3 px-6 bg-ivory text-obsidian text-xs font-mono uppercase tracking-widest hover:bg-champagne transition-colors"
              >
                EXPLORE ARCHIVE
              </button>
            </div>
          ) : (
            wishlist.map((item) => (
              <div key={item.id} className="flex space-x-4 border-b border-white/5 pb-6">
                <div className="w-20 h-24 bg-charcoal shrink-0 border border-white/10 overflow-hidden">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-base text-ivory uppercase">{item.name}</h4>
                      <button
                        onClick={() => toggleWishlist(item)}
                        className="text-titanium hover:text-rose-400 p-1"
                        title="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-xs text-titanium font-sans mt-0.5">{item.subtitle}</p>
                    <span className="font-mono text-sm text-champagne block mt-2">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      playSuccess();
                      addToCart(item);
                      toggleWishlist(item);
                    }}
                    className="mt-3 flex items-center space-x-1.5 text-xs font-mono uppercase tracking-widest text-ivory hover:text-champagne transition-colors"
                  >
                    <ShoppingBag size={14} />
                    <span>MOVE TO BAG</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
