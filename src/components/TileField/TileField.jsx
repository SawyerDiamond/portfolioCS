import React, { useMemo } from "react";

import "./TileField.scss";

// Deterministic PRNG so the mosaic is identical on every render and reload.
const seeded = (seed) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

const COLS = 22;
const ROWS = 6;

/**
 * A mosaic of rounded tiles behind the header. Blue owns the top-left corner,
 * gold and pink surface further out, and most tiles stay as empty wells so the
 * filled ones read as highlights rather than a wall of colour.
 */
const buildTiles = (seed) => {
  const rand = seeded(seed);

  return Array.from({ length: ROWS * COLS }, (_, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x = col / (COLS - 1);
    const y = row / (ROWS - 1);

    // 0 at the top-left, 1 at the bottom-right.
    const t = clamp(0.6 * x + 0.4 * y, 0, 1);
    const roll = rand();

    // Anchor the corner: the first tiles of the first two rows are always blue.
    const anchored = row < 2 && col < 2;
    const fillChance = anchored ? 1 : clamp(0.85 - t * 0.95, 0.05, 1);
    const filled = roll < fillChance;

    const toneRoll = rand();
    const blue = clamp(1 - t * 1.05, 0.08, 1);
    const gold = blue + (1 - blue) * 0.55;
    const tone = anchored || toneRoll < blue ? "blue" : toneRoll < gold ? "gold" : "pink";

    return {
      filled,
      tone,
      // Larger accents break up the grid; never on the anchored corner.
      wide: !anchored && filled && rand() < 0.06,
      opacity: clamp(1 - t * 1.35, 0.05, 1),
    };
  });
};

const TileField = ({ seed = 20260827 }) => {
  const tiles = useMemo(() => buildTiles(seed), [seed]);

  return (
    <div className="tiles" aria-hidden="true">
      <div className="tiles__glow" />
      <div className="tiles__grid">
        {tiles.map((tile, i) => (
          <span
            key={i}
            className={[
              "tiles__tile",
              tile.filled ? `tiles__tile--${tile.tone}` : "tiles__tile--well",
              tile.wide ? "tiles__tile--wide" : "",
            ]
              .join(" ")
              .trim()}
            style={{ opacity: tile.opacity }}
          />
        ))}
      </div>
    </div>
  );
};

export default TileField;
