import React, { useRef } from "react";

import { Wrap } from "../../wrapper";
import "./Hero.scss";
import { images, icons, links } from "../../constants";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import useDeviceDetect from "../../hooks/useDeviceDetect";

const SOCIALS = [
  { name: "LinkedIn", tone: "primary" },
  { name: "GitHub", tone: "pink" },
  { name: "Resume", tone: "gold" },
];

const bobAnimation = {
  y: [0, -30, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const Hero = () => {
  const { isMobile, isTablet, isDesktop } = useDeviceDetect();
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);

  // One progress line for the hero's full lifecycle — entering from below,
  // resting in view, leaving upward — so scrolling back up reverses cleanly
  // instead of whileInView snapping to a finished state.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 0.32, 0.68, 1], [140, 0, 0, -140]);
  const leftOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.32, 0.68, 0.78, 1],
    [0, 0, 1, 1, 0, 0],
  );
  const rightY = useTransform(scrollYProgress, [0, 0.32, 0.68, 1], [-140, 0, 0, 140]);
  const rightOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.32, 0.68, 0.78, 1],
    [0, 0, 1, 1, 0, 0],
  );
  const petalsOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.35, 0.65, 0.75, 1],
    [0, 0, 1, 1, 0, 0],
  );
  const petalsY = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [80, 0, 0, -80]);

  const leftMotion = reduceMotion ? {} : { y: leftY, opacity: leftOpacity };
  const rightMotion = reduceMotion ? {} : { y: rightY, opacity: rightOpacity };
  const petalsMotion = reduceMotion ? {} : { y: petalsY, opacity: petalsOpacity };

  return (
    <>
      <section className="hero flex--col" ref={heroRef}>
        <motion.div
          className={`petals ${!isDesktop ? "hidden" : ""}`}
          style={petalsMotion}>
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
          <motion.header style={leftMotion} className="hero__left">
            <h1 className="hero__intro">
              <span>Hi.</span>
              <span>I'm</span>
              <span>Sawyer,</span>
            </h1>
            <h2 className="hero__desc">a Software Developer & UI Engineer. </h2>
          </motion.header>

          <motion.div style={rightMotion} className="hero__right">
            <img
              src={images.logo2}
              className={`hero__logo ${isDesktop ? "" : "hidden"}`}
              alt="logo"
            />
            <ul className={`hero__socials ${isDesktop ? "" : "flex--h"}`}>
              {SOCIALS.map(({ name, tone }) => (
                <li key={name}>
                  <a
                    className={`btn btn--icon${tone ? ` btn--${tone}` : ""}`}
                    href={links[name]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}>
                    <img src={icons[name]} alt="" aria-hidden="true" />
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
    </>
  );
};

export default Wrap(Hero, "Home");
