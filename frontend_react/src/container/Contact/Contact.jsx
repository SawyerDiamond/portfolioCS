import React from "react";

import { icons, links } from "../../constants";
import { Wrap } from "../../wrapper";
import { motion } from "framer-motion";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import useMotionAnimation from "../../hooks/useMotionAnimation";
import "./Contact.scss";

const Contact = () => {
  const { isMobile } = useDeviceDetect();
  const arrayNum = isMobile ? 9 : 3;
  const iconArray = new Array(arrayNum).fill(icons.ContactBG);

  const { getAnimationProps } = useMotionAnimation();
  return (
    <>
      <section className="contact" id="Contact">
        <div className="contact__container">
          <header className="contact__header">
            <img src={icons.ContactHeader} alt="About Icon" />
            <h1 className="about__text">Contact</h1>
          </header>
          <motion.div
            className="contact__content primary-bg flex--col"
            {...getAnimationProps("slideUp")}>
            <p className="contact__text">Reach Out to Me 👋</p>

            <ul
              className={`shelf contact__shelf tertiary-bg flex--h`}
              style={{ marginLeft: "0", position: "absolute" }}>
              {Object.keys(links).map((item, index) => (
                <li
                  className={`shelf--item ${index === 2 ? "hidden" : ""}`}
                  style={{ margin: ".75rem" }}
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
        <div className="contact__bg">
          {iconArray.map((icon, index) => (
            <img
              src={icon}
              className="contact__bg-icon"
              key={index}
              alt="Background images"
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Wrap(Contact, "Contact");
