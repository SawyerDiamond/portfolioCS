import React from "react";

import "./Nav.scss";
import { images, icons } from "../../constants";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useDeviceDetect from "../../hooks/useDeviceDetect";
const Nav = () => {
  const [toggle, setToggle] = useState(false);
  const { isMobile, isTablet, isDesktop } = useDeviceDetect();
  return (
    <nav>
      <div className={`navbar flex--spaced ${isMobile ? "hidden" : ""}`}>
        <div className={`flex navbar__logo ${isMobile ? "hidden" : ""}`}>
          <img src={images.logo} alt="logo" />
          <h3>SAWYER</h3>
        </div>
        <ul className="navbar__links flex--spaced">
          {["Home", "Skills", "Projects", "Experience"].map((item) => (
            <li className="navbar__button flex--v" key={`link-${item}`}>
              <img
                className="navbar__button-icon"
                src={icons[item]}
                alt="icon"
              />
              <a
                className={`navbar__button-label ${isDesktop ? "" : "hidden"}`}
                href={`#${item}`}>
                {item}
              </a>
            </li>
          ))}
        </ul>
        <a className="navbar__contact flex--v" href="#contact-point">
          <img src={icons.Contact} alt="Contact" />
          <h3>Contact</h3>
        </a>
      </div>
    </nav>
  );
};

export default Nav;
