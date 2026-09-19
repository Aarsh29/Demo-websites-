import React from 'react';
import { X, ArrowUpRight, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { useSound } from '../../context/SoundContext';
import { useTheme } from '../../context/ThemeContext';

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export const FullScreenMenu: React.FC<FullScreenMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { playHover, playClick, isMuted, toggleMute } = useSound();
  const { theme, toggleTheme } = useSound() ? useTheme() : { theme: 'dark', toggleTheme: () => {} };

  if (!isOpen) return null;

  const NAV_LINKS = [
    { label: 'THE COLLECTION', id: 'collection', sub: '01 — 06 Architectural Pieces' },
    { label: '3D GALLERY', id: 'gallery', sub: '360° Interactive Turntable' },
    { label: 'TRANSFORMATION', id: 'comparison', sub: 'Before & After Contrast' },
    { label: 'AI STYLE STUDIO', id: 'style-studio', sub: 'Bespoke AI Consultation' },
    { label: 'LOOK BUILDER', id: 'look-builder', sub: 'Digital Styling Canvas' },
    { label: 'PRECISION FIT', id: 'size-guide', sub: 'Smart Silhouette Calculator' },
    { label: 'TRENDING EDIT', id: 'trending', sub: 'Seasonal Runway Highlights' },
    { label: 'FLAGSHIP STORES', id: 'stores', sub: 'Paris, Milan, Tokyo, NY' },
    { label: 'INNER CIRCLE VIP', id: 'loyalty', sub: 'Exclusive Membership Tier' },
  ];

  const handleLinkClick = (id: string) => {
    playClick();
    onNavigate(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9000] bg-obsidian/95 dark:bg-obsidian/98 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-14 animate-fadeIn">
      {/* Top Header inside Menu */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <span className="font-serif tracking-[0.3em] text-lg uppercase text-ivory">
          ATELIER ARSATH
        </span>

        <div className="flex items-center space-x-6">
          <button
            onClick={toggleMute}
            className="text-xs uppercase tracking-widest text-titanium hover:text-ivory flex items-center gap-2 transition-colors"
            title="Toggle Ambient Audio"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span className="hidden sm:inline font-mono">{isMuted ? 'Muted' : 'Audio On'}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="text-xs uppercase tracking-widest text-titanium hover:text-ivory flex items-center gap-2 transition-colors"
            title="Toggle Light / Dark Mode"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            data-cursor="CLOSE"
            className="p-2 text-ivory hover:text-champagne transition-colors rounded-full border border-white/10 hover:border-champagne/40"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Main Navigation Links */}
      <div className="my-auto py-8 grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-12 max-h-[70vh] overflow-y-auto pr-4">
        {NAV_LINKS.map((item, idx) => (
          <div
            key={item.id}
            onMouseEnter={playHover}
            onClick={() => handleLinkClick(item.id)}
            data-cursor="ENTER"
            className="group cursor-pointer py-3 border-b border-white/5 hover:border-champagne/40 transition-all flex items-baseline justify-between"
          >
            <div className="flex items-baseline space-x-4">
              <span className="font-mono text-xs text-titanium/60 group-hover:text-champagne transition-colors">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivory group-hover:text-champagne transition-colors group-hover:translate-x-2 duration-300">
                  {item.label}
                </h3>
                <p className="text-xs text-titanium tracking-widest font-sans mt-0.5">
                  {item.sub}
                </p>
              </div>
            </div>
            <ArrowUpRight
              size={20}
              className="text-titanium opacity-0 group-hover:opacity-100 group-hover:text-champagne transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
            />
          </div>
        ))}
      </div>

      {/* Footer Info inside Menu */}
      <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center text-xs tracking-widest text-titanium font-mono gap-4">
        <div className="flex space-x-6">
          <span>PARIS • 242 RUE SAINT-HONORÉ</span>
          <span className="hidden sm:inline">MILAN • VIA MONTENAPOLEONE 8</span>
          <span className="hidden lg:inline">TOKYO • GINZA TOWER</span>
        </div>
        <div className="flex space-x-6 text-ivory">
          <a href="#instagram" className="hover:text-champagne transition-colors">INSTAGRAM</a>
          <a href="#editorial" className="hover:text-champagne transition-colors">LOOKBOOK</a>
          <a href="#concierge" className="hover:text-champagne transition-colors">CONCIERGE</a>
        </div>
      </div>
    </div>
  );
};
