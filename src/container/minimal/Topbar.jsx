import React from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import { images } from "../../constants";
import ShapeIcon from "../../components/ShapeIcon/ShapeIcon";

const tabSpring = { type: "spring", stiffness: 480, damping: 42, mass: 0.8 };

// Lives on the page background, above the raised shell. The mark only exists on
// the active tab, so inactive tabs keep their natural width — the tab itself is
// layout-animated, which is what expands it smoothly as the mark arrives.
const Topbar = ({ tabs, active, onSelect }) => (
  <header className="topbar">
    <span className="topbar__brand">
      <span className="topbar__logo">
        <img src={images.logo2} alt="" aria-hidden="true" />
      </span>
      <span className="topbar__name">Sawyer Diamond</span>
    </span>

    <LayoutGroup id="topbar">
      <nav className="topbar__tabs" aria-label="Sections">
        {tabs.map((tab) => {
          const isActive = active === tab.id;

          return (
            <motion.button
              type="button"
              key={tab.id}
              layout
              transition={tabSpring}
              className={`topbar__tab${isActive ? " is-active" : ""}`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onSelect(tab.id)}>
              {isActive && (
                <motion.span
                  className="topbar__pill"
                  layoutId="topbar-pill"
                  transition={tabSpring}
                />
              )}

              {/* popLayout pulls the exiting mark out of flow so the tab can
                  shrink around it in the same layout pass. */}
              <AnimatePresence mode="popLayout" initial={false}>
                {isActive && (
                  <motion.span
                    className="topbar__tab-mark"
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.4 }}
                    transition={tabSpring}>
                    <ShapeIcon name={tab.shape} tone={tab.tone} />
                  </motion.span>
                )}
              </AnimatePresence>

              <motion.span
                className="topbar__tab-label"
                layout="position"
                transition={tabSpring}>
                {tab.label}
              </motion.span>
            </motion.button>
          );
        })}
      </nav>
    </LayoutGroup>
  </header>
);

export default Topbar;
