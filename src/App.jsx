import React from "react";
import { MotionConfig } from "framer-motion";

import { Contact, Hero, Skills, Projects } from "./container";
import { BottomNav } from "./components";
import { ScrollProvider } from "./context/ScrollContext";
import "./App.scss";

const App = () => {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProvider>
        <div className="app">
          <div className="app__bg"></div>
          <Hero />
          <Skills />
          <Projects />
          <Contact />
        </div>
        <BottomNav />
      </ScrollProvider>
    </MotionConfig>
  );
};

export default App;
