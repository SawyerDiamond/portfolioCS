import React from "react";

import "./Hero.scss";
import { images, icons, links } from "../../constants";
import { motion } from "framer-motion";
import useDeviceDetect from "../../hooks/useDeviceDetect";

const Header = () => {
  const { isMobile, isTablet, isDesktop } = useDeviceDetect();
  const textAnimationProps = { y: [-300, 0], opacity: [0, 1] };
  const shelfAnimationProps = { y: [300, 0], opacity: [0, 1] };
  return (
    <section className="hero">
      <div
        className={`hero__container ${
          isDesktop ? "flex--around" : "flex--col"
        }`}>
        <motion.div
          whileInView={textAnimationProps}
          transition={{ duration: 1 }}
          className="hero__left">
          <h1 className="hero__intro">
            <span>Hi.</span>
            <span>I'm</span>
            <span>Sawyer,</span>
          </h1>
          <h2 className="hero__desc">a Frontend Developer & UI Designer. </h2>
        </motion.div>

        <motion.div
          whileInView={shelfAnimationProps}
          transition={{ duration: 1 }}
          className="hero__right">
          <img
            src={images.logo}
            className={`hero__logo ${isDesktop ? "" : "hidden"}`}
            alt="logo"
          />
          <ul className={`hero__shelf ${isDesktop ? "" : "flex--h"}`}>
            {Object.keys(links).map((item) => (
              <li className="hero__shelf--item" key={item}>
                <a href={links[item]} target="_blank" rel="noopener noreferrer">
                  <img src={icons[item]} alt={item} />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      <img
        src={images.hero_bg}
        className={`bg ${isDesktop ? "" : "hidden"}`}
        alt="hero background"
      />
      <img
        src={images.hero_bg_t}
        className={`bg ${isTablet ? "" : "hidden"}`}
        alt="hero background"
      />
      <img
        src={images.hero_bg_m}
        className={`bg ${isMobile ? "" : "hidden"}`}
        alt="hero background"
      />
    </section>
  );
};

export default Header;
