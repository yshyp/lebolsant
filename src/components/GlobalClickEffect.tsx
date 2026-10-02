import React, { useEffect, useState } from 'react';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface ClickParticle {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  emoji: string;
}

const RIPPLE_COLORS = [
  'rgba(46, 125, 50, 0.45)', // Emerald
  'rgba(230, 81, 0, 0.45)',  // Citrus Amber
  'rgba(76, 175, 80, 0.45)',  // Fresh Leaf
];

const FRESH_EMOJIS = ['✨', '🍃', '🌱', '🥑', '🥒', '🍅'];

export const GlobalClickEffect: React.FC = () => {
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const [particles, setParticles] = useState<ClickParticle[]>([]);

  useEffect(() => {
    let nextId = 0;

    const handleClick = (e: MouseEvent) => {
      // Don't spawn if clicking input, textarea or select
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return;
      }

      const x = e.clientX;
      const y = e.clientY;
      const color = RIPPLE_COLORS[Math.floor(Math.random() * RIPPLE_COLORS.length)];
      const id = ++nextId;

      // Add ripple
      setRipples((prev) => [...prev.slice(-8), { id, x, y, color }]);

      // Add 2-3 playful mini floating organic particles
      const newParticles: ClickParticle[] = [];
      const particleCount = 2;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 25 + Math.random() * 35;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist - 15; // slightly upward bias
        const emoji = FRESH_EMOJIS[Math.floor(Math.random() * FRESH_EMOJIS.length)];
        newParticles.push({
          id: id * 10 + i,
          x,
          y,
          tx,
          ty,
          emoji
        });
      }
      setParticles((prev) => [...prev.slice(-12), ...newParticles]);

      // Cleanup ripple after 600ms
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);

      // Cleanup particles after 600ms
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => Math.floor(p.id / 10) !== id));
      }, 650);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {/* Expanding organic fluid wave ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full border border-emerald-400/60"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: '60px',
            height: '60px',
            backgroundColor: ripple.color,
            boxShadow: '0 0 16px rgba(46, 125, 50, 0.25)',
            animation: 'click-ripple-wave 0.55s cubic-bezier(0.1, 0.8, 0.3, 1) forwards'
          }}
        />
      ))}

      {/* Playful micro fresh particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute text-xs"
          style={
            {
              left: `${p.x}px`,
              top: `${p.y}px`,
              '--tx': `${p.tx}px`,
              '--ty': `${p.ty}px`,
              animation: 'particle-burst 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            } as React.CSSProperties
          }
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
};
