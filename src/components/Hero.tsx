import React from 'react';
import { Coffee, Calendar, MapPin, Clock, ArrowRight, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { ASSET_IMAGES, CAFE_INFO } from '../data/coffeeData';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreMenu }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Hero Image with Deep Warm Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSET_IMAGES.heroBg}
          alt="Artisan Coffee House interior"
          className="w-full h-full object-cover object-center scale-105 filter contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12100E]/95 via-[#12100E]/85 to-[#12100E]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-transparent to-[#12100E]/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-lg">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-xs font-semibold text-[#FDFBF7] tracking-wide uppercase">
                Ethically Sourced • Roasted Fresh Daily
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FDFBF7] leading-[1.15]">
              Where Every Sip Feels Like <span className="italic text-[#F59E0B] font-normal drop-shadow-md">Home.</span>
            </h1>

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed font-normal">
              Step inside for micro-batch single origin roasts, handcrafted pastries, and a serene sunlit atmosphere. Reserve your favorite corner or pre-order your morning brew effortlessly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#D97706] to-[#C2410C] text-white font-semibold text-sm sm:text-base shadow-xl shadow-[#D97706]/30 hover:shadow-2xl hover:shadow-[#D97706]/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group border border-white/20"
                id="hero-book-btn"
              >
                <Calendar className="w-5 h-5" />
                <span>Reserve a Table</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreMenu}
                className="px-7 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-amber-500/50 text-[#FDFBF7] font-medium text-sm sm:text-base hover:bg-white/15 transition-all flex items-center justify-center gap-2 shadow-lg"
                id="hero-menu-btn"
              >
                <Coffee className="w-5 h-5 text-[#F59E0B]" />
                <span>Explore Menu</span>
              </button>
            </div>

            {/* Quick Status / Operating Info */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-stone-300">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm p-2.5 rounded-xl border border-white/10">
                <Clock className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <div>
                  <span className="block font-semibold text-[#FDFBF7]">Open Daily</span>
                  <span>7:00 AM – 8:00 PM</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm p-2.5 rounded-xl border border-white/10">
                <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <div>
                  <span className="block font-semibold text-[#FDFBF7]">428 Timberland Ave</span>
                  <span>Historic District</span>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2 bg-white/5 backdrop-blur-sm p-2.5 rounded-xl border border-white/10">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <div>
                  <span className="block font-semibold text-[#FDFBF7]">4.9 / 5.0 Rating</span>
                  <span>500+ Guest Reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card / Visual Accent */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative rounded-2xl p-0.5 bg-gradient-to-b from-amber-500/30 via-white/15 to-transparent shadow-2xl backdrop-blur-xl">
              <div className="bg-[#181412]/80 backdrop-blur-2xl rounded-2xl p-6 space-y-5 border border-white/15">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[#F59E0B]">
                      <Coffee className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-[#FDFBF7] text-base">Today's Special Roast</h3>
                      <p className="text-xs text-stone-300">Ethiopian Yirgacheffe • Light Roast</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/20 text-[#F59E0B] border border-amber-500/30 shadow-sm">
                    Fresh Batch
                  </span>
                </div>

                <div className="relative rounded-xl overflow-hidden h-44 group border border-white/10">
                  <img
                    src={ASSET_IMAGES.latteArt}
                    alt="Handcrafted Latte Art"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4">
                    <p className="text-xs text-stone-200 font-light">
                      Notes of floral jasmine, bergamot citrus, and honeyed finish.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-xl p-3.5 border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-stone-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Instant Table Booking Confirmation</span>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    className="text-[#F59E0B] hover:text-amber-300 font-semibold text-xs flex items-center gap-1"
                  >
                    <span>Reserve</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
