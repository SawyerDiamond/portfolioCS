import React from "react";

import { Contact, Hero, Skills, Projects } from "./container";
import { Nav } from "./components";
import "./App.scss";
const App = () => {
  return (
    <div className="app">
      <Nav />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
};

export default App;
