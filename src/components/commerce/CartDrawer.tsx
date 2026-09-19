import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { useSound } from '../../context/SoundContext';
import { X, Trash2, Plus, Minus, ShieldCheck, Gift, Truck, ArrowRight, Check } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    formatPrice,
    clearCart
  } = useCommerce();
  const { playClick, playSuccess } = useSound();

  const [giftWrap, setGiftWrap] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'VIP2026' || promoCode.trim().toUpperCase() === 'ATELIER') {
      playSuccess();
      setDiscountPercent(15);
      setPromoApplied(true);
    } else {
      playClick();
      alert('Invalid promotional code. Try VIP2026 for 15% bespoke inaugural patronage.');
    }
  };

  const discountAmount = (cartTotal * discountPercent) / 100;
  const finalTotal = Math.max(0, cartTotal - discountAmount);

  const handleSimulateCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccess();
    setCheckoutComplete(true);
    setTimeout(() => {
      clearCart();
      setCheckoutComplete(false);
      setIsCheckoutModalOpen(false);
      setIsCartOpen(false);
    }, 2800);
  };

  return (
    <>
      <div className="fixed inset-0 z-[9200] bg-obsidian/85 backdrop-blur-md flex justify-end transition-opacity duration-500">
        <div className="w-full max-w-md md:max-w-lg bg-noir border-l border-white/10 h-full flex flex-col justify-between shadow-2xl animate-slideLeft">
          {/* Drawer Header */}
          <div className="p-6 md:p-8 border-b border-white/10 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] text-champagne uppercase block">
                HAUTE SARTORIAL COMMISSION
              </span>
              <h3 className="font-serif text-2xl text-ivory uppercase">
                YOUR SHOPPING BAG ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => {
                playClick();
                setIsCartOpen(false);
              }}
              data-cursor="CLOSE"
              className="p-2 text-titanium hover:text-ivory rounded-full border border-white/10 hover:border-white/30 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 text-titanium">
                <p className="font-serif text-xl text-ivory/80 uppercase mb-2">
                  YOUR BAG IS UNCOMMISSIONED
                </p>
                <p className="font-sans text-xs font-light max-w-xs mb-6">
                  Discover our permanent archival collection or design a bespoke ensemble in the AI Style Studio.
                </p>
                <button
                  onClick={() => {
                    playClick();
                    setIsCartOpen(false);
                  }}
                  className="py-3 px-6 bg-ivory text-obsidian text-xs font-mono uppercase tracking-widest hover:bg-champagne transition-colors"
                >
                  DISCOVER COLLECTION
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex space-x-4 border-b border-white/5 pb-6"
                >
                  <div className="w-20 h-24 bg-charcoal shrink-0 border border-white/10 overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif text-sm sm:text-base text-ivory uppercase">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedColor, item.selectedSize)
                          }
                          className="text-titanium/60 hover:text-rose-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="text-[11px] font-mono text-titanium mt-1 space-x-2">
                        <span>{item.selectedColor}</span>
                        <span>•</span>
                        <span>{item.selectedSize}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center space-x-2 border border-white/10 px-2 py-1 bg-obsidian">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor,
                              item.selectedSize,
                              item.quantity - 1
                            )
                          }
                          className="text-titanium hover:text-ivory"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-mono text-xs text-ivory px-2">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor,
                              item.selectedSize,
                              item.quantity + 1
                            )
                          }
                          className="text-titanium hover:text-ivory"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="font-mono text-sm text-ivory">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Calculations */}
          {cart.length > 0 && (
            <div className="p-6 md:p-8 border-t border-white/10 bg-obsidian/90 space-y-4">
              {/* Gift Packaging Toggle */}
              <div className="flex items-center justify-between text-xs font-mono text-titanium">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="accent-champagne"
                  />
                  <Gift size={14} className="text-champagne" />
                  <span>COMPLIMENTARY ATELIER GIFT PACKAGING</span>
                </label>
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="PROMO CODE (e.g. VIP2026)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-charcoal border border-white/10 py-2.5 px-3 text-xs font-mono text-ivory placeholder-titanium/50 focus:outline-none focus:border-champagne"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 border border-white/20 text-xs font-mono text-ivory hover:border-champagne hover:text-champagne transition-colors"
                >
                  APPLY
                </button>
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 pt-2 text-xs font-mono">
                <div className="flex justify-between text-titanium">
                  <span>SUBTOTAL</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-400">
                    <span>VIP PRIVILEGE ({discountPercent}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-titanium">
                  <span>GLOBAL EXPRESS COURIER</span>
                  <span className="text-champagne">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-base font-serif text-ivory pt-2 border-t border-white/10 font-medium">
                  <span>TOTAL COMMISSION</span>
                  <span className="font-mono text-lg">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  playClick();
                  setIsCheckoutModalOpen(true);
                }}
                data-cursor="CHECKOUT"
                className="w-full py-4 bg-ivory hover:bg-champagne text-obsidian text-xs font-sans font-bold tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-2xl"
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Simulated Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-[9900] bg-obsidian/95 backdrop-blur-2xl flex items-center justify-center p-6">
          <div className="bg-charcoal border border-champagne/40 max-w-lg w-full p-8 shadow-2xl relative animate-fadeIn">
            {checkoutComplete ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-champagne text-obsidian flex items-center justify-center mx-auto">
                  <Check size={32} />
                </div>
                <h3 className="font-serif text-2xl text-ivory uppercase">
                  COMMISSION CONFIRMED
                </h3>
                <p className="font-mono text-xs text-champagne">
                  ORDER #AT-{Math.floor(100000 + Math.random() * 900000)}
                </p>
                <p className="font-sans text-xs text-titanium max-w-xs mx-auto leading-relaxed">
                  Your pieces have been allocated for artisanal finishing in Civitanova Marche. Tracking details have been dispatched to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSimulateCheckout} className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <h3 className="font-serif text-xl text-ivory uppercase">
                    ATELIER ARSATH DIRECT CHECKOUT
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="text-titanium hover:text-ivory"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="text-xs font-mono text-champagne">
                  COMMISSION VALUE: {formatPrice(finalTotal)}
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-titanium uppercase mb-1">
                    DELIVERY ADDRESS
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="740 Park Avenue, Apt 14A, New York, NY"
                    className="w-full bg-obsidian border border-white/10 p-3 text-xs font-mono text-ivory focus:border-champagne focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-titanium uppercase mb-1">
                      CARD DETAILS
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="•••• •••• •••• 8842"
                      className="w-full bg-obsidian border border-white/10 p-3 text-xs font-mono text-ivory focus:border-champagne focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono tracking-widest text-titanium uppercase mb-1">
                      EXPIRY / CVC
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="11/29 • 840"
                      className="w-full bg-obsidian border border-white/10 p-3 text-xs font-mono text-ivory focus:border-champagne focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="flex-1 py-3 border border-white/10 text-xs font-mono text-titanium uppercase hover:text-ivory"
                  >
                    RETURN
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-champagne text-obsidian text-xs font-sans font-bold uppercase tracking-widest hover:bg-ivory transition-colors"
                  >
                    AUTHORIZE {formatPrice(finalTotal)}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
