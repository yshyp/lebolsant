import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Category, MenuItem } from '../types';
import {
  Salad,
  Flame,
  Leaf,
  Plus,
  SlidersHorizontal,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Info,
  EyeOff
} from 'lucide-react';

export const MenuTab: React.FC = () => {
  const {
    openMealCustomizer,
    addToCart,
    setIsCartDrawerOpen,
    setCurrentTab,
    setIsMakeMySaladOpen,
    menuItems,
    isAdminLoggedIn
  } = useApp();

  // Boolean Toggle: Veg vs Non-Veg (false = All/Veg, or boolean filter)
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [activeSubCategory, setActiveSubCategory] = useState<Category | 'all'>('all');

  const subCategories: { id: Category | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'All Dishes', icon: '✨' },
    { id: 'salads', label: 'Salads', icon: '🥗' },
    { id: 'fruit-bowls', label: 'Fruit Bowls', icon: '🍓' },
    { id: 'soups', label: 'Soups', icon: '🍲' },
    { id: 'smoothies', label: 'Smoothies', icon: '🥤' },
    { id: 'oats-meals', label: 'Oats Meals', icon: '🥣' }
  ];

  // Filtering: hide inactive dishes for regular customers
  const filteredItems = menuItems.filter((item) => {
    if (!isAdminLoggedIn && item.isActive === false) return false;
    if (vegOnly && !item.isVeg) return false;
    if (activeSubCategory !== 'all' && item.category !== activeSubCategory) return false;
    return true;
  });


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Overview */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-[#1B5E20] text-xs font-bold mb-2">
            <Salad className="w-3.5 h-3.5" />
            <span>5 AM Morning Micro-Prep Menu</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
            Dynamic Culinary Menu
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-xl">
            Clean macros, zero chemical preservatives, cold-pressed artisanal dressings. Add to cart to subscribe or schedule single deliveries.
          </p>
        </div>

        {/* Custom Macro Banner trigger */}
        <button
          onClick={() => setIsMakeMySaladOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white text-xs font-bold shadow-md hover:opacity-95 transition cursor-pointer self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Launch "Make My Salad" Custom Macro Tool</span>
        </button>
      </div>

      {/* Filter Bar: Veg Boolean Switch + Sub-Category Pills */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xs border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Sub-Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {subCategories.map((cat) => {
            const isSelected = activeSubCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveSubCategory(cat.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#2E7D32] text-white shadow-md shadow-[#2E7D32]/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Top Category Filter (Boolean): Toggle switch for Vegetarian vs Non-Vegetarian */}
        <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full border-2 ${
                vegOnly ? 'bg-emerald-500 border-emerald-600' : 'bg-slate-300 border-slate-400'
              }`}
            />
            <span className="text-xs font-bold text-slate-700">
              {vegOnly ? 'Strictly Vegetarian Only' : 'Show All (Veg & Non-Veg)'}
            </span>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={vegOnly}
            onClick={() => setVegOnly(!vegOnly)}
            className={`relative inline-flex h-7 w-13 items-center rounded-full transition-colors cursor-pointer ${
              vegOnly ? 'bg-emerald-600' : 'bg-slate-300'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                vegOnly ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              {/* Image with Smooth Hover-Zoom */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md ${
                      item.isVeg ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                    }`}
                  >
                    {item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E65100] text-white shadow-md">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-lg border border-slate-100">
                  <div className="text-[9px] uppercase font-bold text-slate-400">Single Meal</div>
                  <div className="text-sm font-black text-[#1B5E20]">₹{item.basePrice}</div>
                </div>
              </div>

              {/* Item Card Details */}
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 font-display group-hover:text-[#2E7D32] transition-colors leading-snug">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {item.chefNote}
                </p>

                {/* Approximate Nutritional Value Box (Kcal | Protein | Carbs | Fat | Fiber) */}
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                  <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-500 mb-2">
                    <span className="flex items-center gap-1 text-[#E65100]">
                      <Flame className="w-3.5 h-3.5" /> Nutrition Macros
                    </span>
                    <span className="text-slate-900 font-black">{item.kcal} Kcal</span>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    <div className="bg-white p-1.5 rounded-xl border border-slate-100 shadow-2xs">
                      <span className="text-[9px] text-slate-400 block font-semibold">Protein</span>
                      <span className="text-xs font-black text-[#2E7D32]">{item.protein}g</span>
                    </div>
                    <div className="bg-white p-1.5 rounded-xl border border-slate-100 shadow-2xs">
                      <span className="text-[9px] text-slate-400 block font-semibold">Carbs</span>
                      <span className="text-xs font-black text-slate-700">{item.carbs}g</span>
                    </div>
                    <div className="bg-white p-1.5 rounded-xl border border-slate-100 shadow-2xs">
                      <span className="text-[9px] text-slate-400 block font-semibold">Fat</span>
                      <span className="text-xs font-black text-slate-700">{item.fat}g</span>
                    </div>
                    <div className="bg-white p-1.5 rounded-xl border border-slate-100 shadow-2xs">
                      <span className="text-[9px] text-slate-400 block font-semibold">Fiber</span>
                      <span className="text-xs font-black text-emerald-700">{item.fiber}g</span>
                    </div>
                  </div>
                </div>

                {/* Ingredients snippet */}
                {item.ingredients && (
                  <div className="text-[11px] text-slate-500 flex flex-wrap gap-1">
                    {item.ingredients.slice(0, 4).map((ing, i) => (
                      <span key={i} className="bg-slate-100 px-2 py-0.5 rounded-md">
                        {ing}
                      </span>
                    ))}
                    {item.ingredients.length > 4 && (
                      <span className="text-slate-400">+{item.ingredients.length - 4} more</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Buttons: Customize Bowl & Add to Cart */}
            <div className="p-5 pt-0 flex gap-2">
              <button
                type="button"
                onClick={() => openMealCustomizer(item)}
                className="flex-1 py-3 rounded-2xl border-2 border-[#2E7D32]/30 text-[#2E7D32] hover:bg-[#2E7D32]/5 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Customize Bowl</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  addToCart(item);
                }}
                className="py-3 px-4 rounded-2xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold shadow-md shadow-[#2E7D32]/25 transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Bottom Cart Bar (if items present) */}
      <div className="bg-gradient-to-r from-emerald-900 to-[#1B5E20] text-white rounded-3xl p-6 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
            <Salad className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display">Ready to turn your bowl into a routine?</h3>
            <p className="text-xs text-emerald-200">
              Subscription plans offer up to 20% discounts, free 5 PM Day Push, and gym buddy duo bonuses.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setCurrentTab('subscriptions');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-[#1B5E20] font-extrabold text-sm shadow-lg hover:bg-emerald-50 transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Go to Subscriptions &amp; Pricing</span>
          <ArrowRight className="w-4 h-4 text-emerald-600" />
        </button>
      </div>
    </div>
  );
};
