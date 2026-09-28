import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const tagPos = useRef({ x: -100, y: -100 });

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    // Touch detection: if user touches screen, disable custom cursor to avoid ghost cursors
    const onTouchStart = () => {
      setIsTouchDevice(true);
      document.body.classList.remove('custom-cursor-active');
    };
    window.addEventListener('touchstart', onTouchStart, { once: true });

    const onMouseMove = (e: MouseEvent) => {
      if (isTouchDevice) return;

      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) {
        setIsVisible(true);
        document.body.classList.add('custom-cursor-active');
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Buttons, links, inputs have priority: never obscure buttons with content tags!
      const buttonEl = target.closest('button, a, input, select, textarea, [role="button"]') as HTMLElement | null;
      if (buttonEl) {
        setIsHovered(true);
        const specificCursor = buttonEl.getAttribute('data-cursor');
        setCursorText(specificCursor || '');
        return;
      }

      // 2. Content cards with editorial data-cursor
      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorEl) {
        setIsHovered(true);
        setCursorText(cursorEl.getAttribute('data-cursor') || '');
        return;
      }

      // 3. Normal idle state
      setIsHovered(false);
      setCursorText('');
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => {
      if (!isTouchDevice) setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.body.classList.remove('custom-cursor-active');
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible, isTouchDevice]);

  // Inertial fluid physics loop
  useEffect(() => {
    if (isTouchDevice) return;

    const animate = () => {
      // Direct high-accuracy tracking for center dot (instant click precision)
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.75;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.75;

      // Smooth luxury damping for outer hairline follower ring
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.2;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.2;

      // Smooth lag for contextual pill tag
      tagPos.current.x += (mousePos.current.x - tagPos.current.x) * 0.25;
      tagPos.current.y += (mousePos.current.y - tagPos.current.y) * 0.25;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (tagRef.current) {
        tagRef.current.style.transform = `translate3d(${tagPos.current.x}px, ${tagPos.current.y}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[10000] overflow-hidden transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 1. Precision Center Pin-Dot (Always at exact pointer tip) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isMouseDown
              ? 'w-1 h-1 bg-champagne scale-75'
              : isHovered
              ? 'w-2 h-2 bg-champagne shadow-[0_0_8px_rgba(197,168,128,0.8)]'
              : 'w-1.5 h-1.5 bg-ivory shadow-[0_0_6px_rgba(255,255,255,0.7)]'
          }`}
        />
      </div>

      {/* 2. Fluid Hairline Follower Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ease-out ${
            isMouseDown
              ? 'w-6 h-6 border-champagne/90 bg-champagne/15 scale-90'
              : isHovered && !cursorText
              ? 'w-11 h-11 border-champagne/80 bg-champagne/[0.08] backdrop-blur-[1px]'
              : 'w-7 h-7 border-white/30 bg-transparent'
          }`}
        />
      </div>

      {/* 3. Floating Architectural Pill Tag (Offset cleanly to bottom-right, NEVER blocks the pointer) */}
      <div
        ref={tagRef}
        className={`fixed top-0 left-0 pointer-events-none will-change-transform transition-all duration-200 ${
          cursorText ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        {cursorText && (
          <div className="ml-4 mt-4 px-3 py-1.5 rounded-full bg-obsidian/90 border border-champagne/50 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.8)] flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ivory font-medium select-none whitespace-nowrap">
              {cursorText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
