import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import "./Nav.scss";
import { images } from "../../constants";
import ShapeIcon from "../ShapeIcon/ShapeIcon";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import useActiveSection from "../../hooks/useActiveSection";

const tabSpring = { type: "spring", stiffness: 480, damping: 42, mass: 0.8 };

// Section ids match the anchors set by the Wrap HOC.
const TABS = [
  { id: "Home", label: "Home", shape: "home", tone: "blue" },
  { id: "Experience", label: "Experience", shape: "bolt", tone: "gold" },
  { id: "Projects", label: "Projects", shape: "burst", tone: "pink" },
  { id: "Contact", label: "Contact", shape: "mail", tone: "electric" },
];

const SECTIONS = TABS.map((tab) => tab.id);

// Floating bar centred at the bottom of the page. The mark only exists on the
// active tab, so inactive tabs keep their natural width — the tab itself is
// layout-animated, which is what expands it smoothly as the mark arrives.
const Nav = () => {
  const { isMobile } = useDeviceDetect();
  const active = useActiveSection(SECTIONS);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Over the hero the bar is always up. Past it, it tracks scroll direction:
  // reading down tucks it away, and any upward scroll brings it straight back
  // rather than making you return to the top for it.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const hero = document.getElementById("Home");
      const heroEnd = hero
        ? hero.offsetTop + hero.offsetHeight
        : window.innerHeight;

      // The threshold is the hero's end minus a viewport, i.e. the point where
      // the hero has just finished passing out of view.
      if (y <= Math.max(heroEnd - window.innerHeight, 0)) {
        setHidden(false);
      } else if (Math.abs(y - lastY.current) > 4) {
        setHidden(y > lastY.current);
      }

      lastY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSelect = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <motion.header
      style={{ x: "-50%" }}
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: hidden ? 140 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className={`bottombar ${isMobile ? "hidden" : ""}`}>
      <span className="bottombar__brand">
        <span className="bottombar__logo">
          <img src={images.logo2} alt="" aria-hidden="true" />
        </span>
        <span className="bottombar__name">Sawyer</span>
      </span>

      <LayoutGroup id="bottombar">
        <nav className="bottombar__tabs" aria-label="Sections">
          {TABS.map((tab) => {
            const isActive = active === tab.id;

            return (
              <motion.button
                type="button"
                key={tab.id}
                layout
                transition={tabSpring}
                className={`bottombar__tab${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => handleSelect(tab.id)}>
                {isActive && (
                  <motion.span
                    className="bottombar__pill"
                    layoutId="bottombar-pill"
                    transition={tabSpring}
                  />
                )}

                {/* popLayout pulls the exiting mark out of flow so the tab can
                    shrink around it in the same layout pass. */}
                <AnimatePresence mode="popLayout" initial={false}>
                  {isActive && (
                    <motion.span
                      className="bottombar__tab-mark"
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.4 }}
                      transition={tabSpring}>
                      <ShapeIcon name={tab.shape} tone={tab.tone} />
                    </motion.span>
                  )}
                </AnimatePresence>

                <motion.span
                  className="bottombar__tab-label"
                  layout="position"
                  transition={tabSpring}>
                  {tab.label}
                </motion.span>
              </motion.button>
            );
          })}
        </nav>
      </LayoutGroup>
    </motion.header>
  );
};

export default Nav;
