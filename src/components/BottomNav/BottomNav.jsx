import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useScrollContext } from "../../context/ScrollContext";
import { images, icons } from "../../constants";
// The two saved materials: `.mat` is the pill's surface, `.glass`/`.gbtn` are
// its controls. Both are standalone — BottomNav.scss only retints them.
import "../../styles/card-material.css";
import "../../styles/glass-buttons.css";
import "./BottomNav.scss";

const springy = { type: "spring", stiffness: 500, damping: 40 };

const LINKS = [
  { id: "Home", label: "Home" },
  { id: "Experience", label: "Experience" },
  { id: "Projects", label: "Projects" },
];

const BottomNav = () => {
  const { scrollToSection, activeSection } = useScrollContext();

  return (
    <motion.nav
      className="bottomnav"
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
      aria-label="Site navigation">
      <motion.div className="bottomnav__pill mat" layout transition={springy}>
        <motion.button
          layout
          className="bottomnav__logo gbtn gbtn--icon gbtn--sm glass"
          onClick={() => scrollToSection("Home")}
          aria-label="Back to start">
          <img src={images.logo2} alt="" />
        </motion.button>

        <motion.span layout className="bottomnav__rule" aria-hidden="true" />

        <ul className="bottomnav__links">
          {LINKS.map(({ id, label }) => {
            const active = activeSection === id;
            return (
              <motion.li layout key={id} className="bottomnav__item">
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="bottomnav__indicator glass"
                    transition={springy}
                  />
                )}
                <button
                  className={`bottomnav__link gbtn ${active ? "is-active" : ""}`.trim()}
                  onClick={() => scrollToSection(id)}
                  aria-current={active ? "true" : undefined}>
                  <span className="bottomnav__glyph">
                    <img src={icons[id]} alt="" />
                  </span>
                  <span className="bottomnav__label">{label}</span>
                </button>
              </motion.li>
            );
          })}
        </ul>

        <AnimatePresence mode="popLayout" initial={false}>
          {activeSection !== "Contact" && (
            <motion.button
              key="cta"
              layout
              className="bottomnav__cta gbtn gbtn--blue glass"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={springy}
              onClick={() => scrollToSection("Contact")}>
              Contact
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
};

export default BottomNav;
