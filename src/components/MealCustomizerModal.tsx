import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Minus, Check, Flame, ShieldAlert, Sparkles, ChefHat } from 'lucide-react';

const TOPPING_OPTIONS = [
  'Toasted Pumpkin & Flax Seeds',
  'Greek Feta Crumbles',
  'California Walnuts',
  'Dried Cranberries',
  'Pomegranate Pearls',
  'Avocado Cubes (+₹40)',
  'Extra Grilled Chicken Breast (+₹60)',
  'Charred Tofu Cubes (+₹40)'
];

const DRESSING_OPTIONS = [
  'Cold-Pressed Olive Lemon',
  'Greek Yogurt Ranch',
  'Balsamic Emulsion',
  'Zesty Chaat Vinaigrette',
  'Peanut-Tamari Glaze'
];

export const MealCustomizerModal: React.FC = () => {
  const { isCustomizerOpen, closeMealCustomizer, selectedMealForCustomization, addToCart } = useApp();

  const [toppingsAdded, setToppingsAdded] = useState<string[]>([]);
  const [toppingsRemoved, setToppingsRemoved] = useState<string[]>([]);
  const [dressingChoice, setDressingChoice] = useState<string>('Cold-Pressed Olive Lemon');
  const [dressingOnSide, setDressingOnSide] = useState<boolean>(true);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  if (!isCustomizerOpen || !selectedMealForCustomization) return null;

  const item = selectedMealForCustomization;

  const toggleAddedTopping = (topping: string) => {
    setToppingsAdded((prev) =>
      prev.includes(topping) ? prev.filter((t) => t !== topping) : [...prev, topping]
    );
  };

  const toggleRemovedIngredient = (ing: string) => {
    setToppingsRemoved((prev) =>
      prev.includes(ing) ? prev.filter((i) => i !== ing) : [...prev, ing]
    );
  };

  const handleAddToCart = () => {
    addToCart(item, {
      toppingsAdded,
      toppingsRemoved,
      dressingChoice,
      dressingOnSide,
      specialInstructions,
      quantity
    });
    closeMealCustomizer();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-xl w-full shadow-2xl border border-[#2E7D32]/20 overflow-hidden relative animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={closeMealCustomizer}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-600 transition shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header with Photo */}
        <div className="relative h-48 w-full bg-slate-900 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  item.isVeg ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                }`}>
                  {item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                </span>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E65100] text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold font-display leading-tight">{item.name}</h2>
              <p className="text-emerald-300 font-bold text-lg">₹{item.basePrice}</p>
            </div>
          </div>
        </div>

        {/* Scrollable Customization Controls */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* Nutrition Macros Banner */}
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase text-[#1B5E20] flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#E65100]" /> Macro Breakdown
              </span>
              <span className="text-xs font-bold text-slate-600">{item.kcal} Total Kcal</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-white p-2 rounded-xl border border-emerald-100">
                <div className="text-[10px] text-slate-500 font-semibold">Protein</div>
                <div className="text-sm font-black text-[#2E7D32]">{item.protein}g</div>
              </div>
              <div className="bg-white p-2 rounded-xl border border-emerald-100">
                <div className="text-[10px] text-slate-500 font-semibold">Carbs</div>
                <div className="text-sm font-black text-slate-700">{item.carbs}g</div>
              </div>
              <div className="bg-white p-2 rounded-xl border border-emerald-100">
                <div className="text-[10px] text-slate-500 font-semibold">Healthy Fat</div>
                <div className="text-sm font-black text-slate-700">{item.fat}g</div>
              </div>
              <div className="bg-white p-2 rounded-xl border border-emerald-100">
                <div className="text-[10px] text-slate-500 font-semibold">Dietary Fiber</div>
                <div className="text-sm font-black text-emerald-700">{item.fiber}g</div>
              </div>
            </div>
          </div>

          {/* Remove Standard Ingredients */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <ChefHat className="w-3.5 h-3.5" /> Remove Ingredients (Optional)
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map((ing) => {
                  const isRemoved = toppingsRemoved.includes(ing);
                  return (
                    <button
                      key={ing}
                      type="button"
                      onClick={() => toggleRemovedIngredient(ing)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                        isRemoved
                          ? 'bg-rose-100 border-rose-300 text-rose-700 line-through'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {isRemoved ? `✕ No ${ing}` : ing}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add Extra Superfoods & Toppings */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2E7D32] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Add Extra Superfoods & Crunch
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TOPPING_OPTIONS.map((topping) => {
                const isSelected = toppingsAdded.includes(topping);
                return (
                  <button
                    key={topping}
                    type="button"
                    onClick={() => toggleAddedTopping(topping)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left flex items-center justify-between transition cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-[#2E7D32] text-[#1B5E20]'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{topping}</span>
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      isSelected ? 'bg-[#2E7D32] text-white' : 'border border-slate-300 text-transparent'
                    }`}>
                      ✓
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dressing Preference */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Signature Cold-Pressed Dressing
            </h3>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {DRESSING_OPTIONS.map((dressing) => (
                <button
                  key={dressing}
                  type="button"
                  onClick={() => setDressingChoice(dressing)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                    dressingChoice === dressing
                      ? 'bg-emerald-50 border-[#2E7D32] text-[#1B5E20]'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  {dressing}
                </button>
              ))}
            </div>

            {/* Dressing On Side Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100/80 border border-slate-200">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Dressing on the side</span>
                <span className="text-[11px] text-slate-500">Recommended so your greens stay ultra-crisp</span>
              </div>
              <button
                type="button"
                onClick={() => setDressingOnSide(!dressingOnSide)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  dressingOnSide ? 'bg-[#2E7D32]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    dressingOnSide ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Chef Note / Special Instructions
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra lemon wedge, no ice pack needed"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
            />
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-600">Quantity:</span>
            <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-slate-600 hover:bg-slate-200 transition"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-3 text-sm font-bold text-slate-800">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-slate-600 hover:bg-slate-200 transition"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-3 px-4 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-sm shadow-md shadow-[#2E7D32]/25 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Add to Cart &bull; ₹{item.basePrice * quantity}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
