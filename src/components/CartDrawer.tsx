import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [pickupTime, setPickupTime] = useState('In 15 mins');
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [customerName, setCustomerName] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.itemTotal, 0);
  const tax = subtotal * 0.0875;
  const total = subtotal + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;
    setOrderSubmitted(true);
  };

  const handleNewOrder = () => {
    onClearCart();
    setOrderSubmitted(false);
    setCustomerName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-md animate-fade-in flex justify-end">
      <div className="relative w-full max-w-md glass-panel border-l border-white/15 h-full shadow-2xl flex flex-col justify-between text-left">
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="font-serif text-lg font-bold text-white">Your Coffee Order</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 text-stone-300 hover:text-white hover:bg-white/20 transition-all border border-white/10"
            id="cart-drawer-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {orderSubmitted ? (
          <div className="p-8 text-center space-y-6 my-auto">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-500/10 border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-white">Order Received!</h3>
              <p className="text-xs text-stone-300">
                Thank you, <span className="text-white font-semibold">{customerName}</span>. Your barista is preparing your order for <span className="text-[#F59E0B] font-bold">{pickupTime}</span>.
              </p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-xs text-stone-300 space-y-1 text-left">
              <span className="block text-white font-bold mb-1">Pickup Location</span>
              <p>428 Timberland Avenue, Historic Roastery District</p>
              <p className="text-[#F59E0B]">Order Ref: #ORD-{Math.floor(1000 + Math.random() * 9000)}</p>
            </div>
            <button
              onClick={handleNewOrder}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D97706] to-[#C2410C] border border-white/20 text-white text-xs font-semibold shadow-lg hover:shadow-amber-500/20 transition-all"
            >
              Done & Return to Menu
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="p-8 text-center my-auto space-y-4">
            <ShoppingBag className="w-12 h-12 text-stone-400 mx-auto" />
            <p className="text-base font-semibold text-white">Your cart is empty</p>
            <p className="text-xs text-stone-300">
              Explore our menu of specialty coffees, cold brews, and fresh pastries to get started.
            </p>
          </div>
        ) : (
          <>
            {/* Scrollable Items */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="glass-card rounded-xl p-3.5 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-serif font-bold text-white text-sm">
                        {item.menuItem.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#F59E0B]">
                        ${item.unitPrice.toFixed(2)} each
                      </p>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1 text-stone-400 hover:text-red-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Customization Pills */}
                  {item.customization && (
                    <div className="text-[11px] text-stone-300 space-y-0.5 bg-black/30 p-2 rounded-lg border border-white/5">
                      <p>• {item.customization.temperature}, {item.customization.milk}</p>
                      <p>• Sweetness: {item.customization.sweetness}</p>
                      {item.customization.espressoShots > 2 && (
                        <p>• Extra Shots: {item.customization.espressoShots - 2}</p>
                      )}
                      {item.customization.flavorSyrup !== 'None' && (
                        <p>• Syrup: {item.customization.flavorSyrup}</p>
                      )}
                      {item.customization.specialInstructions && (
                        <p className="italic text-stone-300">"{item.customization.specialInstructions}"</p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-white hover:bg-white/10 rounded"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-white px-1.5">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-white hover:bg-white/10 rounded"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-bold text-white text-sm">
                      ${item.itemTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}

              {/* Pickup Time Selector */}
              <div className="glass-card rounded-xl p-3.5 space-y-2">
                <label className="block text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#F59E0B]" />
                  <span>Estimated Prep / Pickup Time</span>
                </label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full px-3 py-2 glass-input rounded-lg text-xs text-white focus:outline-none"
                >
                  <option value="In 15 mins" className="bg-stone-900 text-white">ASAP (In 15 mins)</option>
                  <option value="In 30 mins" className="bg-stone-900 text-white">In 30 mins</option>
                  <option value="In 45 mins" className="bg-stone-900 text-white">In 45 mins</option>
                  <option value="In 1 hour" className="bg-stone-900 text-white">In 1 hour</option>
                </select>
              </div>
            </div>

            {/* Footer Summary & Quick Checkout */}
            <form onSubmit={handleCheckout} className="p-5 bg-white/5 border-t border-white/10 space-y-4">
              <div className="space-y-1.5 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Est. Tax (8.75%)</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-[#F59E0B]">${total.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your Name for Pickup *"
                  className="w-full px-3.5 py-2.5 glass-input rounded-xl text-xs text-white placeholder-stone-400 focus:outline-none"
                  id="cart-customer-name-input"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D97706] to-[#C2410C] border border-white/20 text-white font-bold text-xs sm:text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
                id="cart-submit-order-btn"
              >
                <span>Place Order • ${total.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
