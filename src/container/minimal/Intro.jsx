import React from "react";
import { motion } from "framer-motion";

import { icons, images, links } from "../../constants";
import TileField from "../../components/TileField/TileField";

const rise = (delay) => ({
  initial: { y: 18, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const Intro = () => (
  <header className="intro" id="Home">
    <TileField />

    <div className="intro__inner">
      <motion.img
        className="intro__logo"
        src={images.logo2}
        alt="Sawyer Diamond"
        {...rise(0)}
      />

      <motion.h1 className="intro__name" {...rise(0.06)}>
        Sawyer Diamond
      </motion.h1>

      <motion.p className="intro__role" {...rise(0.13)}>
        Software Developer <em>&amp;</em> UI Engineer
      </motion.p>

      <motion.p className="intro__bio" {...rise(0.2)}>
        I build interfaces that hold up under real use — currently shipping
        dashboards and design systems at Integrated Lifecycle Solutions, and
        finishing a degree in Computer Science &amp; Interaction Design at
        George Washington University.
      </motion.p>

      <motion.div className="intro__actions" {...rise(0.27)}>
        <a className="btn btn--primary" href={links.Mail}>
          <img src={icons.Mail} alt="" aria-hidden="true" />
          Email me
        </a>
        <a
          className="btn"
          href={links.Resume}
          target="_blank"
          rel="noopener noreferrer">
          <img src={icons.Resume} alt="" aria-hidden="true" />
          Résumé
        </a>
        <a
          className="btn btn--icon"
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

      <motion.p className="intro__location" {...rise(0.34)}>
        <span className="intro__dot" />
        Long Island / Washington, D.C.
      </motion.p>
    </div>
  </header>
);

export default Intro;
