import React from 'react';
import { Coffee, Flame, Heart, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { ASSET_IMAGES } from '../data/coffeeData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 relative text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
              <img
                src={ASSET_IMAGES.latteArt}
                alt="Barista creating intricate latte art"
                className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-xs space-y-1 shadow-lg">
                <div className="flex items-center gap-2 font-bold text-white">
                  <Flame className="w-4 h-4 text-[#F59E0B]" />
                  <span>In-House Micro Roasting</span>
                </div>
                <p className="text-stone-200">
                  We roast small batches three times a week to guarantee peak aroma and velvety crema.
                </p>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-4 hidden sm:flex items-center gap-3 bg-white/10 border border-white/20 p-4 rounded-2xl shadow-2xl backdrop-blur-xl">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[#F59E0B]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-serif font-bold text-white text-sm">Award-Winning</span>
                <span className="text-[11px] text-stone-300">Best Specialty Roastery 2025</span>
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-widest text-[#F59E0B] uppercase px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md inline-block">
                Our Story & Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FDFBF7] leading-tight">
                Driven by Passion, Bound by Community
              </h2>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed">
              Artisan Coffee House began with a simple belief: coffee isn't just a morning routine — it's a mindful ritual. We partner directly with sustainable high-altitude farms across Ethiopia, Colombia, and Guatemala, ensuring fair compensation and exceptional crop quality.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="glass-card p-4 rounded-xl space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[#F59E0B]">
                  <Heart className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-bold text-white text-sm">Direct Trade Beans</h3>
                <p className="text-xs text-stone-300">
                  100% ethically sourced single-origin arabica beans bought directly from family cooperatives.
                </p>
              </div>

              <div className="glass-card p-4 rounded-xl space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[#F59E0B]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-serif font-bold text-white text-sm">Artisanal Bakery</h3>
                <p className="text-xs text-stone-300">
                  French croissants and sourdough toasts rolled and baked in our kitchen before dawn every morning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
