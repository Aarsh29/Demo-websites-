import React from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { useSound } from '../../context/SoundContext';
import { PRODUCTS } from '../../data/productsData';
import { Instagram, MapPin, Tag, ArrowUpRight } from 'lucide-react';

interface EditorialPost {
  id: string;
  image: string;
  caption: string;
  location: string;
  taggedProduct: string;
  category: 'RUNWAY' | 'BACKSTAGE' | 'STREET STYLE' | 'ATELIER';
  span: string;
}

const POSTS: EditorialPost[] = [
  {
    id: 'post-1',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
    caption: 'Backstage at Palais de Tokyo. Light tracing the pagoda lapel roll minutes before runway unveiling.',
    location: 'Paris, France',
    taggedProduct: 'THE ARCHITECT BLAZER',
    category: 'BACKSTAGE',
    span: 'lg:col-span-8 lg:row-span-2'
  },
  {
    id: 'post-2',
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=800&auto=format&fit=crop',
    caption: 'Movement study in Milan. Fresco trousers caught in fluid mid-stride.',
    location: 'Milano, Italy',
    taggedProduct: 'THE ESSENTIAL TROUSER',
    category: 'STREET STYLE',
    span: 'lg:col-span-4 lg:row-span-1'
  },
  {
    id: 'post-3',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
    caption: 'Double-faced cashmere draping against brutalist concrete architecture.',
    location: 'Tokyo, Japan',
    taggedProduct: 'THE FORMAL OVERCOAT',
    category: 'RUNWAY',
    span: 'lg:col-span-4 lg:row-span-1'
  },
  {
    id: 'post-4',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
    caption: 'Calibre AT-01 titanium casing inspected under 40x stereoscopic loupe.',
    location: 'Le Locle, Switzerland',
    taggedProduct: 'THE NOIR CHRONOGRAPH',
    category: 'ATELIER',
    span: 'lg:col-span-6 lg:row-span-1'
  },
  {
    id: 'post-5',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
    caption: 'Sculpted Vibram outsole and hand-lasted calfskin nappa on wet basalt stone.',
    location: 'New York, USA',
    taggedProduct: 'THE MONOLITH SNEAKER',
    category: 'STREET STYLE',
    span: 'lg:col-span-6 lg:row-span-1'
  }
];

export const EditorialCollage: React.FC = () => {
  const { openQuickView } = useCommerce();
  const { playHover, playClick } = useSound();

  const handleTagClick = (productName: string) => {
    playClick();
    const matched = PRODUCTS.find((p) => p.name === productName);
    if (matched) {
      openQuickView(matched);
    }
  };

  return (
    <section id="editorial" className="relative w-full py-28 px-6 sm:px-12 md:px-16 bg-obsidian border-t border-white/10 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono tracking-[0.3em] text-champagne uppercase mb-2">
            <Instagram size={14} />
            <span>THE VISUAL DIARY</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-ivory tracking-tight uppercase">
            ATELIER & ARCHIVE DISPATCHES
          </h2>
        </div>
        <div className="text-left md:text-right">
          <span className="font-mono text-xs tracking-widest text-titanium uppercase block">
            @ATELIER.ARSATH
          </span>
          <span className="font-sans text-xs text-titanium/70">
            Tagged by Patrons Worldwide
          </span>
        </div>
      </div>

      {/* Asymmetric Editorial Collage */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {POSTS.map((post) => (
          <div
            key={post.id}
            onMouseEnter={playHover}
            data-cursor="LOOKBOOK"
            className={`${post.span} group relative overflow-hidden bg-charcoal border border-white/10 aspect-[4/5] sm:aspect-auto min-h-[320px] lg:min-h-[380px] flex flex-col justify-end`}
          >
            {/* Image */}
            <img
              src={post.image}
              alt={post.caption}
              className="absolute inset-0 w-full h-full object-cover object-center filter grayscale-[30%] contrast-[1.08] group-hover:scale-105 group-hover:grayscale-0 transition-transform duration-1000 ease-luxury"
              loading="lazy"
            />
            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 via-obsidian/40 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

            {/* Top Category Tag */}
            <div className="absolute top-4 left-4 z-10 bg-obsidian/80 px-2.5 py-1 border border-white/10 font-mono text-[9px] tracking-widest text-champagne uppercase">
              {post.category}
            </div>

            {/* Hover Revealed Info & Tagged Product */}
            <div className="relative z-10 p-6 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-titanium mb-2">
                <MapPin size={12} className="text-champagne" />
                <span>{post.location}</span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-ivory/90 font-light leading-relaxed mb-4 max-w-lg">
                "{post.caption}"
              </p>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => handleTagClick(post.taggedProduct)}
                  className="flex items-center space-x-2 text-xs font-mono text-champagne uppercase tracking-widest hover:text-ivory transition-colors"
                >
                  <Tag size={13} />
                  <span>SHOP: {post.taggedProduct}</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
