import React from "react";

import "./Nav.scss";
import { images, icons } from "../../constants";
import { motion } from "framer-motion";
import useDeviceDetect from "../../hooks/useDeviceDetect";
const Nav = () => {
  const { isMobile, isDesktop } = useDeviceDetect();

  return (
    <motion.nav
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className={`navbar nav-bg flex--spaced ${isMobile ? "hidden" : ""}`}>
      <div className={`flex navbar__logo ${isMobile ? "hidden" : ""}`}>
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
      <a className="navbar__contact blue-glass flex--v" href="#Contact">
        <img src={icons.Contact} alt="Contact link icon" />
        <h3>Contact</h3>
      </a>
    </motion.nav>
  );
};

export default Nav;
