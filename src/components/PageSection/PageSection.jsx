import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

import "./PageSection.scss";

// A stacked background panel, modelled on frame.io's `PageSection`.
//
// Only the incoming panel animates — it slides up from `distance` to 0 as its
// own top edge crosses the viewport. The panel underneath never moves, which
// sidesteps the two-sided parallax frame.io actually runs: matching an
// entrance transform on one panel against an exit transform on its neighbour
// is exactly the kind of thing that quietly opens a gap when the two windows
// don't line up pixel-for-pixel, which is what happened here the first time.
//
// What still has to be solved is the reverse problem: while the incoming
// panel is mid-slide (still translated down), a gap would otherwise open
// above the static panel beneath it. `page-section__overscan` is the fix —
// a same-background strip glued to the static panel's real bottom edge,
// bleeding past it by exactly `distance`, so that gap uncovers more of this
// panel's own background instead of whatever is behind the page.
const PARALLAX = { base: 64, wide: 96 };

const useParallaxDistance = () => {
  const [distance, setDistance] = useState(PARALLAX.wide);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const apply = () => setDistance(query.matches ? PARALLAX.wide : PARALLAX.base);

    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return distance;
};

/**
 * @param tone     which `--section-N` fill this panel paints itself in
 * @param covers   whether this panel slides up over the previous one — false
 *                 for the first panel, which has nothing above it
 * @param covered  whether a later panel slides over this one — false for the
 *                 last panel, which needs no overscan because nothing ever
 *                 arrives on top of it
 * @param pad      "none" for a section that is already full-bleed, like the
 *                 hero, where the standard padding just adds a band of empty
 *                 panel above and below the artwork
 */
const PageSection = ({
  children,
  tone = 1,
  covers = true,
  covered = true,
  pad = "default",
  depth = 1,
  className = "",
}) => {
  const wrapperRef = useRef(null);
  const distance = useParallaxDistance();
  const reduceMotion = useReducedMotion();

  const { scrollYProgress: entering } = useScroll({
    target: wrapperRef,
    offset: ["start end", "start start"],
  });

  const y = useTransform(entering, [0, 1], [covers ? distance : 0, 0]);
  const background = `var(--section-${tone})`;

  return (
    <div
      ref={wrapperRef}
      className={`page-section__wrapper${covers ? " page-section__wrapper--overlap" : ""}`}
      style={{ zIndex: depth }}>
      <motion.div
        className={`page-section${covers ? " page-section--covers" : ""} ${className}`.trim()}
        style={{
          y: reduceMotion ? 0 : y,
          "--section-background": background,
          ...(pad === "none"
            ? { "--section-pad-top": "0px", "--section-pad-bottom": "0px" }
            : null),
        }}>
        {children}
      </motion.div>

      {covered && (
        <div
          className="page-section__overscan"
          style={{ "--section-background": background }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default PageSection;
