import React, { useMemo } from "react";

import "./StripeField.scss";

// Small deterministic PRNG so the pattern is stable between renders
// (and between reloads) instead of reshuffling on every mount.
const seeded = (seed) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

/**
 * Builds a field of short, slightly-rounded horizontal bars. Colour is biased
 * by position: blue dominates the top-left, gold and pink take over as the
 * pattern moves right and down.
 */
const buildRows = ({ rows, seed }) => {
  const rand = seeded(seed);

  return Array.from({ length: rows }, (_, row) => {
    const y = row / (rows - 1);
    const count = 4 + Math.floor(rand() * 5);

    const bars = Array.from({ length: count }, () => ({
      weight: 0.4 + rand() * 2.8,
      void: rand() < 0.22,
      roll: rand(),
    }));

    const total = bars.reduce((sum, bar) => sum + bar.weight, 0);
    let cursor = 0;

    return bars.map((bar, index) => {
      const x = (cursor + bar.weight / 2) / total;
      cursor += bar.weight;

      // 0 at top-left, 1 at bottom-right
      const t = 0.55 * x + 0.45 * y;
      const blue = clamp(1 - t * 1.15, 0.04, 1);
      const gold = blue + (1 - blue) * 0.55;

      // Anchor the top-left corner in blue no matter what the roll says.
      const forcedBlue = row < 2 && index < 2;
      const tone = forcedBlue || bar.roll < blue ? "blue" : bar.roll < gold ? "gold" : "pink";

      return {
        weight: bar.weight,
        void: bar.void && !forcedBlue,
        tone,
        opacity: clamp(0.9 - y * 0.85 - x * 0.35, 0.05, 0.9),
      };
    });
  });
};

const StripeField = ({ rows = 20, seed = 20260826 }) => {
  const grid = useMemo(() => buildRows({ rows, seed }), [rows, seed]);

  return (
    <div className="stripes" aria-hidden="true">
      <div className="stripes__glow" />
      <div className="stripes__rows">
        {grid.map((bars, row) => (
          <div className="stripes__row" key={row}>
            {bars.map((bar, index) => (
              <span
                key={index}
                className={
                  bar.void ? "stripes__bar stripes__bar--void" : `stripes__bar stripes__bar--${bar.tone}`
                }
                style={{ flexGrow: bar.weight, opacity: bar.void ? 0 : bar.opacity }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StripeField;
