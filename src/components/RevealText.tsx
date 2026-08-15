import React from 'react';
import { motion } from 'motion/react';

interface RevealTextProps {
  text: string;
  className?: string;
  /** Seconds before the first word starts moving. */
  delay?: number;
  /** Seconds between consecutive words. */
  stagger?: number;
}

/**
 * Headline that rises word by word from behind a mask.
 *
 * Each word gets its own overflow-hidden clip, so the words appear to be
 * revealed by the line itself rather than fading in. The vertical padding trick
 * keeps descenders (g, y, p) from being shaved off by the clip.
 */
export const RevealText: React.FC<RevealTextProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.055
}) => {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em] mr-[0.26em]"
        >
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.95,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};
