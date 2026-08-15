import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import logoMark from "../../assets/Logo2.svg";
import "./Loader.scss";

const SWEEP_MS = 1700;
const EXIT_MS = 500;

// Intro: the logo mark sits dim, a blue gradient wipes across it, then the
// whole thing lifts away and the hero reveals. Skipped under reduced motion
// and on repeat visits within the session.
const Loader = ({ onDone }) => {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);
  const skip = useRef(
    reduced || sessionStorage.getItem("loaderShown") === "1"
  ).current;

  useEffect(() => {
    if (skip) {
      onDone();
      return undefined;
    }
    sessionStorage.setItem("loaderShown", "1");
    const t1 = setTimeout(() => setVisible(false), SWEEP_MS);
    const t2 = setTimeout(onDone, SWEEP_MS + EXIT_MS * 0.5);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (skip) return null;

  const maskStyle = {
    WebkitMaskImage: `url(${logoMark})`,
    maskImage: `url(${logoMark})`,
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden="true">
          <motion.div
            className="loader__mark"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
            <span className="loader__base" style={maskStyle} />
            <span className="loader__fill" style={maskStyle} />
            <span className="loader__shine" style={maskStyle} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
