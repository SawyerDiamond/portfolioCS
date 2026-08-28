import React from "react";
import { motion } from "framer-motion";

import { icons, links } from "../../constants";
import IntroBackground from "../../components/IntroBackground/IntroBackground";

const rise = (delay) => ({
  initial: { y: 18, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
});

// Fixed left column of the shell — never swaps out with the tabs.
const Intro = () => (
  <aside className="intro" id="Home">
    <IntroBackground />

    <div className="intro__inner">
      <motion.h1 className="intro__name" {...rise(0)}>
        Sawyer
        <br />
        Diamond
      </motion.h1>

      <motion.p className="intro__bio" {...rise(0.13)}>
        <strong>Software Developer <em>&</em> UI Engineer</strong> building
        interfaces that hold up under real use — currently shipping dashboards
        and design systems at Integrated Lifecycle Solutions, and finishing a
        degree in Computer Science &amp; Interaction Design at George Washington
        University.
      </motion.p>

      <motion.div className="intro__actions" {...rise(0.2)}>
        <a className="btn btn--primary" href={links.Mail}>
          <img src={icons.Mail} alt="" aria-hidden="true" />
          Email me
        </a>
        <a
          className="btn btn--pink"
          href={links.Resume}
          target="_blank"
          rel="noopener noreferrer">
          <img src={icons.Resume} alt="" aria-hidden="true" />
          Résumé
        </a>
        <a
          className="btn btn--icon btn--gold"
          href={links.GitHub}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub">
          <img src={icons.GitHub} alt="" aria-hidden="true" />
        </a>
        <a
          className="btn btn--icon"
          href={links.LinkedIn}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn">
          <img src={icons.LinkedIn} alt="" aria-hidden="true" />
        </a>
      </motion.div>
    </div>
  </aside>
);

export default Intro;
