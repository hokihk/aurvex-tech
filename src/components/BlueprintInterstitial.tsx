import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useReducedMotion,
  MotionValue
} from 'motion/react';

/**
 * The transition between the methodology and the approach: a structural
 * schematic that builds itself, foundation upward, as you scroll through it.
 *
 * It exists because the pinned process section used to release into dead black
 * space. Rather than padding that gap, the gap became the drawing — the scroll
 * you were spending on nothing now spends itself constructing the diagram, and
 * the bottom-up build order restates "from idea to market" as a picture.
 */

const ACCENT = '#0052FF';
const FAINT = 'rgba(255,255,255,0.14)';

/** A stroke that draws itself between two points on the build timeline. */
const Draw: React.FC<{
  d: string;
  progress: MotionValue<number>;
  from: number;
  to: number;
  stroke?: string;
  width?: number;
}> = ({ d, progress, from, to, stroke = ACCENT, width = 1.5 }) => {
  const pathLength = useTransform(progress, [from, to], [0, 1], { clamp: true });
  const opacity = useTransform(progress, [from, from + 0.015], [0, 1], { clamp: true });

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      style={{ pathLength, opacity }}
    />
  );
};

/** A joint in the structure, popping in once its members have arrived. */
const Node: React.FC<{
  cx: number;
  cy: number;
  progress: MotionValue<number>;
  at: number;
  r?: number;
}> = ({ cx, cy, progress, at, r = 5 }) => {
  const scale = useTransform(progress, [at, at + 0.05], [0, 1], { clamp: true });
  const opacity = useTransform(progress, [at, at + 0.05], [0, 1], { clamp: true });

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill="#070707"
      stroke={ACCENT}
      strokeWidth={1.5}
      // fill-box so the circle scales about itself rather than the SVG origin.
      style={{ scale, opacity, transformBox: 'fill-box', transformOrigin: 'center' }}
    />
  );
};

/** Legend row used by the compact layout, where in-SVG captions cannot survive
    the scale-down: at phone widths the wide viewBox shrinks by ~4x, which would
    render 17px caption text at roughly 4px. These are real DOM text instead. */
const LegendRow: React.FC<{
  index: string;
  text: string;
  progress: MotionValue<number>;
  at: number;
}> = ({ index, text, progress, at }) => {
  const opacity = useTransform(progress, [at, at + 0.07], [0.25, 1], { clamp: true });
  const x = useTransform(progress, [at, at + 0.07], [-8, 0], { clamp: true });

  return (
    <motion.div style={{ opacity, x }} className="flex items-center gap-3">
      <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-accent">
        {index}
      </span>
      <span className="h-px w-4 bg-white/20" />
      <span className="font-mono text-xs font-semibold tracking-[0.12em] text-ink">
        {text}
      </span>
    </motion.div>
  );
};

/** Leader line + caption naming each tier of the structure. */
const Caption: React.FC<{
  x: number;
  y: number;
  leaderFrom: number;
  index: string;
  text: string;
  progress: MotionValue<number>;
  at: number;
}> = ({ x, y, leaderFrom, index, text, progress, at }) => {
  const opacity = useTransform(progress, [at, at + 0.07], [0, 1], { clamp: true });
  const shift = useTransform(progress, [at, at + 0.07], [-14, 0], { clamp: true });

  return (
    <>
      <Draw
        d={`M${leaderFrom},${y} H${x - 14}`}
        progress={progress}
        from={at}
        to={at + 0.06}
        stroke={FAINT}
        width={1}
      />
      <motion.g style={{ opacity, x: shift }}>
        <text
          x={x}
          y={y - 9}
          fill={ACCENT}
          fontSize="13"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          letterSpacing="2"
        >
          {index}
        </text>
        <text
          x={x}
          y={y + 12}
          fill="#F7F7F5"
          fontSize="17"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
          letterSpacing="1.5"
        >
          {text}
        </text>
      </motion.g>
    </>
  );
};

export const BlueprintInterstitial: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // The drawing completes while the section sits in the middle of the viewport,
  // leaving the finished structure on screen as you scroll out of it.
  const scrolled = useTransform(scrollYProgress, [0.12, 0.68], [0, 1]);
  const completed = useMotionValue(1);
  const build = reduceMotion ? completed : scrolled;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden border-b border-white/10 px-6 py-24 md:px-12 md:py-32"
    >
      {/* Blueprint grid + a low cobalt wash behind the drawing */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, #000 30%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 65% at 50% 50%, #000 30%, transparent 78%)'
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.07] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Caption rail */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-4 block font-mono text-xs font-semibold uppercase tracking-[0.3em] text-ink-3">
              [ ANATOMY OF A BUILD ]
            </span>
            <h2 className="max-w-2xl font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">
              Structure first.
              <br />
              <span className="text-ink-3">Everything else follows.</span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-ink-2">
            Nothing is decorated onto the surface. Each layer carries the one above
            it — infrastructure, architecture, experience, product.
          </p>
        </div>

        {/* ---- Compact layout: taller, narrower, captions in real DOM text ---- */}
        <div className="md:hidden">
          <svg
            viewBox="0 0 360 460"
            className="w-full"
            role="img"
            aria-label="Diagram: infrastructure supports architecture, which supports experience, which supports the product."
          >
            <Draw d="M20,400 H340" progress={build} from={0} to={0.14} stroke={FAINT} width={2} />
            {Array.from({ length: 9 }).map((_, i) => {
              const x = 20 + i * 40;
              return (
                <Draw
                  key={`m-tick-${x}`}
                  d={`M${x},400 V412`}
                  progress={build}
                  from={0.08 + i * 0.006}
                  to={0.16 + i * 0.006}
                  stroke={FAINT}
                  width={1}
                />
              );
            })}

            {[70, 180, 290].map((x, i) => (
              <Draw
                key={`m-col1-${x}`}
                d={`M${x},400 V300`}
                progress={build}
                from={0.16 + i * 0.03}
                to={0.3 + i * 0.03}
              />
            ))}
            <Draw d="M70,300 H290" progress={build} from={0.3} to={0.42} width={2} />
            <Draw d="M70,400 L125,300" progress={build} from={0.34} to={0.46} stroke={FAINT} />
            <Draw d="M290,400 L235,300" progress={build} from={0.34} to={0.46} stroke={FAINT} />

            {[125, 235].map((x, i) => (
              <Draw
                key={`m-col2-${x}`}
                d={`M${x},300 V205`}
                progress={build}
                from={0.44 + i * 0.03}
                to={0.56 + i * 0.03}
              />
            ))}
            <Draw d="M125,205 H235" progress={build} from={0.54} to={0.64} width={2} />
            <Draw d="M125,300 L180,205" progress={build} from={0.6} to={0.7} stroke={FAINT} />
            <Draw d="M235,300 L180,205" progress={build} from={0.6} to={0.7} stroke={FAINT} />

            <Draw d="M180,205 V112" progress={build} from={0.68} to={0.78} width={2} />
            <Draw
              d="M180,95 m-17,0 a17,17 0 1,0 34,0 a17,17 0 1,0 -34,0"
              progress={build}
              from={0.76}
              to={0.88}
              width={2}
            />

            {[
              { cx: 70, cy: 400, at: 0.2 },
              { cx: 180, cy: 400, at: 0.23 },
              { cx: 290, cy: 400, at: 0.26 },
              { cx: 70, cy: 300, at: 0.34 },
              { cx: 125, cy: 300, at: 0.44 },
              { cx: 180, cy: 300, at: 0.38 },
              { cx: 235, cy: 300, at: 0.44 },
              { cx: 290, cy: 300, at: 0.4 },
              { cx: 125, cy: 205, at: 0.6 },
              { cx: 180, cy: 205, at: 0.68 },
              { cx: 235, cy: 205, at: 0.6 }
            ].map((n) => (
              <Node key={`m-${n.cx}-${n.cy}`} cx={n.cx} cy={n.cy} progress={build} at={n.at} r={4} />
            ))}
            <Node cx={180} cy={95} progress={build} at={0.86} r={6} />
          </svg>

          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-white/10 pt-6">
            <LegendRow index="01" text="INFRASTRUCTURE" progress={build} at={0.2} />
            <LegendRow index="02" text="ARCHITECTURE" progress={build} at={0.42} />
            <LegendRow index="03" text="EXPERIENCE" progress={build} at={0.64} />
            <LegendRow index="04" text="PRODUCT" progress={build} at={0.88} />
          </div>
        </div>

        {/* ---- Wide layout: captions live inside the drawing ---- */}
        <svg
          viewBox="0 0 1280 620"
          className="hidden w-full md:block"
          role="img"
          // Only one of the two layouts is ever displayed, so only one is in the
          // accessibility tree — both may safely carry the same label.
          aria-label="Diagram: infrastructure supports architecture, which supports experience, which supports the product."
        >
          {/* ---- Foundation ---- */}
          <Draw d="M80,540 H980" progress={build} from={0} to={0.14} stroke={FAINT} width={2} />
          {Array.from({ length: 10 }).map((_, i) => {
            const x = 80 + i * 100;
            return (
              <Draw
                key={`tick-${x}`}
                d={`M${x},540 V556`}
                progress={build}
                from={0.08 + i * 0.006}
                to={0.16 + i * 0.006}
                stroke={FAINT}
                width={1}
              />
            );
          })}

          {/* ---- Tier 1: columns up to the architecture beam ---- */}
          {[200, 530, 860].map((x, i) => (
            <Draw
              key={`col1-${x}`}
              d={`M${x},540 V380`}
              progress={build}
              from={0.16 + i * 0.03}
              to={0.3 + i * 0.03}
            />
          ))}
          <Draw d="M200,380 H860" progress={build} from={0.3} to={0.42} width={2} />

          {/* Diagonal bracing — the detail that makes it read as engineered */}
          <Draw d="M200,540 L365,380" progress={build} from={0.34} to={0.46} stroke={FAINT} />
          <Draw d="M860,540 L695,380" progress={build} from={0.34} to={0.46} stroke={FAINT} />

          {/* ---- Tier 2: columns up to the experience beam ---- */}
          {[365, 695].map((x, i) => (
            <Draw
              key={`col2-${x}`}
              d={`M${x},380 V240`}
              progress={build}
              from={0.44 + i * 0.03}
              to={0.56 + i * 0.03}
            />
          ))}
          <Draw d="M365,240 H695" progress={build} from={0.54} to={0.64} width={2} />
          <Draw d="M365,380 L530,240" progress={build} from={0.6} to={0.7} stroke={FAINT} />
          <Draw d="M695,380 L530,240" progress={build} from={0.6} to={0.7} stroke={FAINT} />

          {/* ---- Mast and apex ---- */}
          <Draw d="M530,240 V132" progress={build} from={0.68} to={0.78} width={2} />
          <Draw
            d="M530,110 m-22,0 a22,22 0 1,0 44,0 a22,22 0 1,0 -44,0"
            progress={build}
            from={0.76}
            to={0.88}
            width={2}
          />

          {/* ---- Joints ---- */}
          {[
            { cx: 200, cy: 540, at: 0.2 },
            { cx: 530, cy: 540, at: 0.23 },
            { cx: 860, cy: 540, at: 0.26 },
            { cx: 200, cy: 380, at: 0.34 },
            { cx: 365, cy: 380, at: 0.44 },
            { cx: 530, cy: 380, at: 0.38 },
            { cx: 695, cy: 380, at: 0.44 },
            { cx: 860, cy: 380, at: 0.4 },
            { cx: 365, cy: 240, at: 0.6 },
            { cx: 530, cy: 240, at: 0.68 },
            { cx: 695, cy: 240, at: 0.6 }
          ].map((n) => (
            <Node key={`${n.cx}-${n.cy}`} cx={n.cx} cy={n.cy} progress={build} at={n.at} />
          ))}
          <Node cx={530} cy={110} progress={build} at={0.86} r={7} />

          {/* ---- Captions ---- */}
          <Caption
            x={1024}
            y={540}
            leaderFrom={990}
            index="01"
            text="INFRASTRUCTURE"
            progress={build}
            at={0.2}
          />
          <Caption
            x={1024}
            y={380}
            leaderFrom={874}
            index="02"
            text="ARCHITECTURE"
            progress={build}
            at={0.42}
          />
          <Caption
            x={1024}
            y={240}
            leaderFrom={709}
            index="03"
            text="EXPERIENCE"
            progress={build}
            at={0.64}
          />
          <Caption
            x={1024}
            y={110}
            leaderFrom={560}
            index="04"
            text="PRODUCT"
            progress={build}
            at={0.88}
          />
        </svg>
      </div>
    </section>
  );
};
