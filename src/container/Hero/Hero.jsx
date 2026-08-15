import React, { Suspense, lazy } from "react";

import { Wrap } from "../../wrapper";
import { WordReveal } from "../../components";
import "./Hero.scss";
import { images, icons, links } from "../../constants";
import { motion } from "framer-motion";
import useDeviceDetect from "../../hooks/useDeviceDetect";

// The shader engine is WebGPU-only and pulls in a large runtime, so it stays
// off the initial bundle. Browsers without WebGPU render a transparent canvas,
// which is why .hero__shader carries a navy CSS fallback underneath.
const ShaderEffect = lazy(() => import("../../components/shaders/metallic-rings-1"));

const Hero = () => {
  const { isDesktop } = useDeviceDetect();
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
            {/* WordReveal splits on whitespace into three .wr__unit spans, so
                Hero.scss's nth-child gradient rules still land on the right
                words — blue, pink, gold. */}
            <WordReveal as="h1" className="hero__intro" stagger={0.09}>
              {"Hi. I'm Sawyer,"}
            </WordReveal>
            <WordReveal
              as="h2"
              className="hero__desc"
              stagger={0.035}
              delay={0.35}>
              {"a Software Developer & UI Engineer."}
            </WordReveal>
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
              {Object.keys(links)
                .filter((item) => item !== "Mail")
                .map((item) => (
                  <li className="shelf--item" key={item}>
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
        <div className="hero__shader" aria-hidden="true">
          <Suspense fallback={null}>
            <ShaderEffect />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default Wrap(Hero, "Home");
