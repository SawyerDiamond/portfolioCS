import React, { createContext, useContext, useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// frame.io's scroll reveal, transcribed from the GSAP timeline in their
// `347-*.js` bundle:
//
//   l.fromTo($ref, { y: 200 * n, opacity: 0 },
//            { duration: .7, delay: .06, y: 0, ease: DEFAULT, stagger: .07 }, 0)
//   l.fromTo($ref, { opacity: 0 },
//            { duration: .5, opacity: 1, stagger: .07 }, "<+=0.1")
//
// So the two properties are deliberately out of phase: the element starts
// rising immediately, and only begins fading up 0.1s later over a shorter
// 0.5s window. The lift therefore finishes 0.06s *after* the fade does, which
// is what stops the arrival reading as a single flat cross-dissolve.
//
// DEFAULT is their registered ease `[.25, .1, .25, 1]` (their `h` ease map in
// the same bundle), i.e. plain CSS `ease`.
export const FRAME_EASE = [0.25, 0.1, 0.25, 1];

const Y_DURATION = 0.7;
const Y_DELAY = 0.06;
const OPACITY_DURATION = 0.5;
const OPACITY_DELAY = Y_DELAY + 0.1; // the "<+=0.1" position on their timeline

// frame.io runs every reveal at 0.07s between siblings, whether it is a bento
// grid, a text column or a logo row.
export const STAGGER = 0.07;

// Travel distances taken from the three fromTo calls on their site: 72px for
// bento cards (`.Bentos_animatedBento` in CSS), 100px for stacked columns,
// 200px for the hero-weight headline blocks.
const DISTANCE = { card: 72, column: 100, headline: 200 };

// Set by RevealGroup so its children fire together off one observer, the way
// frame.io observes a grid rather than each cell.
const GroupContext = createContext(null);

/**
 * A single revealing element. Used bare it observes itself; used inside a
 * `RevealGroup` it waits for the group and takes its stagger slot from its
 * position in the group.
 */
export const Reveal = ({
  children,
  as = "div",
  distance = "card",
  index = 0,
  delay = 0,
  className,
  ...rest
}) => {
  const group = useContext(GroupContext);
  const reduceMotion = useReducedMotion();
  const selfRef = useRef(null);
  const selfInView = useInView(selfRef, {
    once: true,
    amount: 0.15,
    margin: "0px 0px -8% 0px",
  });

  const MotionTag = motion[as] || motion.div;
  const travel = DISTANCE[distance] ?? distance;
  const active = group ? group.inView : selfInView;
  const offset = delay + index * STAGGER;

  // Reduced motion keeps the fade — losing the arrival entirely leaves the
  // page feeling broken — and drops only the translation.
  const hidden = reduceMotion ? { opacity: 0 } : { y: travel, opacity: 0 };
  const shown = reduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 };

  return (
    <MotionTag
      ref={group ? undefined : selfRef}
      className={className}
      initial={hidden}
      animate={active ? shown : hidden}
      transition={{
        y: { duration: Y_DURATION, delay: Y_DELAY + offset, ease: FRAME_EASE },
        opacity: {
          duration: OPACITY_DURATION,
          delay: OPACITY_DELAY + offset,
          ease: FRAME_EASE,
        },
      }}
      {...rest}>
      {children}
    </MotionTag>
  );
};

/**
 * Fires every `Reveal` beneath it off one observer and hands each child its
 * stagger slot, so a row arrives as a sweep rather than as N independent
 * elements crossing the fold at slightly different times.
 *
 * Direct `Reveal` children are numbered automatically. Anything rendered from
 * a `.map()` should pass its own `index`, which is respected as-is.
 */
export const RevealGroup = ({ children, as = "div", className, ...rest }) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.15,
    margin: "0px 0px -8% 0px",
  });

  const value = useMemo(() => ({ inView }), [inView]);
  const Tag = as;

  let slot = 0;
  const numbered = React.Children.map(children, (child) => {
    if (!React.isValidElement(child) || child.type !== Reveal) return child;
    if (child.props.index !== undefined) return child;
    return React.cloneElement(child, { index: slot++ });
  });

  return (
    <GroupContext.Provider value={value}>
      <Tag ref={ref} className={className} {...rest}>
        {numbered}
      </Tag>
    </GroupContext.Provider>
  );
};

export default Reveal;
