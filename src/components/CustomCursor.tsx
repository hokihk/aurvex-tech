import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports touch only or screen size is small
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setIsVisible(true);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check context element under cursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorAttr) {
        setCursorText(cursorAttr);
        setIsHovered(true);
      } else if (target.closest('a, button, [role="button"]')) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden lg:block">
      {/* Primary Small Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-ink mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovered ? 0.5 : 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />

      {/* Outer Context Ring / Badge */}
      <motion.div
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-colors duration-200 ${
          cursorText
            ? 'bg-accent text-white px-4 py-2 border border-blue-400/30 shadow-lg shadow-blue-600/30'
            : 'bg-white/10 border border-white/20 text-white'
        }`}
        animate={{
          x: position.x - (cursorText ? 60 : 20),
          y: position.y - (cursorText ? 20 : 20),
          width: cursorText ? 'auto' : 40,
          height: cursorText ? 'auto' : 40,
          scale: isHovered ? 1.1 : 0.8,
          opacity: isHovered || cursorText ? 1 : 0.4
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.2 }}
      >
        {cursorText && (
          <span className="whitespace-nowrap px-1 text-[11px] font-medium tracking-widest">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
};
