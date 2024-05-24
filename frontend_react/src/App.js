import React from "react";

import { About, Contact, Hero, Skills, Work } from "./container";
import { Nav } from "./components";
import "./App.scss";
const App = () => {
  return (
    <div classname="app">
      <Nav />
      <Hero />
      <About />
      <Work />
      <Skills />
      <Contact />
    </div>
  );
};

export default App;
