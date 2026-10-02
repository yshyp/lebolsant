import React from 'react';

interface BrandEmblemProps {
  className?: string;
  size?: number | string;
  alt?: string;
}

/**
 * Official Le Bol Santé Tomato Swirl Leaf Emblem
 * Recreated with precision vector geometry matching the official brand emblem:
 * - Dynamic circular tomato cross-section swirl in vivid tomato red (#E23724)
 * - Three organic tomato seeds in earthy cocoa brown (#533221)
 * - Two botanical leaves sprouting from the top left stem in deep botanical green (#185A26)
 */
export const BrandEmblem: React.FC<BrandEmblemProps> = ({
  className = 'w-10 h-10',
  size,
  alt = 'Le Bol Santé Brand Emblem'
}) => {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      style={size ? { width: size, height: size } : undefined}
      role="img"
      aria-label={alt}
    >
      <g>
        {/* --- 1. TOP BOTANICAL STEM & LEAVES (Deep Botanical Green #175825) --- */}
        {/* Main stem curving down into the tomato crown */}
        <path
          d="M205 210 C195 180, 185 150, 195 125 C205 100, 225 75, 255 45 C230 75, 215 105, 210 135 C205 160, 202 185, 205 210 Z"
          fill="#165624"
        />
        
        {/* Left Calyx Leaf Sprout */}
        <path
          d="M175 220 C155 215, 135 220, 118 238 C135 235, 155 230, 172 238 C160 255, 145 285, 140 315 C145 280, 165 250, 182 235 C178 228, 176 223, 175 220 Z"
          fill="#175825"
        />

        {/* Small Left Leaf (mid stem) */}
        <path
          d="M185 165 C170 145, 145 130, 130 135 C120 148, 125 175, 142 195 C158 210, 178 215, 185 210 C185 195, 185 180, 185 165 Z"
          fill="#1A612A"
        />
        {/* Left Leaf Center Vein */}
        <path
          d="M185 210 C170 190, 150 170, 130 135"
          stroke="#10421A"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Big Top Right Leaf */}
        <path
          d="M210 135 C240 100, 310 75, 375 95 C360 130, 325 175, 275 190 C240 198, 220 180, 210 160 Z"
          fill="#175825"
        />
        {/* Big Leaf Center Vein */}
        <path
          d="M210 155 C265 140, 325 120, 375 95"
          stroke="#0F3D17"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Big Leaf Subtle Lateral Veins */}
        <path
          d="M260 142 C275 125, 295 115, 315 110"
          stroke="#12481C"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M290 135 C305 148, 325 155, 345 158"
          stroke="#12481C"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Top-Most Leaf Tip */}
        <path
          d="M195 125 C205 90, 235 45, 280 20 C270 50, 255 85, 240 110 C225 125, 210 130, 195 125 Z"
          fill="#1B662C"
        />
        {/* Top-Most Leaf Vein */}
        <path
          d="M198 123 C225 90, 255 55, 280 20"
          stroke="#10421A"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Stem connection into the tomato top notch */}
        <path
          d="M180 225 C190 215, 205 210, 220 215 C230 218, 245 228, 255 240 C235 235, 210 232, 195 242 C185 248, 178 255, 175 262 C172 250, 175 235, 180 225 Z"
          fill="#175825"
        />

        {/* --- 2. TOMATO CIRCULAR SWIRL BODY (Vivid Tomato Red #E23724) --- */}
        {/* Main outer dynamic swirl crescent */}
        <path
          d="M235 215 
             C275 212, 315 220, 335 232
             C300 240, 265 252, 245 272
             C290 252, 335 260, 368 285
             C395 308, 408 342, 405 380
             C400 422, 370 458, 325 475
             C280 492, 228 488, 185 465
             C155 448, 132 420, 125 385
             C118 348, 128 310, 150 280
             C165 260, 185 245, 208 232
             C185 242, 168 258, 155 278
             C135 308, 125 345, 132 382
             C140 418, 165 448, 198 465
             C235 485, 282 488, 322 472
             C362 455, 388 422, 392 382
             C395 348, 382 318, 358 298
             C328 275, 288 268, 245 285
             C268 268, 302 255, 335 248
             C315 238, 278 230, 235 232
             Z"
          fill="#E23724"
        />

        {/* Full solid outer swirl ring path for high-contrast presence */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 270 215 
             C 345 218, 410 270, 412 355 
             C 414 430, 355 488, 275 490 
             C 215 492, 162 455, 138 405 
             C 120 368, 122 325, 145 285 
             C 160 260, 185 240, 215 228 
             C 178 245, 152 275, 140 315 
             C 125 365, 135 418, 172 455 
             C 210 492, 272 502, 328 485 
             C 382 468, 420 422, 422 365 
             C 425 298, 375 235, 305 218 
             C 285 213, 255 212, 235 218 
             C 250 215, 260 215, 270 215 Z"
          fill="#D62818"
        />

        {/* Primary Tomato Ring Stroke */}
        <path
          d="M 235 222
             C 320 220, 395 280, 398 360
             C 400 435, 345 478, 275 480
             C 205 482, 145 435, 142 360
             C 140 300, 180 248, 235 222 Z"
          stroke="#E23724"
          strokeWidth="38"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Bottom Swirl Taper Accent */}
        <path
          d="M 210 472 C 265 488, 320 478, 362 445 C 310 468, 250 465, 205 448 Z"
          fill="#C41C0E"
        />

        {/* Top-Right Swirl Hook Terminal */}
        <path
          d="M 245 255 C 285 242, 325 252, 350 272 C 320 262, 285 262, 255 275 Z"
          fill="#E23724"
        />

        {/* --- 3. THREE ORGANIC TOMATO SEEDS (Earthy Cocoa Brown #52311F) --- */}
        {/* Top Left Seed */}
        <ellipse
          cx="255"
          cy="340"
          rx="15"
          ry="24"
          transform="rotate(-25 255 340)"
          fill="#533221"
        />
        {/* Seed Subtle Highlight */}
        <ellipse
          cx="253"
          cy="338"
          rx="6"
          ry="14"
          transform="rotate(-25 253 338)"
          fill="#6E442F"
          opacity="0.6"
        />

        {/* Top Right Seed */}
        <ellipse
          cx="292"
          cy="358"
          rx="15"
          ry="24"
          transform="rotate(35 292 358)"
          fill="#533221"
        />
        {/* Seed Subtle Highlight */}
        <ellipse
          cx="290"
          cy="356"
          rx="6"
          ry="14"
          transform="rotate(35 290 356)"
          fill="#6E442F"
          opacity="0.6"
        />

        {/* Bottom Center Seed */}
        <ellipse
          cx="252"
          cy="378"
          rx="22"
          ry="14"
          transform="rotate(-15 252 378)"
          fill="#533221"
        />
        {/* Seed Subtle Highlight */}
        <ellipse
          cx="250"
          cy="376"
          rx="12"
          ry="6"
          transform="rotate(-15 250 376)"
          fill="#6E442F"
          opacity="0.6"
        />
      </g>
    </svg>
  );
};
