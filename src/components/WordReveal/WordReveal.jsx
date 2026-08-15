import React from "react";
import { motion } from "framer-motion";

import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import "./WordReveal.scss";

const unitVariants = {
  hidden: { opacity: 0, y: 6, filter: "blur(var(--blur-reveal, 24px))" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

/**
 * Word-by-word blur reveal. String children split on whitespace; element
 * children (e.g. the hero's gradient spans) reveal as whole units — the blur
 * animates on the outer wrapper while background-clip:text stays on the inner
 * element (Safari rasterizes filter + clip-text on one element badly).
 *
 * Trigger: `inView` (section headings) or the `active` flag (loader-gated).
 *
 * `lines` mode (section headings): pass [{ text, className }] — each line's
 * words reveal individually, keeping the line's class (two-tone dim/bright),
 * with a line break after each line.
 */
const WordReveal = ({
  as: Tag = "h1",
  className = "",
  stagger = 0.05,
  delay = 0,
  inView = false,
  active = true,
  lines = null,
  children,
}) => {
  const reduced = usePrefersReducedMotion();

  const units = lines
    ? lines.flatMap((line, i) => {
        const words = line.text.split(/\s+/).filter(Boolean);
        return words.map((word, j) => ({
          key: `l${i}-${j}`,
          node: <span className={line.className}>{word}</span>,
          breakAfter: j === words.length - 1 && i < lines.length - 1,
        }));
      })
    : React.Children.toArray(children).flatMap((child, i) =>
        typeof child === "string"
          ? child
              .split(/\s+/)
              .filter(Boolean)
              .map((word, j) => ({ key: `${i}-${j}`, node: word }))
          : [{ key: `el-${i}`, node: child }]
      );

  if (reduced) {
    return (
      <Tag className={className}>
        {units.map(({ key, node, breakAfter }) => (
          <React.Fragment key={key}>
            <span className="wr__unit">{node} </span>
            {breakAfter && <br />}
          </React.Fragment>
        ))}
      </Tag>
    );
  }

  const MotionTag = motion[Tag] ?? motion.div;
  const trigger = inView
    ? {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.4 },
      }
    : { initial: "hidden", animate: active ? "visible" : "hidden" };

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      {...trigger}>
      {units.map(({ key, node, breakAfter }) => (
        <React.Fragment key={key}>
          <motion.span className="wr__unit" variants={unitVariants}>
            {node}{" "}
          </motion.span>
          {breakAfter && <br />}
        </React.Fragment>
      ))}
    </MotionTag>
  );
};

export default WordReveal;
