import React, { useEffect, useMemo, useState } from "react";

import "./ShapeField.scss";

// Grid geometry, in viewBox units. Cell shapes are authored in a 100x100 box
// and scaled down to CELL, the same trick the reference component uses.
const W = 1440;
const H = 340;
const CELL = 26;
const SCALE = CELL / 100;
const STROKE = 10;

/* ----------------------------------------------------------------- cells */

const Circle = ({ fill }) => <circle cx="50" cy="50" r="26" fill={fill} />;

const Rules = ({ fill }) => (
  <>
    <line x1="18" x2="82" y1="26" y2="26" stroke={fill} strokeWidth={STROKE} strokeLinecap="round" />
    <line x1="18" x2="82" y1="50" y2="50" stroke={fill} strokeWidth={STROKE} strokeLinecap="round" />
    <line x1="18" x2="82" y1="74" y2="74" stroke={fill} strokeWidth={STROKE} strokeLinecap="round" />
  </>
);

const Cross = ({ fill }) => (
  <>
    <line x1="22" x2="78" y1="22" y2="78" stroke={fill} strokeWidth={STROKE} strokeLinecap="round" />
    <line x1="22" x2="78" y1="78" y2="22" stroke={fill} strokeWidth={STROKE} strokeLinecap="round" />
  </>
);

const Frame = ({ fill }) => (
  <rect
    x="20"
    y="20"
    width="60"
    height="60"
    rx="18"
    fill="none"
    stroke={fill}
    strokeWidth={STROKE}
  />
);

const Slash = ({ fill }) => (
  <line x1="22" x2="78" y1="78" y2="22" stroke={fill} strokeWidth={STROKE} strokeLinecap="round" />
);

const Block = ({ fill }) => <rect x="12" y="12" width="76" height="76" rx="26" fill={fill} />;

const Empty = () => null;

// Solid shapes take a gradient fill, stroked ones take a flat accent colour.
const SHAPES = [
  { Shape: Circle, solid: true, weight: 1 },
  { Shape: Rules, solid: false, weight: 1 },
  { Shape: Cross, solid: false, weight: 1 },
  { Shape: Frame, solid: false, weight: 1 },
  { Shape: Slash, solid: false, weight: 1 },
  { Shape: Block, solid: true, weight: 2 },
];

const TONES = ["blue", "gold", "pink"];
const FLAT = { blue: "#138ef0", gold: "#fcc00a", pink: "#e938c0" };

/* ------------------------------------------------------------------ util */

const seeded = (seed) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

// Picks a shape index. `emptyWeight` grows toward the bottom of the field so
// the pattern thins out into the page instead of being cut off by a mask.
const pickShape = (rand, emptyWeight) => {
  const total = SHAPES.reduce((sum, s) => sum + s.weight, 0) + emptyWeight;
  let roll = rand() * total;

  for (let i = 0; i < SHAPES.length; i++) {
    roll -= SHAPES[i].weight;
    if (roll <= 0) return i;
  }
  return -1; // empty
};

// Blue leads, gold and pink appear more often further from the top-left.
const pickTone = (rand, t) => {
  const roll = rand();
  const blue = clamp(1 - t * 0.75, 0.35, 1);
  const gold = blue + (1 - blue) * 0.6;
  return roll < blue ? "blue" : roll < gold ? "gold" : "pink";
};

const buildCells = (seed) => {
  const rand = seeded(seed);
  const cells = [];
  const cols = Math.ceil(W / 2 / CELL);
  const rows = Math.ceil(H / CELL);

  for (let cx = 0; cx < cols; cx++) {
    for (let cy = 0; cy < rows; cy++) {
      const x = cx * CELL;
      const y = cy * CELL + 14;
      const yFrac = cy / (rows - 1);
      const xFrac = cx / (cols - 1);

      // Density falls off downward, and a little toward the centre fold.
      const emptyWeight = 3 + Math.pow(yFrac, 1.45) * 24 + xFrac * 2.5;
      const t = clamp(0.5 * xFrac + 0.5 * yFrac, 0, 1);

      cells.push({
        x,
        y,
        shape: pickShape(rand, emptyWeight),
        tone: pickTone(rand, t),
        opacity: clamp(1 - yFrac * 0.85 - xFrac * 0.15, 0.12, 1),
      });
    }
  }

  return cells;
};

/* ------------------------------------------------------------- component */

const ShapeField = ({ seed = 20260827 }) => {
  const initial = useMemo(() => buildCells(seed), [seed]);
  const [cells, setCells] = useState(initial);

  useEffect(() => setCells(initial), [initial]);

  // Re-roll a few cells at a time rather than running a timer per cell.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const rand = seeded(seed + 7);
    const id = setInterval(() => {
      setCells((prev) => {
        const next = prev.slice();
        for (let i = 0; i < 3; i++) {
          const index = Math.floor(rand() * next.length);
          const cell = next[index];
          const yFrac = cell.y / H;
          const emptyWeight = 3 + Math.pow(yFrac, 1.45) * 24;
          next[index] = { ...cell, shape: pickShape(rand, emptyWeight) };
        }
        return next;
      });
    }, 900);

    return () => clearInterval(id);
  }, [seed]);

  return (
    <div className="shapes" aria-hidden="true">
      <div className="shapes__glow" />
      <svg
        className="shapes__svg"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sf-blue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#138ef0" />
            <stop offset="100%" stopColor="#0971f0" />
          </linearGradient>
          <linearGradient id="sf-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fcc00a" />
            <stop offset="100%" stopColor="#f7991d" />
          </linearGradient>
          <linearGradient id="sf-pink" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e938c0" />
            <stop offset="100%" stopColor="#f15f79" />
          </linearGradient>
        </defs>

        {cells.map((cell, i) => {
          if (cell.shape < 0) return null;
          const { Shape, solid } = SHAPES[cell.shape];
          const fill = solid ? `url(#sf-${cell.tone})` : FLAT[cell.tone];

          return (
            <g
              key={i}
              className="shapes__cell"
              opacity={cell.opacity}
              transform={`translate(${cell.x} ${cell.y}) scale(${SCALE})`}>
              <Shape fill={fill} />
            </g>
          );
        })}

        {/* Mirrored half, so the field reads as one composition. */}
        <g transform={`translate(${W} 0) scale(-1 1)`}>
          {cells.map((cell, i) => {
            if (cell.shape < 0) return null;
            const { Shape, solid } = SHAPES[cell.shape];
            const fill = solid ? `url(#sf-${cell.tone})` : FLAT[cell.tone];

            return (
              <g
                key={`m-${i}`}
                className="shapes__cell"
                opacity={cell.opacity * 0.85}
                transform={`translate(${cell.x} ${cell.y}) scale(${SCALE})`}>
                <Shape fill={fill} />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default ShapeField;
