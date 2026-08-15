import React from 'react';

const ITEMS = [
  'Strategy',
  'Design',
  'Development',
  'Growth',
  'From Ambitious Ideas to Exceptional Digital Products',
  'Custom Software',
  'Digital Product Architecture',
  'Brand Experience'
];

const Track: React.FC<{ hidden?: boolean }> = ({ hidden }) => (
  <div className="flex shrink-0 items-center gap-12 px-6" aria-hidden={hidden || undefined}>
    {ITEMS.map((item, idx) => (
      <React.Fragment key={idx}>
        <span className="font-display font-semibold text-xs md:text-sm tracking-[0.25em] text-ink-2 uppercase hover:text-white transition-colors">
          {item}
        </span>
        <span className="text-accent font-bold text-sm">×</span>
      </React.Fragment>
    ))}
  </div>
);

export const TrustTicker: React.FC = () => {
  return (
    // Slightly raised, slightly translucent: reads as a panel laid over the
    // page ground rather than another slab of the same black.
    <div id="trust" className="w-full bg-panel/85 backdrop-blur-sm border-y border-white/5 py-5 overflow-hidden relative z-20 group">
      {/* w-max is required: the marquee keyframe shifts the track by -50%, which
          only equals exactly one copy when the track is sized to its content. */}
      <div className="flex w-max whitespace-nowrap animate-[marquee_35s_linear_infinite] group-hover:[animation-play-state:paused]">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
};
