import React from "react";

import Intro from "./container/minimal/Intro";
import Work from "./container/minimal/Work";
import Stack from "./container/minimal/Stack";
import Bento from "./container/minimal/Bento";
import Footer from "./container/minimal/Footer";
import "./styles/Minimal.scss";

const App = () => {
  return (
    <div className="site">
      <Intro />
      <main className="site__main">
        <Work />
        <Stack />
        <Bento />
        <Footer />
      </main>
    </div>
  );
};

export default App;
