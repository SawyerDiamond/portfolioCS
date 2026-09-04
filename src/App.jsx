import React from "react";

import { Contact, Hero, Skills, Projects } from "./container";
import { Nav, PageSection } from "./components";
import "./App.scss";

// The page is a stack of background panels, following frame.io: each section
// paints its own fill, alternating light/deep so the boundaries read without
// needing a rule, and each is tucked a corner-radius into the one above it on
// a rising z-index so it slides over its predecessor on the way in.
//
// `covers` is off for the hero (nothing sits above it) and `covered` is off
// for contact (nothing slides over it, so it has to stay put — parallaxing it
// up would drag the page background in under the footer).
const App = () => {
  return (
    <div className="app">
      <div className="app__bg"></div>
      <Nav />

      {/* The hero is a full-bleed image that already ends where it means to,
          so it takes no section padding — the standard 124/160 just banded
          empty panel above and below the artwork. */}
      <PageSection tone={1} depth={1} covers={false} pad="none">
        <Hero />
      </PageSection>

      <PageSection tone={2} depth={2}>
        <Skills />
      </PageSection>

      <PageSection tone={3} depth={3}>
        <Projects />
      </PageSection>

      <PageSection tone={4} depth={4} covered={false} className="page-section--contact">
        <Contact />
      </PageSection>
    </div>
  );
};

export default App;
