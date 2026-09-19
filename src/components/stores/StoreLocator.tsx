import React, { useState } from 'react';
import { STORES } from '../../data/storesData';
import { Store } from '../../types';
import { useSound } from '../../context/SoundContext';
import { MapPin, Clock, Phone, Mail, Car, Calendar, Compass, ExternalLink, Check } from 'lucide-react';

export const StoreLocator: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState<Store>(STORES[0]); // Paris default
  const [searchQuery, setSearchQuery] = useState('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDate, setBookingDate] = useState('2026-10-15');
  const [bookingTime, setBookingTime] = useState('14:00');

  const { playClick, playHover, playSuccess } = useSound();

  const filteredStores = STORES.filter(
    (s) =>
      s.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccess();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setIsBookingOpen(false);
    }, 2500);
  };

  return (
    <section id="stores" className="relative w-full py-28 px-6 sm:px-12 md:px-16 bg-noir border-t border-white/10 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono tracking-[0.3em] text-champagne uppercase mb-2">
            <Compass size={14} />
            <span>GLOBAL FLAGSHIPS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory tracking-tight uppercase">
            FIND YOUR WORLD.
          </h2>
        </div>
        <div className="text-left md:text-right">
          <span className="font-mono text-xs text-titanium uppercase block">
            PRIVATE ATELIER CONSULTATIONS
          </span>
          <span className="font-sans text-xs text-titanium/70">
            PARIS • MILAN • NEW YORK • TOKYO • LONDON
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Store Directory & Search (Cols 1-5) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          {/* Search bar */}
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="Search by city or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-charcoal border border-white/10 py-3.5 px-4 text-xs font-mono tracking-widest text-ivory placeholder-titanium/60 focus:outline-none focus:border-champagne"
            />
          </div>

          {/* List of Flagships */}
          <div className="space-y-3 max-h-[560px] overflow-y-auto pr-2">
            {filteredStores.map((store) => {
              const isSelected = selectedStore.id === store.id;
              return (
                <div
                  key={store.id}
                  onClick={() => {
                    playClick();
                    setSelectedStore(store);
                  }}
                  onMouseEnter={playHover}
                  data-cursor="SELECT"
                  className={`p-5 border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-champagne bg-charcoal shadow-xl'
                      : 'border-white/5 bg-obsidian/70 hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-[10px] tracking-widest text-champagne uppercase">
                      {store.country}
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 border border-emerald-800/40">
                      {store.status}
                    </span>
                  </div>

                  <h4 className="font-serif text-xl text-ivory uppercase mb-1">
                    {store.name}
                  </h4>
                  <p className="font-sans text-xs text-titanium/80 line-clamp-1 font-light">
                    {store.address}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-titanium">
                    <span>{store.hours.split('•')[0]}</span>
                    {store.valetParking && (
                      <span className="flex items-center gap-1 text-champagne">
                        <Car size={12} /> VALET INCLUDED
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Store Showcase & Monochromatic Cartography (Cols 6-12) */}
        <div className="lg:col-span-7 bg-charcoal/80 border border-white/10 overflow-hidden shadow-2xl flex flex-col">
          {/* Visual Store Exterior Header Image */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-obsidian">
            <img
              src={selectedStore.image}
              alt={selectedStore.name}
              className="w-full h-full object-cover object-center filter contrast-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-black/30" />

            {/* Overlay Flagship Identity */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <span className="font-mono text-[10px] tracking-[0.3em] text-champagne uppercase block mb-1">
                  FLAGSHIP BOUTIQUE
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-ivory uppercase">
                  {selectedStore.city}
                </h3>
              </div>

              <div className="text-right">
                <span className="font-mono text-xs text-titanium/90 bg-obsidian/80 px-3 py-1.5 border border-white/10">
                  {selectedStore.coordinates[0]}° N, {selectedStore.coordinates[1]}° E
                </span>
              </div>
            </div>
          </div>

          {/* Boutique Details & Appointment CTA */}
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-titanium font-light">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-ivory font-mono text-[11px] uppercase">
                  <MapPin size={14} className="text-champagne shrink-0" />
                  <span>LOCATION</span>
                </div>
                <p className="pl-5 leading-relaxed">{selectedStore.address}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-ivory font-mono text-[11px] uppercase">
                  <Clock size={14} className="text-champagne shrink-0" />
                  <span>HOURS</span>
                </div>
                <p className="pl-5 leading-relaxed">{selectedStore.hours}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-ivory font-mono text-[11px] uppercase">
                  <Phone size={14} className="text-champagne shrink-0" />
                  <span>CONCIERGE TELEPHONE</span>
                </div>
                <p className="pl-5 font-mono">{selectedStore.phone}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-ivory font-mono text-[11px] uppercase">
                  <Mail size={14} className="text-champagne shrink-0" />
                  <span>DIRECT INQUIRIES</span>
                </div>
                <p className="pl-5 font-mono">{selectedStore.email}</p>
              </div>
            </div>

            {/* Actions: Book Private Styling / Live Directions */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  playClick();
                  setIsBookingOpen(true);
                }}
                data-cursor="APPOINTMENT"
                className="flex-1 bg-ivory hover:bg-champagne text-obsidian py-4 px-6 text-xs font-sans font-semibold tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-2xl"
              >
                <Calendar size={16} />
                <span>BOOK PRIVATE ATELIER APPOINTMENT</span>
              </button>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedStore.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="py-4 px-6 border border-white/20 hover:border-champagne text-ivory hover:text-champagne text-xs font-mono tracking-widest uppercase transition-colors flex items-center justify-center space-x-2"
              >
                <span>DIRECTIONS</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-[9500] bg-obsidian/90 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="bg-charcoal border border-champagne/40 max-w-lg w-full p-8 shadow-2xl relative animate-fadeIn">
            <h3 className="font-serif text-2xl text-ivory uppercase mb-2">
              RESERVE PRIVATE STYLING
            </h3>
            <p className="font-sans text-xs text-titanium mb-6 font-light">
              Atelier Arsath • {selectedStore.name}
            </p>

            {bookingSuccess ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-champagne text-obsidian flex items-center justify-center mx-auto">
                  <Check size={24} />
                </div>
                <h4 className="font-serif text-xl text-ivory uppercase">
                  APPOINTMENT CONFIRMED
                </h4>
                <p className="font-mono text-xs text-titanium">
                  A private styling concierge will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookAppointment} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-titanium uppercase mb-1">
                    DATE
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-obsidian border border-white/10 p-3 text-xs font-mono text-ivory focus:border-champagne focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-titanium uppercase mb-1">
                    PREFERRED TIME
                  </label>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full bg-obsidian border border-white/10 p-3 text-xs font-mono text-ivory focus:border-champagne focus:outline-none"
                  >
                    <option value="11:00">11:00 AM — Morning Private Salon</option>
                    <option value="14:00">02:00 PM — Midday Fitting</option>
                    <option value="17:00">05:00 PM — Twilight Bespoke Session</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-widest text-titanium uppercase mb-1">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Sterling"
                    className="w-full bg-obsidian border border-white/10 p-3 text-xs font-mono text-ivory focus:border-champagne focus:outline-none"
                  />
                </div>

                <div className="pt-4 flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsBookingOpen(false)}
                    className="flex-1 py-3 border border-white/10 text-xs font-mono text-titanium uppercase hover:text-ivory"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-champagne text-obsidian text-xs font-sans font-bold uppercase tracking-widest hover:bg-ivory transition-colors"
                  >
                    CONFIRM RESERVATION
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
