import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Heart, Menu, Volume2, VolumeX, Sun, Moon } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { useSound } from '../../context/SoundContext';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  onOpenMenu: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMenu, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, toggleCart, wishlist, setIsWishlistOpen, setIsSearchOpen } = useCommerce();
  const { playHover, playClick, isMuted, toggleMute } = useSound();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    playClick();
    onNavigate(sectionId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[8000] transition-all duration-700 ease-luxury ${
        isScrolled
          ? 'py-3.5 px-4 sm:px-8'
          : 'py-6 px-6 sm:px-12'
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-700 ${
          isScrolled
            ? 'bg-obsidian/80 dark:bg-obsidian/85 backdrop-blur-xl border border-white/10 dark:border-white/10 py-3 px-6 rounded-full shadow-2xl'
            : 'bg-transparent border-b border-white/10 pb-4'
        }`}
      >
        {/* Left: Brand Logo */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleNavClick('hero')}
            onMouseEnter={playHover}
            data-cursor="HOME"
            className="text-left group"
          >
            <span className="font-serif text-lg sm:text-xl tracking-[0.3em] uppercase text-ivory font-medium transition-colors group-hover:text-champagne">
              ATELIER ARSATH
            </span>
            <span className="hidden md:block text-[9px] font-mono tracking-[0.35em] text-titanium uppercase">
              HAUTE MENSWEAR
            </span>
          </button>
        </div>

        {/* Center: Editorial Links (Desktop) */}
        <div className="hidden lg:flex items-center space-x-10 text-xs tracking-[0.25em] font-sans uppercase font-medium">
          <button
            onClick={() => handleNavClick('collection')}
            onMouseEnter={playHover}
            data-cursor="EXPLORE"
            className="text-ivory/80 hover:text-champagne transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-champagne hover:after:w-full after:transition-all after:duration-300"
          >
            COLLECTION
          </button>
          <button
            onClick={() => handleNavClick('style-studio')}
            onMouseEnter={playHover}
            data-cursor="STUDIO"
            className="text-ivory/80 hover:text-champagne transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-champagne hover:after:w-full after:transition-all after:duration-300"
          >
            AI STUDIO
          </button>
          <button
            onClick={() => handleNavClick('look-builder')}
            onMouseEnter={playHover}
            data-cursor="BUILDER"
            className="text-ivory/80 hover:text-champagne transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-champagne hover:after:w-full after:transition-all after:duration-300"
          >
            LOOK BUILDER
          </button>
          <button
            onClick={() => handleNavClick('gallery')}
            onMouseEnter={playHover}
            data-cursor="3D"
            className="text-ivory/80 hover:text-champagne transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-champagne hover:after:w-full after:transition-all after:duration-300"
          >
            WORLD
          </button>
          <button
            onClick={() => handleNavClick('stores')}
            onMouseEnter={playHover}
            data-cursor="BOUTIQUES"
            className="text-ivory/80 hover:text-champagne transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-champagne hover:after:w-full after:transition-all after:duration-300"
          >
            STORES
          </button>
        </div>

        {/* Right: Actions & Micro-Controls */}
        <div className="flex items-center space-x-4 sm:space-x-6 text-xs uppercase tracking-widest font-mono">
          {/* Sound Mute Toggle */}
          <button
            onClick={toggleMute}
            onMouseEnter={playHover}
            className="text-titanium hover:text-ivory transition-colors p-1"
            title={isMuted ? 'Unmute Atmosphere' : 'Mute Atmosphere'}
          >
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            onMouseEnter={playHover}
            className="text-titanium hover:text-ivory transition-colors p-1"
            title={theme === 'dark' ? 'Light Atmosphere' : 'Dark Atmosphere'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => {
              playClick();
              setIsSearchOpen(true);
            }}
            onMouseEnter={playHover}
            data-cursor="SEARCH"
            className="text-ivory/90 hover:text-champagne transition-colors p-1 flex items-center gap-1.5"
            title="Search Catalogue"
          >
            <Search size={17} />
            <span className="hidden xl:inline text-[11px]">SEARCH</span>
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={() => {
              playClick();
              setIsWishlistOpen(true);
            }}
            onMouseEnter={playHover}
            data-cursor="SAVED"
            className="text-ivory/90 hover:text-champagne transition-colors relative p-1"
            title="Wishlist"
          >
            <Heart size={17} className={wishlist.length > 0 ? 'fill-champagne text-champagne' : ''} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-champagne text-obsidian font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag Drawer Trigger */}
          <button
            onClick={toggleCart}
            onMouseEnter={playHover}
            data-cursor="BAG"
            className="text-ivory hover:text-champagne transition-colors relative p-1 flex items-center gap-2 border-l border-white/10 pl-3 sm:pl-5"
          >
            <ShoppingBag size={18} />
            <span className="hidden sm:inline text-[11px] font-sans font-medium">BAG</span>
            {cartCount > 0 && (
              <span className="bg-champagne text-obsidian font-bold text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Menu Hamburger */}
          <button
            onClick={() => {
              playClick();
              onOpenMenu();
            }}
            onMouseEnter={playHover}
            data-cursor="MENU"
            className="p-1 text-ivory hover:text-champagne transition-colors ml-1"
            title="Open Menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>
    </header>
  );
};
