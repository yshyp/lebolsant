import React, { useState } from 'react';
import { Sparkles, Utensils, Award } from 'lucide-react';
import { BrandEmblem } from './brand/BrandEmblem';


interface SlicedVeg {
  id: string;
  name: string;
  leftEmoji: string;
  rightEmoji: string;
  badge: string;
  top: string;
  left?: string;
  right?: string;
  delay: string;
  rotation: string;
}

const INTERACTIVE_VEGS: SlicedVeg[] = [
  {
    id: 'avocado',
    name: 'Hass Avocado',
    leftEmoji: '🥑',
    rightEmoji: '🥑',
    badge: '100% Healthy Fats',
    top: '12%',
    left: '8%',
    delay: '0s',
    rotation: '-8deg'
  },
  {
    id: 'cucumber',
    name: 'English Cucumber',
    leftEmoji: '🥒',
    rightEmoji: '🥒',
    badge: '5 AM Crisp Cut',
    top: '18%',
    right: '12%',
    delay: '1.2s',
    rotation: '12deg'
  },
  {
    id: 'tomato',
    name: 'Vine Cherry Tomato',
    leftEmoji: '🍅',
    rightEmoji: '🍅',
    badge: 'Lycopene Boost',
    top: '68%',
    left: '12%',
    delay: '0.8s',
    rotation: '15deg'
  },
  {
    id: 'lemon',
    name: 'Zesty Lemon Wedge',
    leftEmoji: '🍋',
    rightEmoji: '🍋',
    badge: 'Cold-Pressed Citrus',
    top: '72%',
    right: '10%',
    delay: '1.5s',
    rotation: '-12deg'
  },
  {
    id: 'herb',
    name: 'Organic Basil & Mint',
    leftEmoji: '🌿',
    rightEmoji: '🍃',
    badge: 'Antioxidant Rich',
    top: '42%',
    left: '4%',
    delay: '2s',
    rotation: '6deg'
  }
];

export const VegetableCuttingBackground: React.FC = () => {
  const [slicedId, setSlicedId] = useState<string | null>(null);
  const [sliceCount, setSliceCount] = useState(0);
  const [bonusToast, setBonusToast] = useState<string | null>(null);

  const handleManualSlice = (veg: SlicedVeg) => {
    setSlicedId(veg.id);
    setSliceCount((c) => c + 1);
    setBonusToast(`🔪 Sliced ${veg.name}! ${veg.badge}`);

    setTimeout(() => {
      setSlicedId(null);
    }, 1800);

    setTimeout(() => {
      setBonusToast(null);
    }, 2400);
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Toast alert when user clicks to slice a background vegetable */}
      {bonusToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-auto bg-[#1B5E20] text-white px-4 py-2 rounded-2xl shadow-xl border border-emerald-300 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-3 duration-200">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>{bonusToast}</span>
        </div>
      )}

      {/* Floating Interactive Chopping Vegetables in Background */}
      {INTERACTIVE_VEGS.map((veg) => {
        const isCurrentlySliced = slicedId === veg.id;

        return (
          <div
            key={veg.id}
            onClick={() => handleManualSlice(veg)}
            className="absolute pointer-events-auto cursor-pointer group select-none transition-transform duration-300 hover:scale-125"
            style={{
              top: veg.top,
              left: veg.left,
              right: veg.right,
              transform: `rotate(${veg.rotation})`,
              animationDelay: veg.delay
            }}
            title={`Click to slice ${veg.name}!`}
          >
            {/* Knife Cutting Slash & Halves container */}
            <div className="relative flex items-center justify-center p-3">
              {/* Knife Blade Slash Visual Effect */}
              <div
                className={`absolute w-16 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_8px_#ffffff] z-20 pointer-events-none ${
                  isCurrentlySliced ? 'animate-slash-flash opacity-100' : 'opacity-0 group-hover:opacity-100 group-hover:animate-slash-flash'
                }`}
                style={{ transform: 'rotate(-45deg)' }}
              />

              {/* Chef Knife icon hovering */}
              <div
                className={`absolute -top-4 -right-3 text-lg z-30 transition-all duration-200 pointer-events-none ${
                  isCurrentlySliced
                    ? 'animate-knife-chop opacity-100'
                    : 'opacity-0 group-hover:opacity-90 group-hover:animate-knife-chop'
                }`}
              >
                🔪
              </div>

              {/* Left Half of Vegetable */}
              <span
                className={`text-3xl sm:text-4xl transition-transform duration-500 inline-block drop-shadow-md ${
                  isCurrentlySliced
                    ? 'translate-x-[-18px] translate-y-[-6px] -rotate-12'
                    : 'group-hover:translate-x-[-12px] group-hover:-rotate-12 animate-floating-sway'
                }`}
              >
                {veg.leftEmoji}
              </span>

              {/* Right Half of Vegetable */}
              <span
                className={`text-3xl sm:text-4xl transition-transform duration-500 inline-block drop-shadow-md -ml-3 ${
                  isCurrentlySliced
                    ? 'translate-x-[18px] translate-y-[6px] rotate-12'
                    : 'group-hover:translate-x-[12px] group-hover:rotate-12 animate-floating-sway-reverse'
                }`}
              >
                {veg.rightEmoji}
              </span>

              {/* Click Me Slicing Hint on hover */}
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-md">
                Click to Chop!
              </span>
            </div>
          </div>
        );
      })}

      {/* Floating Falling Vegetable Slices Tumble effect across background */}
      <div className="absolute top-10 left-1/3 text-xl opacity-40 animate-[tumble-fall_9s_linear_infinite] select-none pointer-events-none">
        🥒
      </div>
      <div className="absolute top-24 right-1/4 text-lg opacity-35 animate-[tumble-fall_12s_linear_infinite_2s] select-none pointer-events-none">
        🥕
      </div>
      <div className="absolute top-48 left-1/5 text-xl opacity-35 animate-[tumble-fall_10s_linear_infinite_4s] select-none pointer-events-none">
        🍅
      </div>
      <div className="absolute top-36 right-1/3 text-lg opacity-40 animate-[tumble-fall_11s_linear_infinite_1.5s] select-none pointer-events-none">
        🥑
      </div>
      <div className="absolute top-16 left-2/3 text-sm opacity-45 animate-[tumble-fall_8s_linear_infinite_3s] select-none pointer-events-none">
        🌿
      </div>
    </div>
  );
};

export const LiveChoppingBoardCard: React.FC = () => {
  const [chops, setChops] = useState(148);
  const [isRapidChopping, setIsRapidChopping] = useState(false);

  const handleTapChop = () => {
    setChops((prev) => prev + 1);
    setIsRapidChopping(true);
    setTimeout(() => setIsRapidChopping(false), 900);
  };

  return (
    <div
      onClick={handleTapChop}
      className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border-2 border-emerald-500/20 shadow-xl relative overflow-hidden group cursor-pointer hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl select-none"
    >
      {/* Decorative Wooden Board Grid Pattern */}
      <div className="absolute inset-0 bg-[#FFFDF9] opacity-90 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2E7D32] via-emerald-400 to-[#E65100]" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Animated Chopping Board Visual */}
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 bg-amber-100/80 rounded-2xl border-2 border-amber-300/80 flex items-center justify-center shadow-inner overflow-hidden">
            {/* Wooden Texture Lines */}
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,#b45309,#b45309_2px,transparent_2px,transparent_8px)]" />

            {/* Cucumber getting chopped */}
            <div className="relative z-10 flex items-center">
              <span className={`text-2xl transition-transform ${isRapidChopping ? 'animate-slice-left' : 'animate-slice-left'}`}>
                🥒
              </span>
              <span className={`text-2xl transition-transform -ml-2 ${isRapidChopping ? 'animate-slice-right' : 'animate-slice-right'}`}>
                🥒
              </span>
            </div>

            {/* Chef Knife Chopping Motion */}
            <div
              className={`absolute -top-1 right-1 text-2xl z-20 ${
                isRapidChopping ? 'animate-knife-chop scale-125' : 'animate-knife-chop'
              }`}
            >
              🔪
            </div>

            {/* Slicing Light Flash */}
            <div
              className="absolute w-24 h-0.5 bg-white shadow-[0_0_8px_#ffffff] z-30 animate-slash-flash"
              style={{ transform: 'rotate(-45deg)' }}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#164223] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                <BrandEmblem className="w-3.5 h-3.5" />
                <span>5:00 AM Fresh Prep Station</span>
              </span>
              <span className="text-[10px] font-bold text-[#E23724] bg-red-50 border border-red-200 px-2 py-0.5 rounded-full animate-pulse">
                Live Chopping
              </span>
            </div>
            <h4 className="text-base font-extrabold text-slate-900 font-display mt-1">
              Zero Pre-Cut, Zero Soggy Greens
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              100% chopped at 5:00 AM daily in sugarcane bagasse bowls. The Ultimate Salad.
            </p>
          </div>
        </div>

        {/* Live Chopping Meter & Tap Action */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Bowls Freshly Prepped
            </span>
            <span className="text-xl font-black text-[#164223] font-display">
              {chops.toLocaleString()}+
            </span>
          </div>

          <button
            type="button"
            className="px-4 py-2.5 rounded-xl bg-[#164223] hover:bg-[#0F351A] text-white text-xs font-bold shadow-md shadow-[#164223]/20 transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            <span>🔪 Tap to Chop</span>
          </button>

        </div>
      </div>
    </div>
  );
};
