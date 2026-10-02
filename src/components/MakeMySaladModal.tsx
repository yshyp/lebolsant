import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, Flame, Check, Scale, ShieldCheck } from 'lucide-react';

export const MakeMySaladModal: React.FC = () => {
  const { isMakeMySaladOpen, setIsMakeMySaladOpen, addToCart } = useApp();

  const [greensBase, setGreensBase] = useState('Hydroponic Baby Spinach & Romaine');
  const [proteinSource, setProteinSource] = useState('Sous-Vide Chicken Breast (40g Protein)');
  const [carbSource, setCarbSource] = useState('Tri-Color Steamed Quinoa (Low GI)');
  const [healthyFats, setHealthyFats] = useState<string[]>(['Avocado Slices', 'Toasted Pumpkin Seeds']);
  const [dressing, setDressing] = useState('Cold-Pressed Olive Lemon');
  const [targetKcal, setTargetKcal] = useState(480);
  const [bowlName, setBowlName] = useState('My Custom Athlete Macro Bowl');

  if (!isMakeMySaladOpen) return null;

  const toggleFat = (item: string) => {
    setHealthyFats((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSaveAndAdd = () => {
    // Construct custom MenuItem
    const customItem = {
      id: `custom-${Date.now()}`,
      name: bowlName,
      category: 'salads' as const,
      isVeg: !proteinSource.toLowerCase().includes('chicken') && !proteinSource.toLowerCase().includes('egg'),
      basePrice: 240,
      kcal: targetKcal,
      protein: proteinSource.includes('40g') ? 40 : 32,
      carbs: carbSource.includes('Keto') ? 8 : 28,
      fat: healthyFats.length * 6 + 8,
      fiber: 10,
      chefNote: `Custom Athlete Creation: ${greensBase} with ${proteinSource}, ${carbSource} & ${dressing}.`,
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      ingredients: [greensBase, proteinSource, carbSource, ...healthyFats],
      badge: 'Custom Macro Creator'
    };

    addToCart(customItem, {
      toppingsAdded: healthyFats,
      dressingChoice: dressing,
      dressingOnSide: true,
      specialInstructions: `Custom Macro Target: ~${targetKcal} Kcal. Base: ${greensBase}`
    });

    setIsMakeMySaladOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-xl w-full shadow-2xl border border-[#2E7D32]/20 overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#1B5E20] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#E65100] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-extrabold uppercase tracking-wider mb-0.5 text-emerald-100">
                Monthly &amp; Quarterly Exclusive
              </div>
              <h2 className="text-xl font-bold font-display leading-tight">Make My Salad &bull; Custom Macro Creator</h2>
            </div>
          </div>
          <button
            onClick={() => setIsMakeMySaladOpen(false)}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Builder Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-slate-800">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Give Your Custom Bowl A Name
            </label>
            <input
              type="text"
              value={bowlName}
              onChange={(e) => setBowlName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white"
            />
          </div>

          {/* Target Macro Estimate */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#2E7D32]" />
              <div>
                <span className="text-xs font-bold text-[#1B5E20] block">Estimated Nutrition Profile</span>
                <span className="text-[11px] text-slate-600">Calculated live for kitchen prep</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-right">
              <div>
                <span className="text-[10px] text-slate-500 font-bold block">TARGET</span>
                <span className="text-base font-black text-[#2E7D32]">{targetKcal} Kcal</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold block">PROTEIN</span>
                <span className="text-base font-black text-[#E65100]">
                  {proteinSource.includes('40g') ? '42g' : '32g'}
                </span>
              </div>
            </div>
          </div>

          {/* 1. Base Greens */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Select Greens Foundation
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Hydroponic Baby Spinach & Romaine',
                'Crisp Iceberg & Arugula Mix',
                'Purple Cabbage & Kale Crunch',
                'Microgreens & Sprout Heavy Base'
              ].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setGreensBase(b)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                    greensBase === b
                      ? 'bg-emerald-50 border-[#2E7D32] text-[#1B5E20] ring-1 ring-[#2E7D32]'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Protein Source */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              2. Targeted Protein Source
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'Sous-Vide Chicken Breast (40g Protein)',
                'Charred Garlic Cottage Cheese (28g Protein)',
                'Organic Firm Tofu & Edamame (26g Plant Protein)',
                '6 Poached Egg Whites & Herbs (30g Lean Protein)'
              ].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setProteinSource(p);
                    if (p.includes('40g')) setTargetKcal(510);
                    else setTargetKcal(420);
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                    proteinSource === p
                      ? 'bg-emerald-50 border-[#2E7D32] text-[#1B5E20] ring-1 ring-[#2E7D32]'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Carbohydrate Source */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              3. Complex Carbohydrate / Clean Fuel
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Tri-Color Steamed Quinoa (Low GI)',
                'Roasted Sweet Potato Cubes',
                '24-Hr Sprouted Green Moong',
                'Strictly No Starch (Keto & Shredding)'
              ].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCarbSource(c)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                    carbSource === c
                      ? 'bg-emerald-50 border-[#2E7D32] text-[#1B5E20] ring-1 ring-[#2E7D32]'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Healthy Fats & Micronutrients */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              4. Essential Healthy Fats &amp; Micro-Crunch (Pick 2)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Avocado Slices',
                'Toasted Pumpkin Seeds',
                'Greek Feta Cubes',
                'California Walnuts',
                'Chia & Flax Dust',
                'Pomegranate Pearls'
              ].map((fat) => {
                const isSelected = healthyFats.includes(fat);
                return (
                  <button
                    key={fat}
                    type="button"
                    onClick={() => toggleFat(fat)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left flex items-center justify-between transition cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-[#2E7D32] text-[#1B5E20]'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span>{fat}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#2E7D32]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Cold-Pressed Dressing */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              5. Chef Dressing
            </label>
            <select
              value={dressing}
              onChange={(e) => setDressing(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium bg-white"
            >
              <option value="Cold-Pressed Olive Lemon">Cold-Pressed Extra Virgin Olive & Lemon</option>
              <option value="Greek Yogurt Garlic Ranch">Greek Yogurt Garlic Ranch (High Protein)</option>
              <option value="Aged Balsamic Emulsion">Aged Italian Balsamic Emulsion</option>
              <option value="Zesty Chaat Vinaigrette">Zesty Indian Chaat Vinaigrette</option>
              <option value="Peanut-Tamari Glaze">Peanut-Tamari Sesame Glaze</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Included in your <strong className="text-slate-800">Monthly/Quarterly Plan</strong>
          </div>
          <button
            type="button"
            onClick={handleSaveAndAdd}
            className="py-3 px-5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-200" />
            <span>Save &amp; Add Custom Bowl</span>
          </button>
        </div>
      </div>
    </div>
  );
};
