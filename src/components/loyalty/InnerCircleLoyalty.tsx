import React from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { useSound } from '../../context/SoundContext';
import { Crown, Sparkles, Award, Key, Gem, ArrowUpRight } from 'lucide-react';

export const InnerCircleLoyalty: React.FC = () => {
  const { vipPoints, formatPrice } = useCommerce();
  const { playHover, playClick } = useSound();

  // Tier logic: PRIVATE (< 2000), BLACK (2000 - 5000), SIGNATURE (> 5000)
  const currentTier =
    vipPoints >= 5000 ? 'SIGNATURE' : vipPoints >= 2000 ? 'BLACK' : 'PRIVATE';

  const progressPercent = Math.min(100, Math.round((vipPoints / 5000) * 100));

  const TIERS = [
    {
      name: 'PRIVATE',
      threshold: 'ENTRY / $0+',
      perks: [
        'Curated Seasonal Lookbooks',
        'Complimentary Global Express Courier',
        'Priority Access to Permanent Archive'
      ],
      color: '#8E9094'
    },
    {
      name: 'BLACK',
      threshold: 'ELEVATED / $2,000+ ACCRUED',
      perks: [
        'Dedicated Atelier Personal Stylist',
        'Complimentary In-House Bespoke Alterations',
        '48-Hour Early Access to Limited Capsule Drops',
        'Private Salon Champagne Fitting Services'
      ],
      color: '#C5A880'
    },
    {
      name: 'SIGNATURE',
      threshold: 'SOVEREIGN / $5,000+ ACCRUED',
      perks: [
        'Invitation to Paris & Milan Runway Presentations',
        'Made-to-Measure Bespoke Commission Access',
        'Direct Private WhatsApp Concierge Line',
        'Annual Commemorative Atelier Gift Box'
      ],
      color: '#FFFFFF'
    }
  ];

  return (
    <section id="loyalty" className="relative w-full py-28 px-6 sm:px-12 md:px-16 bg-obsidian border-t border-white/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-champagne/[0.02] blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-[0.3em] text-champagne uppercase mb-3">
          <Crown size={14} />
          <span>SARTORIAL PATRONAGE ECOSYSTEM</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory tracking-tight uppercase">
          THE INNER CIRCLE
        </h2>
        <p className="font-sans text-xs sm:text-sm text-titanium mt-3 max-w-xl mx-auto font-light leading-relaxed">
          An elevated fellowship reserved for connoisseurs of architectural menswear. Tier privileges ascend seamlessly with every commission.
        </p>
      </div>

      {/* Patron Status Card & Progress */}
      <div className="max-w-5xl mx-auto mb-16 bg-noir border border-champagne/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-6 mb-8 gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-champagne uppercase block mb-1">
              CURRENT PATRON STATUS
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-ivory uppercase tracking-wider flex items-center gap-3">
              <span>TIER: {currentTier}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-champagne animate-pulse" />
            </h3>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-mono text-titanium uppercase block">
              ACCRUED PATRONAGE CREDITS
            </span>
            <span className="font-mono text-2xl sm:text-3xl text-champagne tracking-widest">
              {vipPoints.toLocaleString()} PTS
            </span>
          </div>
        </div>

        {/* Progress Bar towards next tier */}
        <div className="mb-4">
          <div className="flex justify-between items-center text-xs font-mono text-titanium mb-2">
            <span>PROGRESSION TOWARDS SIGNATURE SOVEREIGN TIER</span>
            <span className="text-champagne font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-charcoal overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-titanium via-champagne to-ivory transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <p className="font-mono text-[11px] text-titanium/80">
          * Earn 10 Patronage Credits per $1 on all ready-to-wear and bespoke commissions.
        </p>
      </div>

      {/* Tier Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {TIERS.map((tier) => {
          const isCurrent = currentTier === tier.name;
          return (
            <div
              key={tier.name}
              onMouseEnter={playHover}
              className={`p-8 border transition-all flex flex-col justify-between ${
                isCurrent
                  ? 'bg-charcoal border-champagne shadow-2xl scale-102'
                  : 'bg-noir/70 border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-xs text-champagne tracking-widest uppercase">
                    {tier.name}
                  </span>
                  {isCurrent && (
                    <span className="font-mono text-[9px] bg-champagne text-obsidian px-2 py-0.5 font-bold uppercase tracking-widest">
                      ACTIVE TIER
                    </span>
                  )}
                </div>

                <h4 className="font-serif text-2xl text-ivory uppercase mb-2">
                  {tier.name} CIRCLE
                </h4>
                <p className="font-mono text-[11px] text-titanium mb-6">
                  {tier.threshold}
                </p>

                <ul className="space-y-3 pt-4 border-t border-white/10 text-xs text-titanium/90 font-light">
                  {tier.perks.map((p, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <span className="text-champagne mt-0.5">•</span>
                      <span className="leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={playClick}
                  data-cursor="INQUIRE"
                  className="w-full py-3 border border-white/20 hover:border-champagne text-ivory hover:text-champagne text-xs font-mono tracking-widest uppercase transition-colors flex items-center justify-center space-x-2"
                >
                  <span>TIER INQUIRY</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
