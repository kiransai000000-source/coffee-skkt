import React, { useState } from 'react';
import { X, Plus, Minus, Coffee, Sparkles, Check } from 'lucide-react';
import { MenuItem, CustomizationOptions } from '../types';

interface CustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, options: CustomizationOptions, quantity: number) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [temperature, setTemperature] = useState<'Hot' | 'Iced' | 'Extra Hot'>('Hot');
  const [milk, setMilk] = useState<'Whole Milk' | 'Oat Milk' | 'Almond Milk' | 'Coconut Milk' | 'No Milk'>('Oat Milk');
  const [sweetness, setSweetness] = useState<'0% (Unsweetened)' | '25% (Less Sweet)' | '50% (Standard)' | '100% (Extra Sweet)'>('50% (Standard)');
  const [espressoShots, setEspressoShots] = useState(2);
  const [flavorSyrup, setFlavorSyrup] = useState<'Vanilla' | 'Caramel' | 'Hazelnut' | 'Lavender' | 'None'>('None');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Calculate extra cost
  let extraCost = 0;
  if (milk === 'Oat Milk' || milk === 'Almond Milk' || milk === 'Coconut Milk') extraCost += 0.75;
  if (espressoShots > 2) extraCost += (espressoShots - 2) * 1.0;
  if (flavorSyrup !== 'None') extraCost += 0.5;

  const unitPrice = item.price + extraCost;
  const totalPrice = unitPrice * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddToCart(
      item,
      {
        temperature,
        milk,
        sweetness,
        espressoShots,
        flavorSyrup,
        specialInstructions,
      },
      quantity
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-modal rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="relative h-44 shrink-0 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors border border-white/20"
            id="customizer-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-5 right-5">
            <h3 className="font-serif text-xl font-bold text-white">{item.name}</h3>
            <p className="text-xs text-stone-300 line-clamp-1">{item.description}</p>
          </div>
        </div>

        {/* Options Scrollable Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5 overflow-y-auto flex-1 text-left text-sm text-stone-200">
          {/* Temperature */}
          <div>
            <label className="block text-xs font-semibold text-[#F59E0B] uppercase tracking-wider mb-2">
              Temperature
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Hot', 'Iced', 'Extra Hot'] as const).map((temp) => (
                <button
                  key={temp}
                  type="button"
                  onClick={() => setTemperature(temp)}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                    temperature === temp
                      ? 'bg-[#D97706] text-white border-white/30 shadow-md shadow-[#D97706]/30'
                      : 'bg-white/5 text-stone-200 border-white/10 hover:border-amber-500/40 hover:bg-white/10'
                  }`}
                >
                  {temp}
                </button>
              ))}
            </div>
          </div>

          {/* Milk Option */}
          <div>
            <label className="block text-xs font-semibold text-[#F59E0B] uppercase tracking-wider mb-2">
              Milk Preference
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'Oat Milk', extra: '+ $0.75' },
                { name: 'Almond Milk', extra: '+ $0.75' },
                { name: 'Coconut Milk', extra: '+ $0.75' },
                { name: 'Whole Milk', extra: 'Included' },
                { name: 'No Milk', extra: '' },
              ].map((m) => (
                <button
                  key={m.name}
                  type="button"
                  onClick={() => setMilk(m.name as any)}
                  className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between transition-all ${
                    milk === m.name
                      ? 'bg-amber-500/20 border-amber-500/60 text-white shadow-md'
                      : 'bg-white/5 text-stone-200 border-white/10 hover:border-amber-500/40 hover:bg-white/10'
                  }`}
                >
                  <span>{m.name}</span>
                  <span className="text-[10px] text-stone-400">{m.extra}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sweetness */}
          <div>
            <label className="block text-xs font-semibold text-[#F59E0B] uppercase tracking-wider mb-2">
              Sweetness Level
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                '0% (Unsweetened)',
                '25% (Less Sweet)',
                '50% (Standard)',
                '100% (Extra Sweet)',
              ].map((sw) => (
                <button
                  key={sw}
                  type="button"
                  onClick={() => setSweetness(sw as any)}
                  className={`p-2 rounded-xl border text-xs font-medium text-center transition-all ${
                    sweetness === sw
                      ? 'bg-[#D97706] text-white border-white/30 shadow-md shadow-[#D97706]/30'
                      : 'bg-white/5 text-stone-200 border-white/10 hover:border-amber-500/40 hover:bg-white/10'
                  }`}
                >
                  {sw}
                </button>
              ))}
            </div>
          </div>

          {/* Espresso Shots */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
            <div>
              <span className="block text-xs font-semibold text-white">Espresso Shots</span>
              <span className="text-[11px] text-stone-400">Standard is 2 shots ($1.00 per extra shot)</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setEspressoShots(Math.max(1, espressoShots - 1))}
                className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white hover:border-amber-500/40"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-sm text-[#F59E0B]">{espressoShots}</span>
              <button
                type="button"
                onClick={() => setEspressoShots(espressoShots + 1)}
                className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white hover:border-amber-500/40"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Flavor Syrup */}
          <div>
            <label className="block text-xs font-semibold text-[#F59E0B] uppercase tracking-wider mb-2">
              Artisan Flavor Syrup (+ $0.50)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['None', 'Vanilla', 'Caramel', 'Hazelnut', 'Lavender'] as const).map((flavor) => (
                <button
                  key={flavor}
                  type="button"
                  onClick={() => setFlavorSyrup(flavor)}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-medium transition-all ${
                    flavorSyrup === flavor
                      ? 'bg-[#D97706] text-white border-white/30 shadow-md shadow-[#D97706]/30'
                      : 'bg-white/5 text-stone-200 border-white/10 hover:border-amber-500/40 hover:bg-white/10'
                  }`}
                >
                  {flavor}
                </button>
              ))}
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-xs font-semibold text-[#F59E0B] uppercase tracking-wider mb-1">
              Special Instructions
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Light ice, extra warm cup, foam on top..."
              className="w-full px-3 py-2 glass-input rounded-xl text-xs text-white placeholder-stone-400 focus:outline-none"
            />
          </div>

          {/* Quantity & Submit Footer */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-white/10"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-sm px-2 text-white">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-white/10"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="submit"
              className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#D97706] to-[#C2410C] text-white font-semibold text-xs sm:text-sm border border-white/20 shadow-lg shadow-[#D97706]/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-between"
              id="customizer-submit-btn"
            >
              <span>Add to Order</span>
              <span className="font-bold">${totalPrice.toFixed(2)}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
