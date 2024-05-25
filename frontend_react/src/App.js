import React from "react";

import { Contact, Hero, Skills, Projects } from "./container";
import { Nav } from "./components";
import "./App.scss";
const App = () => {
  return (
    <div classname="app">
      <Nav />
      <Hero />
      <Projects />
      <Skills />

      <Contact />
    </div>
  );
};

export default App;
