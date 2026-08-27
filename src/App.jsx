import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Topbar from "./container/minimal/Topbar";
import Intro from "./container/minimal/Intro";
import Projects from "./container/minimal/Projects";
import Work from "./container/minimal/Work";
import Stack from "./container/minimal/Stack";
import Footer from "./container/minimal/Footer";
import "./styles/Minimal.scss";

// The page never scrolls as a document — each tab swaps the panel beside the
// hero, and only that panel scrolls.
// The shape/tone that used to head each section now rides in the active tab.
// Everything but the project list is short enough to sit centred in the panel.
const TABS = [
  { id: "projects", label: "Projects", shape: "arch", tone: "blue", Panel: Projects, fill: true },
  { id: "work", label: "Work", shape: "steps", tone: "gold", Panel: Work, center: true },
  { id: "stack", label: "Stack", shape: "burst", tone: "pink", Panel: Stack, center: true },
  { id: "contact", label: "Contact", shape: "drop", tone: "blue", Panel: Footer, center: true },
];

const App = () => {
  const [active, setActive] = useState(TABS[0].id);
  const { Panel, center, fill } = TABS.find((tab) => tab.id === active);

  return (
    <div className="site">
      <Topbar tabs={TABS} active={active} onSelect={setActive} />

      <main className="shell">
        <Intro />

        <div
          className={`shell__panel${center ? " shell__panel--center" : ""}${
            fill ? " shell__panel--fill" : ""
          }`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="shell__panel-inner"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}>
              <Panel />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default App;
