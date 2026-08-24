import React from "react";

import "./ShapeIcon.scss";

// Flat geometric marks in the spirit of shapes.gallery — one solid form each,
// no strokes, no detail. Authored in a 100x100 box.
const PATHS = {
  // Arch: flat base, domed top.
  arch: "M8 92 V46 A42 42 0 0 1 92 46 V92 Z",
  // Staircase: reads as progression, used for work history.
  steps: "M8 92 V58 H38 V34 H66 V8 H92 V92 Z",
  // Four-point burst.
  burst:
    "M50 4 C56 34 66 44 96 50 C66 56 56 66 50 96 C44 66 34 56 4 50 C34 44 44 34 50 4 Z",
  // Teardrop.
  drop: "M50 4 C50 4 88 46 88 62 A38 38 0 0 1 12 62 C12 46 50 4 50 4 Z",
};

const STOPS = {
  blue: ["#138ef0", "#0971f0"],
  gold: ["#fcc00a", "#f7991d"],
  pink: ["#e938c0", "#f15f79"],
};

const ShapeIcon = ({ name = "arch", tone = "blue", className = "" }) => {
  const [from, to] = STOPS[tone] || STOPS.blue;
  const gradientId = `si-${tone}`;
  const sheenId = "si-sheen";

  return (
    <span className={`shape-icon shape-icon--${tone} ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
          {/* Top-lit sheen, the SVG counterpart of the inset highlight on cards. */}
          <linearGradient id={sheenId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d={PATHS[name] || PATHS.arch} fill={`url(#${gradientId})`} />
        <path d={PATHS[name] || PATHS.arch} fill={`url(#${sheenId})`} />
      </svg>
    </span>
  );
};

export default ShapeIcon;
