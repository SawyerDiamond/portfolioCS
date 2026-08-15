import {
  Shader,
  ConcentricSpin,
  FilmGrain,
  Flip,
  Plasma,
  RadialGradient,
} from "shaders/react";

// "Metallic Rings 1" (shaders.com preset c531cc9f), retuned for the site:
// dark navy, mirrored horizontally, with the innermost rings gold and the
// outermost rings blue.
//
// HOW THE RING COLOURS WORK
//
// `ConcentricSpin` has no per-ring colour input — the rings you see are bands
// of whatever is underneath it, each rotated by a different amount. So the way
// to colour a ring is to colour the material *before* it gets ringed.
//
// The RadialGradient below shares ConcentricSpin's exact centre, so its colour
// varies purely with distance from that centre — the same quantity that
// defines a ring. ConcentricSpin only ever rotates *within* a ring, and
// rotation preserves radius, so each colour band survives the distortion
// intact and lands on exactly one ring.
//
// It is composited with `blendMode="color"`, which takes hue and saturation
// from the gradient but luminosity from the plasma underneath. The metallic
// shading, contrast and grain all survive untouched; only the hue changes.
// The mid stops are held at the base navy, so rings between the two accent
// bands are mathematically identical to the untinted original.
//
// Layer order is load-bearing: gradient → ConcentricSpin (so the colour is
// ringed, not painted over the rings) → Flip (so the mirror carries both).
export default function ShaderEffect() {
  return (
    <Shader>
      <Plasma
        balance={35}
        colorA="#16345c"
        colorB="#04070f"
        colorSpace="oklab"
        contrast={0.7}
        density={0.6}
        intensity={2}
        speed={1.2}
        warp={0.45}
      />

      {/* Radial colour ramp, keyed to ring index. rings={10}, so each 0.1 of
          the radius is roughly one ring. */}
      <RadialGradient
        center={{ x: 0, y: 1 }}
        // Must span the full diagonal from the centre corner. At radius={1}
        // the far corner falls outside the ramp and wraps back to stop 0,
        // which put gold in the top-left as well as the bottom-right.
        radius={1.55}
        colorSpace="oklab"
        // A perceptual lerp toward the ramp, NOT `color`/`hue`. `color`
        // replaces saturation everywhere and blows the whole frame out to
        // electric blue; `hue` can't separate blue from navy at all, since
        // they differ in saturation rather than hue. Lerping lets the two
        // middle stops sit on the plasma's own navy, so those rings come out
        // essentially unchanged while the two ends genuinely shift colour.
        blendMode="normal-oklab"
        opacity={0.5}
        stops={[
          { color: "#fcc00a", position: 0.0 }, // ring 1 — gold
          { color: "#c9790d", position: 0.1 }, // ring 2 — deep gold
          { color: "#0b1830", position: 0.22 }, // back to the plasma's navy
          { color: "#0b1830", position: 0.66 }, // …held, so mid rings = identity
          { color: "#1c86e0", position: 0.82 }, // outer rings — blue
          { color: "#3aa5ff", position: 0.95 },
        ]}
      />

      <ConcentricSpin
        center={{
          x: 0,
          y: 1,
        }}
        intensity={60}
        rings={10}
        smoothness={0.08}
        speedRandomness={1}
      />

      {/* Mirror: ring centre moves bottom-left → bottom-right, so the gold
          rings sit bottom-right and the blue ones sweep the top-left. */}
      <Flip flipX />

      <FilmGrain strength={0.05} />
    </Shader>
  );
}
