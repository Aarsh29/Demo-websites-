import React, { useState } from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { useSound } from '../../context/SoundContext';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, Volume2, VolumeX, Sun, Moon, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { currency, setCurrency } = useCommerce();
  const { isMuted, toggleMute, playClick } = useSound();
  const { theme, toggleTheme } = useTheme();

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="relative w-full bg-obsidian text-ivory border-t border-white/10 pt-24 pb-12 px-6 sm:px-12 md:px-16 overflow-hidden">
      {/* Top Editorial Monogram & Newsletter */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
        <div className="lg:col-span-6">
          <span className="text-[10px] font-mono tracking-[0.35em] text-champagne uppercase block mb-3">
            THE ATELIER MANIFESTO
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider mb-6">
            LUXURY THROUGH RESTRAINT.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-titanium leading-relaxed font-light max-w-md">
            We reject ephemeral fashion cycles. Every piece is an immutable architectural study cut from noble materials in Civitanova Marche and Yorkshire.
          </p>
        </div>

        {/* Newsletter Subscription */}
        <div className="lg:col-span-6 flex flex-col justify-end">
          <span className="text-[10px] font-mono tracking-[0.3em] text-champagne uppercase block mb-3">
            ARCHIVAL DISPATCHES & RUNWAY INVITATIONS
          </span>
          {subscribed ? (
            <div className="p-4 bg-charcoal border border-champagne flex items-center space-x-3 text-xs font-mono text-champagne">
              <Check size={16} />
              <span>YOUR EMAIL HAS BEEN ENTERED INTO THE PRIVATE ARCHIVE REGISTRY.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex border-b border-white/20 pb-2">
              <input
                type="email"
                required
                placeholder="ENTER YOUR CONCIERGE EMAIL..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-xs font-mono tracking-widest text-ivory placeholder-titanium/50 focus:outline-none uppercase"
              />
              <button
                type="submit"
                data-cursor="JOIN"
                className="text-xs font-mono tracking-widest text-champagne uppercase hover:text-ivory transition-colors flex items-center gap-1 shrink-0 ml-4"
              >
                <span>REQUEST ACCESS</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}
          <p className="text-[10px] font-mono text-titanium/60 mt-3">
            Dispatched quarterly. Zero superfluous promotional correspondence.
          </p>
        </div>
      </div>

      {/* Directory Columns */}
      <div className="max-w-7xl mx-auto py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-mono tracking-widest border-b border-white/10">
        <div>
          <span className="text-champagne uppercase block mb-4">ARCHIVE</span>
          <ul className="space-y-2.5 text-titanium">
            <li><a href="#collection" className="hover:text-ivory transition-colors">THE SIGNATURE SHIRT</a></li>
            <li><a href="#collection" className="hover:text-ivory transition-colors">THE ARCHITECT BLAZER</a></li>
            <li><a href="#collection" className="hover:text-ivory transition-colors">THE MONOLITH SNEAKER</a></li>
            <li><a href="#collection" className="hover:text-ivory transition-colors">THE ESSENTIAL TROUSER</a></li>
            <li><a href="#collection" className="hover:text-ivory transition-colors">THE NOIR CHRONOGRAPH</a></li>
          </ul>
        </div>

        <div>
          <span className="text-champagne uppercase block mb-4">DIGITAL STUDIOS</span>
          <ul className="space-y-2.5 text-titanium">
            <li><a href="#style-studio" className="hover:text-ivory transition-colors">AI STYLE STUDIO</a></li>
            <li><a href="#look-builder" className="hover:text-ivory transition-colors">LOOK BUILDER</a></li>
            <li><a href="#size-guide" className="hover:text-ivory transition-colors">SMART PRECISION FIT</a></li>
            <li><a href="#comparison" className="hover:text-ivory transition-colors">TRANSFORMATION MATRIX</a></li>
            <li><a href="#gallery" className="hover:text-ivory transition-colors">360° TURNTABLE</a></li>
          </ul>
        </div>

        <div>
          <span className="text-champagne uppercase block mb-4">FLAGSHIPS</span>
          <ul className="space-y-2.5 text-titanium">
            <li><a href="#stores" className="hover:text-ivory transition-colors">PARIS SAINT-HONORÉ</a></li>
            <li><a href="#stores" className="hover:text-ivory transition-colors">MILAN MONTENAPOLEONE</a></li>
            <li><a href="#stores" className="hover:text-ivory transition-colors">NEW YORK MADISON</a></li>
            <li><a href="#stores" className="hover:text-ivory transition-colors">TOKYO GINZA TOWER</a></li>
            <li><a href="#stores" className="hover:text-ivory transition-colors">LONDON MAYFAIR</a></li>
          </ul>
        </div>

        <div>
          <span className="text-champagne uppercase block mb-4">CURRENCY & ATMOSPHERE</span>
          <div className="space-y-4 text-titanium">
            <div>
              <span className="text-[10px] text-titanium/60 block mb-1">CURRENCY</span>
              <div className="flex space-x-2">
                {(['USD', 'EUR', 'GBP', 'JPY'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      playClick();
                      setCurrency(curr);
                    }}
                    className={`px-2 py-1 text-[10px] border transition-colors ${
                      currency === curr
                        ? 'border-champagne text-champagne bg-champagne/10 font-bold'
                        : 'border-white/10 hover:border-white/30 text-titanium'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-titanium/60 block mb-1">ATMOSPHERE</span>
              <div className="flex space-x-3 text-xs">
                <button
                  onClick={toggleMute}
                  className="flex items-center space-x-1.5 hover:text-ivory transition-colors"
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  <span>{isMuted ? 'UNMUTE' : 'AUDIO ON'}</span>
                </button>
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-1.5 hover:text-ivory transition-colors"
                >
                  {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                  <span>{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Imprint & Legal */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-titanium/60 tracking-widest gap-4">
        <div>
          <span>© 2026 ATELIER ARSATH HAUTE MENSWEAR. ALL RIGHTS RESERVED.</span>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-champagne transition-colors">PRIVACY POLICY</a>
          <a href="#" className="hover:text-champagne transition-colors">BESPOKE TERMS</a>
          <a href="#" className="hover:text-champagne transition-colors">SUSTAINABILITY CHARTER</a>
          <a href="#" className="hover:text-champagne transition-colors">LEGAL NOTICE</a>
        </div>
      </div>
    </footer>
  );
};
