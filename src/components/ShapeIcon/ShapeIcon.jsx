import React, { useId } from "react";

import "./ShapeIcon.scss";

// Flat marks in the spirit of shapes.gallery — no strokes, no detail, just a
// silhouette carrying a gradient. Authored in a 100x100 box; the ones traced
// from the site's original icon set are scaled into that box from their
// source viewBox.
const PATHS = {
  // House, from a 24x24 source icon, scaled into the shared 100x100 box. The
  // door-slot is a second subpath, hollowed out by the even-odd fill rule
  // every mark here already renders with.
  home: "M9.73 32.81c-2.25 4.7-1.46 10.19 0.12 21.18l1.16 8.07c2.03 14.12 3.05 21.17 7.94 25.39S31.03 91.67 45.39 91.67h9.22c14.36 0 21.54 0 26.44-4.22s5.91-11.27 7.94-25.39l1.16-8.07c1.58-10.99 2.38-16.48 0.12-21.18s-7.05-7.55-16.63-13.26l-5.77-3.44C59.17 10.93 54.81 8.33 50 8.33s-9.16 2.59-17.87 7.78l-5.77 3.44c-9.58 5.71-14.38 8.57-16.63 13.26Z M34.38 75a3.12 3.12 0 0 1 3.12-3.12h25a3.12 3.12 0 0 1 0 6.25H37.5a3.12 3.12 0 0 1-3.12-3.12Z",
  // Speech bubble, traced from the original mail.svg. The inner curve is a
  // second subpath, so this one needs the even-odd fill rule to stay hollow.
  mail: "M100 44.44C100 7.41 91.17 0 50 0C8.82 0 0 7.84 0 44.44C0 68.05 4.17 83.33 22.92 83.33C32.94 83.33 35.92 88.09 38.69 92.53C41.11 96.39 43.37 100 50 100C56.63 100 58.89 96.39 61.31 92.53C64.08 88.09 67.06 83.33 77.08 83.33C95.83 83.33 100 68.52 100 44.44ZM73.01 38.11C74.97 39.32 75.59 41.88 74.39 43.84L74.38 43.85L74.38 43.86L74.36 43.88L74.33 43.94C74.31 43.96 74.29 43.99 74.27 44.02C74.26 44.05 74.24 44.08 74.22 44.11C74.12 44.25 73.99 44.45 73.83 44.68C73.5 45.14 73.03 45.77 72.43 46.48C71.24 47.88 69.44 49.71 67.1 51.18C64.75 52.66 61.69 53.88 58.12 53.74C54.49 53.6 50.81 52.08 47.26 48.97C46.67 48.46 46.12 48.04 45.59 47.69C43.96 46.63 42.61 46.29 41.56 46.25C40.12 46.2 38.71 46.67 37.34 47.54C35.96 48.41 34.78 49.57 33.92 50.58C33.5 51.08 33.18 51.5 32.98 51.8C32.87 51.94 32.8 52.06 32.76 52.12L32.71 52.19C31.51 54.14 28.95 54.75 26.99 53.55C25.03 52.35 24.41 49.78 25.62 47.82C25.62 47.82 25.61 47.82 29.17 50L25.62 47.82L25.62 47.82L25.62 47.81L25.64 47.79L25.67 47.73C25.7 47.69 25.74 47.63 25.78 47.56C25.88 47.41 26.01 47.22 26.17 46.99C26.5 46.53 26.97 45.9 27.57 45.19C28.76 43.79 30.56 41.96 32.9 40.49C35.25 39 38.31 37.79 41.88 37.93C45.51 38.07 49.18 39.58 52.74 42.7C53.58 43.43 54.36 43.97 55.08 44.38C56.41 45.12 57.53 45.38 58.44 45.41C59.88 45.47 61.29 44.99 62.66 44.13C64.04 43.26 65.22 42.09 66.08 41.08C66.31 40.8 66.52 40.55 66.69 40.32C66.82 40.15 66.93 40 67.02 39.87C67.13 39.72 67.2 39.61 67.25 39.54L67.28 39.49L67.29 39.48L67.29 39.48C68.49 37.53 71.05 36.91 73.01 38.11Z",
  // Lightning bolt, used for the Experience tab.
  bolt: "M55.89 0.13C53.37 -0.42 51.3 0.86 49.98 1.99C48.6 3.17 47.26 4.85 45.93 6.75C43.27 10.53 39.95 16.23 35.73 23.5L23.62 44.29C22.23 46.7 20.97 48.85 20.21 50.64C19.46 52.4 18.62 55.08 19.87 57.8C21.19 60.68 23.83 61.47 25.65 61.76C27.41 62.04 29.69 62.04 32.16 62.04L43.75 62.04L42.24 70.36C40.82 78.17 39.69 84.38 39.33 88.71C39.15 90.86 39.11 93.01 39.52 94.82C39.97 96.77 41.23 99.25 44.11 99.87C46.63 100.42 48.7 99.14 50.02 98.01C51.4 96.83 52.74 95.15 54.07 93.25C56.73 89.47 60.05 83.77 64.27 76.5L76.38 55.71C77.78 53.3 79.03 51.15 79.79 49.36C80.54 47.6 81.38 44.92 80.13 42.2C78.81 39.32 76.17 38.53 74.35 38.24C72.59 37.96 70.31 37.96 67.84 37.96L56.25 37.96L57.76 29.64C59.18 21.83 60.31 15.62 60.67 11.29C60.85 9.14 60.89 6.99 60.48 5.18C60.03 3.23 58.77 0.76 55.89 0.13Z",
  // Four-point burst.
  burst:
    "M50 4 C56 34 66 44 96 50 C66 56 56 66 50 96 C44 66 34 56 4 50 C34 44 44 34 50 4 Z",
};

const STOPS = {
  blue: ["#138ef0", "#0971f0"],
  gold: ["#fcc00a", "#f7991d"],
  pink: ["#e938c0", "#f15f79"],
  // Fourth accent: electric blue. Runs a much wider light-to-dark span than
  // `blue` does, and starts up near cyan, so the two never read as the same
  // ramp even though they share a hue family.
  electric: ["#5fdcff", "#0b48ff"],
};

const DEFAULT_SHEEN = 0.55;
// Blue is the one tone that also exists as a solid button fill
// (`--blue-gradient`, the same two stops as `STOPS.blue`), so it's the one
// place the mismatch between "icon with a bright top sheen" and "button with
// none" is most visible. Turned down, not off — the icon still reads as lit
// from above, just closer to the button's flatter, more saturated look.
const SHEEN = { blue: 0.28 };

const ShapeIcon = ({ name = "home", tone = "blue", className = "" }) => {
  const [from, to] = STOPS[tone] || STOPS.blue;

  // Per-instance, not per-tone. Every instance emits its own <defs>, so a
  // shared id means the first one in the document defines the paint for all
  // of them — and if that first one happens to be inside a `display: none`
  // subtree, the reference resolves to nothing and every icon of that tone
  // paints transparent. That is exactly what happened to the gold bolt below
  // 768px, where the nav (which owns the first gold mark) is hidden.
  const uid = useId();
  const gradientId = `si-${tone}-${uid}`;
  const sheenId = `si-sheen-${tone}-${uid}`;
  const sheen = SHEEN[tone] ?? DEFAULT_SHEEN;

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
            <stop offset="0%" stopColor="#ffffff" stopOpacity={sheen} />
            <stop offset="55%" stopColor="#ffffff" stopOpacity={sheen * 0.11} />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d={PATHS[name] || PATHS.home}
          fill={`url(#${gradientId})`}
          fillRule="evenodd"
        />
        <path
          d={PATHS[name] || PATHS.home}
          fill={`url(#${sheenId})`}
          fillRule="evenodd"
        />
      </svg>
    </span>
  );
};

export default ShapeIcon;
