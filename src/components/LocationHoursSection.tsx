import React from 'react';
import { MapPin, Clock, Phone, Mail, Wifi, Car, ShieldCheck, ExternalLink, Compass } from 'lucide-react';
import { CAFE_INFO } from '../data/coffeeData';

export const LocationHoursSection: React.FC = () => {
  return (
    <section id="location" className="py-20 relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-semibold tracking-widest text-[#F59E0B] uppercase px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md inline-block">
            Visit Our Roastery
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FDFBF7]">
            Location & Hours
          </h2>
          <p className="text-sm text-stone-300">
            Located in the heart of the Historic Roastery District. Come for the espresso, stay for the warmth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Hours & Contact Box */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            {/* Opening Hours */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <Clock className="w-5 h-5 text-[#F59E0B]" />
                <span>Operating Hours</span>
              </h3>
              <div className="space-y-2 text-xs">
                {CAFE_INFO.hours.map((h, i) => (
                  <div key={i} className="flex justify-between items-center py-1 text-stone-300">
                    <span className="font-semibold text-white">{h.days}</span>
                    <span className="text-[#F59E0B] font-medium">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Contact */}
            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <MapPin className="w-5 h-5 text-[#F59E0B]" />
                <span>Address & Contact</span>
              </h3>
              <div className="space-y-2.5 text-xs text-stone-300">
                <p className="flex items-start gap-2">
                  <Compass className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                  <span>{CAFE_INFO.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>{CAFE_INFO.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>{CAFE_INFO.email}</span>
                </p>
              </div>
            </div>

            {/* Cafe Amenities */}
            <div className="pt-2">
              <h4 className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-3">
                Cafe Amenities
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-stone-200">
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <Wifi className="w-4 h-4 text-[#F59E0B]" />
                  <span>500Mbps WiFi</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <Car className="w-4 h-4 text-[#F59E0B]" />
                  <span>Free Guest Parking</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
                  <span>Pet-Friendly Patio</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <Clock className="w-4 h-4 text-[#F59E0B]" />
                  <span>Power Outlets</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Styled Map Preview Box */}
          <div className="lg:col-span-7 glass-panel rounded-2xl overflow-hidden shadow-xl flex flex-col h-full min-h-[380px]">
            <div className="relative flex-1 p-6 flex flex-col justify-between overflow-hidden group">
              {/* Decorative Map Grid pattern */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-[#F59E0B] border border-amber-500/30 text-xs font-bold backdrop-blur-md">
                  Historic Roastery District
                </span>
                <span className="text-xs text-stone-300">15 mins from Downtown</span>
              </div>

              {/* Center Map Pin Card */}
              <div className="relative z-10 my-auto text-center space-y-3 py-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#D97706] to-[#F59E0B] text-white flex items-center justify-center mx-auto shadow-2xl shadow-[#D97706]/50 animate-bounce border border-white/30">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-white text-lg">Artisan Coffee House</h4>
                  <p className="text-xs text-stone-300">{CAFE_INFO.address}</p>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(CAFE_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D97706] to-[#C2410C] hover:shadow-lg text-white text-xs font-semibold transition-all shadow-md border border-white/20"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="relative z-10 text-xs text-stone-300 border-t border-white/10 pt-3 flex justify-between">
                <span>Nearby Landmark: Old Brick Square</span>
                <span>Valet & Street Parking Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
