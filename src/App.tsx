import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { BookingSection } from './components/BookingSection';
import { CustomizerModal } from './components/CustomizerModal';
import { MyReservationsModal } from './components/MyReservationsModal';
import { CartDrawer } from './components/CartDrawer';
import { AboutSection } from './components/AboutSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';

import { MenuItem, BookingRequest, CustomizationOptions, CartItem } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Load persistent bookings
  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    try {
      const saved = localStorage.getItem('artisan_coffee_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load persistent cart
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('artisan_coffee_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers state
  const [isReservationsOpen, setIsReservationsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);

  // Sync bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('artisan_coffee_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save bookings:', e);
    }
  }, [bookings]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('artisan_coffee_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cartItems]);

  // Booking Creation Handler
  const handleBookingCreated = (newBooking: BookingRequest) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  // Booking Cancellation Handler
  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
  };

  // Add to Cart with Options
  const handleAddToCartWithOptions = (
    item: MenuItem,
    options: CustomizationOptions,
    quantity: number
  ) => {
    let extraCost = 0;
    if (
      options.milk === 'Oat Milk' ||
      options.milk === 'Almond Milk' ||
      options.milk === 'Coconut Milk'
    )
      extraCost += 0.75;
    if (options.espressoShots > 2) extraCost += (options.espressoShots - 2) * 1.0;
    if (options.flavorSyrup && options.flavorSyrup !== 'None') extraCost += 0.5;

    const unitPrice = item.price + extraCost;
    const itemTotal = unitPrice * quantity;

    const newCartItem: CartItem = {
      id: 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      menuItem: item,
      customization: options,
      quantity,
      unitPrice,
      itemTotal,
    };

    setCartItems((prev) => [...prev, newCartItem]);
    setIsCartOpen(true);
  };

  // Quick Add to Cart (No Options)
  const handleQuickAddToCart = (item: MenuItem) => {
    const existingIndex = cartItems.findIndex(
      (ci) => ci.menuItem.id === item.id && !ci.customization
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      const existing = updated[existingIndex];
      const newQty = existing.quantity + 1;
      updated[existingIndex] = {
        ...existing,
        quantity: newQty,
        itemTotal: existing.unitPrice * newQty,
      };
      setCartItems(updated);
    } else {
      const newCartItem: CartItem = {
        id: 'cart_' + Date.now(),
        menuItem: item,
        quantity: 1,
        unitPrice: item.price,
        itemTotal: item.price,
      };
      setCartItems((prev) => [...prev, newCartItem]);
    }
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) =>
        ci.id === cartItemId
          ? { ...ci, quantity: newQty, itemTotal: ci.unitPrice * newQty }
          : ci
      )
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeReservationsCount = bookings.filter((b) => b.status === 'confirmed').length;
  const totalCartItemCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  return (
    <div className="min-h-screen mesh-gradient-bg text-[#FDFBF7] font-sans selection:bg-[#D97706] selection:text-white relative overflow-x-hidden">
      {/* Background Ambient Glow Orbs for Frosted Glass Depth */}
      <div className="fixed top-1/4 -left-32 w-96 h-96 bg-[#D97706]/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="fixed top-2/3 -right-32 w-96 h-96 bg-[#C2410C]/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="fixed bottom-10 left-1/3 w-80 h-80 bg-[#B45309]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenBooking={() => scrollToSection('booking')}
        onOpenReservations={() => setIsReservationsOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        activeReservationsCount={activeReservationsCount}
        cartItemCount={totalCartItemCount}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => scrollToSection('booking')}
          onExploreMenu={() => scrollToSection('menu')}
        />

        {/* Menu Section */}
        <MenuSection
          onCustomizeItem={(item) => setCustomizerItem(item)}
          onQuickAddToCart={handleQuickAddToCart}
        />

        {/* Table & Seating Booking Section */}
        <BookingSection
          onBookingCreated={handleBookingCreated}
          onViewReservations={() => setIsReservationsOpen(true)}
        />

        {/* About / Craft Story */}
        <AboutSection />

        {/* Location & Hours Section */}
        <LocationHoursSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-Over Drawers */}
      <CustomizerModal
        item={customizerItem}
        onClose={() => setCustomizerItem(null)}
        onAddToCart={handleAddToCartWithOptions}
      />

      <MyReservationsModal
        isOpen={isReservationsOpen}
        onClose={() => setIsReservationsOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
