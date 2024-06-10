import React from "react";

import "./Nav.scss";
import { images, icons } from "../../constants";
import { motion } from "framer-motion";
import useDeviceDetect from "../../hooks/useDeviceDetect";
const Nav = () => {
  const { isMobile, isDesktop } = useDeviceDetect();
  return (
    <nav>
      <motion.div
        animate={{ y: [-150, 0], opacity: [0, 1] }}
        transition={{ duration: 1 }}
        className={`navbar flex--spaced ${isMobile ? "hidden" : ""}`}>
        <div className={`flex navbar__logo ${isMobile ? "hidden" : ""}`}>
          <img src={images.logo} alt="logo" />
          <h3>SAWYER</h3>
        </div>
        <ul className="navbar__links flex--spaced">
          {["Home", "Skills", "Projects", "Experience"].map((item) => (
            <li className="navbar__button flex--v" key={`link-${item}`}>
              <a href={`#${item}`}>
                <img
                  className="navbar__button-icon"
                  src={icons[item]}
                  alt="icon"
                />
                <span
                  className={`navbar__button-label ${
                    isDesktop ? "" : "hidden"
                  }`}>
                  {item}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <a className="navbar__contact flex--v" href="#contact-point">
          <img src={icons.Contact} alt="Contact" />
          <h3>Contact</h3>
        </a>
      </motion.div>
    </nav>
  );
};

export default Nav;
