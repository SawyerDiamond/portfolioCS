import React from "react";

import "./Nav.scss";
import { images, icons } from "../../constants";
import { motion } from "framer-motion";
import useDeviceDetect from "../../hooks/useDeviceDetect";
const Nav = () => {
  const { isMobile, isDesktop } = useDeviceDetect();

  return (
    <motion.nav
      animate={{ y: [-150, 0], opacity: [0, 1] }}
      transition={{ duration: 1 }}
      className={`navbar secondary-bg flex--spaced ${
        isMobile ? "hidden" : ""
      }`}>
      <div
        className={`flex primary-bg navbar__logo ${isMobile ? "hidden" : ""}`}>
        <img src={images.logo2} alt="logo" />
        <h3>SAWYER</h3>
      </div>
      <ul className="navbar__links flex--spaced">
        {["Home", "Skills", "Projects"].map((item) => (
          <li className="navbar__button flex--v" key={`link-${item}`}>
            <a href={`#${item}`}>
              <img
                className="navbar__button-icon primary-bg"
                src={icons[item]}
                alt="Navigation icon"
              />
              <span
                className={`navbar__button-label ${isDesktop ? "" : "hidden"}`}>
                {item}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <a className="navbar__contact blue-glass flex--v" href="#contact-point">
        <img src={icons.Contact} alt="Contact link icon" />
        <h3>Contact</h3>
      </a>
    </motion.nav>
  );
};

export default Nav;
