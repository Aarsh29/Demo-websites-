import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { useSound } from './SoundContext';

interface CommerceContextType {
  cart: CartItem[];
  addToCart: (product: Product, color?: string, size?: string, fit?: string, qty?: number) => void;
  removeFromCart: (productId: string, color: string, size: string) => void;
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toggleCart: () => void;

  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  currency: 'USD' | 'EUR' | 'GBP' | 'JPY';
  setCurrency: (c: 'USD' | 'EUR' | 'GBP' | 'JPY') => void;
  formatPrice: (usdPrice: number) => string;

  vipPoints: number;
  addVipPoints: (points: number) => void;
}

const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  JPY: { symbol: '¥', rate: 154 }
};

export const CommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { playSuccess, playClick } = useSound();

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'JPY'>('USD');
  const [vipPoints, setVipPoints] = useState<number>(() => {
    const saved = localStorage.getItem('atelier_vip_points');
    return saved ? parseInt(saved, 10) : 2400; // Starter VIP balance
  });

  useEffect(() => {
    localStorage.setItem('atelier_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('atelier_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('atelier_vip_points', String(vipPoints));
  }, [vipPoints]);

  const addToCart = (product: Product, color?: string, size?: string, fit?: string, qty: number = 1) => {
    const chosenColor = color || product.colors[0]?.name || 'Standard';
    const chosenSize = size || product.sizes[0] || 'Universal';
    const chosenFit = fit || product.fits[0] || 'Tailored Regular';

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === chosenColor &&
          item.selectedSize === chosenSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += qty;
        return next;
      } else {
        return [
          ...prev,
          {
            product,
            selectedColor: chosenColor,
            selectedSize: chosenSize,
            selectedFit: chosenFit,
            quantity: qty
          }
        ];
      }
    });

    playSuccess();
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, color: string, size: string) => {
    playClick();
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.selectedColor === color && item.selectedSize === size)
      )
    );
  };

  const updateQuantity = (productId: string, color: string, size: string, quantity: number) => {
    playClick();
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedColor === color && item.selectedSize === size) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => {
    playClick();
    setIsCartOpen((prev) => !prev);
  };

  const toggleWishlist = (product: Product) => {
    playClick();
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const openQuickView = (product: Product) => {
    playClick();
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    playClick();
    setQuickViewProduct(null);
  };

  const formatPrice = (usdPrice: number) => {
    const { symbol, rate } = CURRENCY_RATES[currency];
    const converted = Math.round(usdPrice * rate);
    if (currency === 'JPY') {
      return `${symbol}${converted.toLocaleString()}`;
    }
    return `${symbol}${converted.toLocaleString()}`;
  };

  const addVipPoints = (points: number) => {
    setVipPoints((prev) => prev + points);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CommerceContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        toggleCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isSearchOpen,
        setIsSearchOpen,
        currency,
        setCurrency,
        formatPrice,
        vipPoints,
        addVipPoints
      }}
    >
      {children}
    </CommerceContext.Provider>
  );
};

export const useCommerce = (): CommerceContextType => {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error('useCommerce must be used within a CommerceProvider');
  }
  return context;
};
