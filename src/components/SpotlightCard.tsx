import React, { useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'motion/react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  /** Tint of the glow that follows the cursor inside the card. */
  glow?: string;
}

/**
 * Card surface where a soft light follows the cursor across it, so the border
 * and background feel like a physical material catching a highlight.
 *
 * The glow lives in an overlay element driven by motion values — no re-render
 * on pointer move.
 */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  glow = 'rgba(0, 82, 255, 0.14)'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const opacity = useMotionValue(0);

  const background = useMotionTemplate`radial-gradient(340px circle at ${mouseX}px ${mouseY}px, ${glow}, transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => opacity.set(1)}
      onMouseLeave={() => opacity.set(0)}
      className={`group/spot relative overflow-hidden ${className}`}
    >
      <motion.div
        aria-hidden="true"
        style={{ background, opacity }}
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
