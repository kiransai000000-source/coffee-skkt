import React, { useState } from 'react';
import { Coffee, Mail, Check, Instagram, Facebook, Twitter, Heart } from 'lucide-react';
import { CAFE_INFO } from '../data/coffeeData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-black/40 backdrop-blur-xl border-t border-white/10 text-stone-300 text-left pt-16 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#D97706] to-[#F59E0B] flex items-center justify-center text-white font-bold shadow-lg shadow-amber-500/20 border border-white/20">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white block">Artisan</span>
                <span className="text-[10px] tracking-widest uppercase text-[#F59E0B] font-medium block -mt-1">
                  Coffee House
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-300 max-w-sm leading-relaxed">
              Serving single-origin roasts, organic botanical teas, and handcrafted morning pastries in a sunlit warm atmosphere.
            </p>
            <div className="flex items-center gap-3 text-stone-300">
              <a href="#instagram" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-amber-500/40 hover:text-[#F59E0B] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-amber-500/40 hover:text-[#F59E0B] transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-amber-500/40 hover:text-[#F59E0B] transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-white text-sm">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-[#F59E0B] transition-colors">Menu & Brews</a>
              </li>
              <li>
                <a href="#booking" className="hover:text-[#F59E0B] transition-colors">Reserve a Table</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#F59E0B] transition-colors">Our Roasting Craft</a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#F59E0B] transition-colors">Hours & Location</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-white text-sm">Roastery Tasting Club</h4>
            <p className="text-xs text-stone-300">
              Subscribe for invitations to private coffee cupping sessions, new seasonal roast drops, and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-3.5 py-2 glass-input rounded-xl text-xs text-white placeholder-stone-400 focus:outline-none flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#D97706] to-[#C2410C] border border-white/20 text-white text-xs font-semibold rounded-xl transition-all shadow-md hover:shadow-amber-500/20"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : 'Join'}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400">Thank you for joining our Tasting Club!</p>
              )}
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Artisan Coffee House. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
            <span>for coffee lovers everywhere.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
