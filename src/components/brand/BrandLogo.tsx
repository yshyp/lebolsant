import React from 'react';
import { BrandEmblem } from './BrandEmblem';

interface BrandLogoProps {
  variant?: 'full' | 'compact' | 'minimal' | 'emblem-only';
  className?: string;
  theme?: 'light' | 'dark';
  onClick?: () => void;
}

/**
 * Official Complete Le Bol Santé Logo
 * Matches the official reference image:
 * - Tomato Swirl Leaf Emblem
 * - Botanical wordmark: "le bol santé" with leaf flourishes & tomato 'o'
 * - Center botanical leaf divider
 * - 2-line tagline:
 *     "FRESHLY CHOPPED, PERFECTLY BALANCED"
 *     "THE ULTIMATE SALAD"
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  className = '',
  theme = 'light',
  onClick
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#164223';
  const leafColor = isDark ? '#4ADE80' : '#1B5E20';
  const mutedTextColor = isDark ? 'text-emerald-200/80' : 'text-[#1B5E20]';
  const dividerColor = isDark ? 'border-emerald-500/40' : 'border-[#1B5E20]/30';

  if (variant === 'emblem-only') {
    return <BrandEmblem className={className} />;
  }

  // --- Compact Navbar Variant (Horizontal inline lockup) ---
  if (variant === 'compact') {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-3 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      >
        <div className="relative">
          <BrandEmblem className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs transition-transform duration-300 group-hover:scale-105" />
        </div>

        <div className="flex flex-col">
          {/* Botanical Wordmark */}
          <div className="flex items-center gap-1 font-display leading-none">
            <span className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: textColor }}>
              le bol santé
            </span>
          </div>

          {/* Subtitle kicker */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase ${mutedTextColor}`}>
              Freshly Chopped
            </span>
            <span className="w-1 h-1 rounded-full bg-[#E23724]" />
            <span className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase ${mutedTextColor}`}>
              The Ultimate Salad
            </span>
          </div>
        </div>
      </div>
    );
  }

  // --- Minimal Variant (Wordmark + Emblem without tagline) ---
  if (variant === 'minimal') {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-3.5 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      >
        <BrandEmblem className="w-12 h-12 transition-transform duration-300 group-hover:scale-105" />
        <div>
          <span className="text-2xl sm:text-3xl font-black tracking-tight font-display" style={{ color: textColor }}>
            le bol santé
          </span>
          <p className="text-xs font-semibold text-[#E23724] tracking-wide uppercase mt-0.5">
            The Ultimate Salad
          </p>
        </div>
      </div>
    );
  }

  // --- Full Official Brand Logo Variant (as shown in WhatsApp Image reference) ---
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center text-center select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* 1. Main Logo Graphic & Botanical Typography Lockup */}
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {/* The Tomato Swirl Leaf Emblem */}
        <BrandEmblem className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-sm transition-transform duration-300 group-hover:scale-105" />

        {/* Botanical Custom Lettering */}
        <div className="flex flex-col text-left">
          <div className="flex items-baseline font-display">
            <span
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.03em] font-display"
              style={{ color: textColor }}
            >
              le bol santé
            </span>
          </div>
        </div>
      </div>

      {/* 2. Center Botanical Leaf Divider Rule */}
      <div className="w-full max-w-md sm:max-w-lg mt-3 sm:mt-4 flex items-center justify-center gap-3">
        {/* Left Rule Line */}
        <div className={`flex-1 h-px border-t ${dividerColor}`} />

        {/* Center Botanical Leaf Accent */}
        <div className="flex items-center justify-center px-1">
          <svg
            viewBox="0 0 40 20"
            className="w-7 h-4 sm:w-8 sm:h-4 text-[#1B5E20]"
            fill="currentColor"
          >
            {/* Left Leaf */}
            <path d="M20 18 C15 12, 6 10, 2 12 C4 6, 12 4, 20 16 Z" fill={leafColor} />
            {/* Right Leaf */}
            <path d="M20 18 C25 12, 34 10, 38 12 C36 6, 28 4, 20 16 Z" fill={leafColor} />
            {/* Center stem junction */}
            <circle cx="20" cy="17" r="1.5" fill="#E23724" />
          </svg>
        </div>

        {/* Right Rule Line */}
        <div className={`flex-1 h-px border-t ${dividerColor}`} />
      </div>

      {/* 3. Official 2-Line Tagline in Clean Spaced Caps */}
      <div className="mt-2 space-y-0.5">
        <p
          className="text-xs sm:text-sm md:text-[15px] font-extrabold tracking-[0.16em] uppercase font-display"
          style={{ color: isDark ? '#ECFDF5' : '#164223' }}
        >
          FRESHLY CHOPPED, PERFECTLY BALANCED
        </p>
        <p
          className="text-[11px] sm:text-xs md:text-sm font-black tracking-[0.24em] uppercase"
          style={{ color: '#E23724' }}
        >
          THE ULTIMATE SALAD
        </p>
      </div>
    </div>
  );
};
