import React from "react";

import Intro from "./container/minimal/Intro";
import Bento from "./container/minimal/Bento";
import Work from "./container/minimal/Work";
import Stack from "./container/minimal/Stack";
import Footer from "./container/minimal/Footer";
import "./styles/Minimal.scss";

const App = () => {
  return (
    <div className="site">
      <Intro />
      <main className="site__main">
        <Bento />
        <Work />
        <Stack />
        <Footer />
      </main>
    </div>
  );
};

export default App;
