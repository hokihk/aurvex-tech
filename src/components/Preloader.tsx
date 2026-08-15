import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

/**
 * Brief entry curtain.
 *
 * Its real job is not theatre: the display face (Syne) loads from Google Fonts,
 * and without this the hero headline paints in the fallback and then jumps when
 * the webfont swaps in. The curtain covers exactly that window.
 *
 * It is capped hard — a visitor is never held behind a font that fails to load,
 * and on a warm cache it leaves almost immediately.
 */

const MAX_WAIT = 1600;
const MIN_SHOW = 550;

export const Preloader: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(reduceMotion === true);

  useEffect(() => {
    if (reduceMotion) {
      setDone(true);
      return;
    }

    const startedAt = performance.now();
    let cancelled = false;

    const finish = () => {
      if (cancelled) return;
      // Hold just long enough that the curtain reads as intentional rather than
      // as a flash of black.
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, MIN_SHOW - elapsed);
      window.setTimeout(() => !cancelled && setDone(true), remaining);
    };

    // Whichever comes first: fonts settled, or the hard cap.
    const cap = window.setTimeout(finish, MAX_WAIT);
    document.fonts?.ready.then(finish).catch(finish);

    return () => {
      cancelled = true;
      window.clearTimeout(cap);
    };
  }, [reduceMotion]);

  // Keep the page from scrolling underneath the curtain.
  useEffect(() => {
    if (done) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden="true"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-ground"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-2xl font-bold tracking-[0.3em] text-ink"
            >
              AURVEX<span className="text-accent">TECH</span>
            </motion.div>

            {/* Indeterminate rule — a progress bar would be a lie, since we are
                waiting on the font, not on a measurable download. */}
            <div className="h-px w-32 overflow-hidden bg-white/10">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                className="h-full w-full bg-accent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
