import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  const dotElRef = useRef<HTMLDivElement>(null);
  const ringElRef = useRef<HTMLDivElement>(null);
  const badgeElRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsPointerFine(mediaQuery.matches);

    if (mediaQuery.matches) {
      document.body.classList.add('custom-cursor-active');
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorEl) {
        setIsHovered(true);
        setCursorText(cursorEl.getAttribute('data-cursor') || '');
      } else {
        const clickable = target.closest('button, a, input, select, [role="button"]') as HTMLElement | null;
        if (clickable) {
          setIsHovered(true);
          setCursorText('');
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.classList.remove('custom-cursor-active');
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Smooth lerp physics without any disorienting rotation
  useEffect(() => {
    if (!isPointerFine) return;

    const animate = () => {
      // Precise inner reticle follows directly
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.45;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.45;

      // Outer delicate ring follows with fluid damping
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      if (dotElRef.current) {
        dotElRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }

      if (ringElRef.current) {
        ringElRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      // Elegant contextual label floats slightly offset to top-right, perfectly upright
      if (badgeElRef.current) {
        badgeElRef.current.style.transform = `translate3d(${ringPos.current.x + 18}px, ${ringPos.current.y - 28}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPointerFine]);

  if (!isPointerFine) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden select-none">
      {/* Outer Subtle Hairline Ring */}
      <div
        ref={ringElRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center pointer-events-none"
      >
        <div
          className={`rounded-full transition-all duration-300 ease-luxury ${
            isHovered
              ? 'w-10 h-10 border border-champagne bg-champagne/[0.06] scale-110 shadow-[0_0_15px_rgba(197,168,128,0.25)]'
              : 'w-6 h-6 border border-white/30 bg-transparent'
          }`}
        />
      </div>

      {/* Center Micro-Pin Reticle */}
      <div
        ref={dotElRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none"
      >
        <div
          className={`w-1 h-1 rounded-full transition-all duration-200 ${
            isHovered ? 'bg-champagne scale-125' : 'bg-ivory'
          }`}
        />
      </div>

      {/* Upright, Minimalist Floating Contextual Label (Never covers the product, never rotates) */}
      <div
        ref={badgeElRef}
        className={`fixed top-0 left-0 will-change-transform transition-all duration-200 pointer-events-none ${
          cursorText
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        {cursorText && (
          <div className="flex items-center space-x-1.5 bg-obsidian/90 border border-champagne/40 px-3 py-1.5 shadow-2xl backdrop-blur-md rounded-none">
            <span className="w-1 h-1 rounded-full bg-champagne animate-ping" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ivory font-medium whitespace-nowrap">
              {cursorText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
