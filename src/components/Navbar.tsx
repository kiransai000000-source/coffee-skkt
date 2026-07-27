import React, { useState, useEffect } from 'react';
import { Coffee, CalendarCheck, ShoppingBag, Menu as MenuIcon, X, MapPin, Clock } from 'lucide-react';
import { BookingRequest } from '../types';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenReservations: () => void;
  onOpenCart: () => void;
  activeReservationsCount: number;
  cartItemCount: number;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenReservations,
  onOpenCart,
  activeReservationsCount,
  cartItemCount,
  activeSection,
  setActiveSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'menu', label: 'Menu & Brews' },
    { id: 'booking', label: 'Book a Table' },
    { id: 'about', label: 'Our Craft' },
    { id: 'location', label: 'Visit Us' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#12100E]/70 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-black/40'
          : 'bg-gradient-to-b from-[#12100E]/80 via-[#12100E]/40 to-transparent py-5 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 group text-left focus:outline-none"
            id="nav-logo-btn"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D97706] to-[#B45309] flex items-center justify-center text-white shadow-lg shadow-[#D97706]/25 group-hover:scale-105 transition-transform border border-white/20">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#FDFBF7] block">
                Artisan
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#F59E0B] font-medium block -mt-1">
                Coffee House
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 shadow-lg">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === link.id
                    ? 'bg-[#D97706] text-white shadow-md shadow-[#D97706]/30'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
                id={`nav-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* My Reservations Lookup */}
            <button
              onClick={onOpenReservations}
              className="relative p-2.5 sm:px-3.5 sm:py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-stone-200 hover:text-white hover:bg-white/15 hover:border-amber-500/40 transition-all flex items-center gap-2 text-xs font-medium shadow-sm"
              title="View Active Reservations"
              id="nav-reservations-btn"
            >
              <CalendarCheck className="w-4 h-4 text-[#F59E0B]" />
              <span className="hidden sm:inline">Bookings</span>
              {activeReservationsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D97706] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#12100E] animate-pulse">
                  {activeReservationsCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 sm:px-3.5 sm:py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-stone-200 hover:text-white hover:bg-white/15 hover:border-amber-500/40 transition-all flex items-center gap-2 text-xs font-medium shadow-sm"
              title="View Order Cart"
              id="nav-cart-btn"
            >
              <ShoppingBag className="w-4 h-4 text-[#F59E0B]" />
              <span className="hidden sm:inline">Order</span>
              {cartItemCount > 0 && (
                <span className="bg-[#D97706] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Book Table Primary CTA */}
            <button
              onClick={onOpenBooking}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D97706] to-[#C2410C] text-white text-xs font-semibold hover:shadow-lg hover:shadow-[#D97706]/30 hover:scale-[1.02] active:scale-[0.98] transition-all border border-white/20"
              id="nav-cta-book-btn"
            >
              <span>Book a Table</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-stone-200 hover:text-white"
              id="nav-mobile-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-[#181412]/90 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSection === link.id
                    ? 'bg-[#D97706] text-white'
                    : 'text-stone-300 hover:bg-white/10'
                }`}
                id={`mobile-nav-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D97706] to-[#C2410C] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg border border-white/20"
                id="mobile-nav-book-btn"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Reserve a Table Now</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
