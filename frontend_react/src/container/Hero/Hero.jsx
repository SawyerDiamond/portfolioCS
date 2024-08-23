import React from "react";

import { Wrap } from "../../wrapper";
import "./Hero.scss";
import { images, icons, links } from "../../constants";
import { motion } from "framer-motion";
import useDeviceDetect from "../../hooks/useDeviceDetect";

const Hero = () => {
  const { isMobile, isTablet, isDesktop } = useDeviceDetect();
  const textAnimationDesktop = isDesktop
    ? { y: [-300, 0], opacity: [0, 1] }
    : {};
  const shelfAnimationDesktop = isDesktop
    ? { y: [300, 0], opacity: [0, 1] }
    : {};
  const textAnimationResponsive = !isDesktop
    ? { y: [-300, 0], opacity: [0, 1] }
    : {};
  const shelfAnimationResponsive = !isDesktop
    ? { y: [300, 0], opacity: [0, 1] }
    : {};

  const bobAnimation = {
    y: [0, -30, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <>
      <section className="hero flex--col">
        <motion.div
          className={`petals ${!isDesktop ? "hidden" : ""}`}
          whileInView={shelfAnimationDesktop}
          transition={{ duration: 1 }}>
          <motion.img
            className="petals-blue"
            src={images.bluepetal}
            animate={bobAnimation}
            alt="Blue petal"
          />
          <motion.img
            className="petals-gold"
            src={images.goldpetal}
            animate={{
              ...bobAnimation,
              transition: { ...bobAnimation.transition, delay: 3 },
            }}
            alt="Gold petal"
          />
          <motion.img
            className="petals-pink"
            src={images.pinkpetal}
            animate={{
              ...bobAnimation,
              transition: { ...bobAnimation.transition, delay: 1.5 },
            }}
            alt="Pink petal"
          />
        </motion.div>
        <div
          className={`hero__container ${
            isDesktop ? "flex--around" : "flex--col"
          }`}>
          <motion.header
            animate={textAnimationResponsive}
            whileInView={textAnimationDesktop}
            transition={{ duration: 1 }}
            className="hero__left">
            <h1 className="hero__intro">
              <span>Hi.</span>
              <span>I'm</span>
              <span>Sawyer,</span>
            </h1>
            <h2 className="hero__desc">a Frontend Developer & UI Designer. </h2>
          </motion.header>

          <motion.div
            animate={shelfAnimationResponsive}
            whileInView={shelfAnimationDesktop}
            transition={{ duration: 1 }}
            className="hero__right">
            <img
              src={images.logo2}
              className={`hero__logo ${isDesktop ? "" : "hidden"}`}
              alt="logo"
            />
            <ul className={`shelf tertiary-bg ${isDesktop ? "" : "flex--h"}`}>
              {Object.keys(links).map((item, index) => (
                <li
                  className={`shelf--item ${index === 3 ? "hidden" : ""}`}
                  key={item}>
                  <a
                    href={links[item]}
                    target="_blank"
                    rel="noopener noreferrer">
                    <img src={icons[item]} alt={item} />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [150, 0], opacity: [0, 1] }}
          transition={{ duration: 1 }}
          className="hero__location tertiary-bg">
          <p>📍 Long Island / Washington, D.C.</p>
        </motion.div>
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
    </>
  );
};

export default Wrap(Hero, "Home");
