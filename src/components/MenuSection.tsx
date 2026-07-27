import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Plus, SlidersHorizontal, Flame, Leaf, Check } from 'lucide-react';
import { MENU_ITEMS } from '../data/coffeeData';
import { MenuItem } from '../types';

interface MenuSectionProps {
  onCustomizeItem: (item: MenuItem) => void;
  onQuickAddToCart: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onCustomizeItem, onQuickAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [addedItemIds, setAddedItemIds] = useState<Set<string>>(new Set());

  const categories = [
    { id: 'all', label: 'All Offerings' },
    { id: 'espresso', label: 'Espresso & Brews' },
    { id: 'cold_brew', label: 'Cold Brews' },
    { id: 'tea_matcha', label: 'Tea & Matcha' },
    { id: 'bakery', label: 'Artisanal Bakery' },
    { id: 'savory', label: 'Savory Toasts' },
  ];

  const tagsList = ['All', 'House Special', 'Bestseller', 'Oat Milk', 'Vegan', 'High Protein'];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.origin && item.origin.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesTag =
        selectedTag === 'all' ||
        selectedTag === 'All' ||
        item.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());

      return matchesCategory && matchesSearch && matchesTag;
    });
  }, [selectedCategory, searchQuery, selectedTag]);

  const handleQuickAdd = (item: MenuItem) => {
    onQuickAddToCart(item);
    setAddedItemIds((prev) => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedItemIds((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 1500);
  };

  return (
    <section id="menu" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-semibold tracking-widest text-[#F59E0B] uppercase px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md inline-block">
            Artisanal Selection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FDFBF7]">
            Crafted Brews & Fresh Bakes
          </h2>
          <p className="text-sm text-stone-300">
            Every drink is prepared with freshly roasted single-origin beans, organic milks, and natural sweeteners.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="glass-panel rounded-2xl p-4 mb-8 space-y-4 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coffee, tea, pastries..."
                className="w-full pl-10 pr-4 py-2.5 glass-input rounded-xl text-xs sm:text-sm placeholder-stone-400 focus:outline-none transition-colors"
                id="menu-search-input"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#D97706] text-white shadow-lg shadow-[#D97706]/30 border border-white/20'
                      : 'bg-white/5 text-stone-300 border border-white/10 hover:border-white/25 hover:bg-white/10'
                  }`}
                  id={`menu-cat-${cat.id}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Tag Filters */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/10 overflow-x-auto text-xs text-stone-300">
            <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-stone-400 mr-1">
              Filter By:
            </span>
            {tagsList.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-xs transition-all whitespace-nowrap ${
                  selectedTag === tag
                    ? 'bg-amber-500/20 text-[#F59E0B] border border-amber-500/40 font-medium shadow-sm'
                    : 'bg-white/5 text-stone-300 border border-white/10 hover:text-white hover:bg-white/10'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-2xl border border-white/10 space-y-3">
            <p className="text-lg text-[#FDFBF7] font-medium">No items found matching your search</p>
            <p className="text-xs text-stone-400">Try adjusting your search terms or filter tags</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTag('all');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-[#D97706] text-white text-xs font-semibold border border-white/20 shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isAdded = addedItemIds.has(item.id);
              return (
                <div
                  key={item.id}
                  className="group glass-card glass-card-hover rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Item Image */}
                    <div className="relative h-48 overflow-hidden bg-black/40">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Tags Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-[#F59E0B] border border-amber-500/30 shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Origin / Calories pill */}
                      {item.origin && (
                        <div className="absolute bottom-2 left-3 right-3 text-[10px] text-stone-300 font-light truncate">
                          Origin: <span className="font-medium text-[#FDFBF7]">{item.origin}</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-2 text-left">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-lg font-bold text-[#FDFBF7] group-hover:text-[#F59E0B] transition-colors">
                          {item.name}
                        </h3>
                        <span className="font-bold text-base text-[#F59E0B] shrink-0">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {item.calories && (
                        <p className="text-[11px] text-stone-400">
                          {item.calories} kcal
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-5 pb-5 pt-2 flex items-center gap-2">
                    {item.customizable ? (
                      <button
                        onClick={() => onCustomizeItem(item)}
                        className="w-full py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-amber-500/50 hover:bg-white/15 text-[#FDFBF7] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                        id={`customize-btn-${item.id}`}
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>Customize & Add</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleQuickAdd(item)}
                        className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                          isAdded
                            ? 'bg-emerald-600 text-white shadow-md border border-white/20'
                            : 'bg-gradient-to-r from-[#D97706] to-[#C2410C] text-white border border-white/20 hover:shadow-lg hover:shadow-[#D97706]/30'
                        }`}
                        id={`quick-add-btn-${item.id}`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added to Cart</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Add to Order</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
