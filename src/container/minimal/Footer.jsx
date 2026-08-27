import React from "react";

import { icons, links } from "../../constants";

const Footer = () => (
  <footer className="footer" id="Contact">
    <p className="footer__note">Always up for a good problem. Say hello.</p>

    <div className="footer__links">
      {Object.keys(links).map((item) => (
        <a
          className="footer__link"
          key={item}
          href={links[item]}
          target={item === "Mail" ? undefined : "_blank"}
          rel="noopener noreferrer">
          <img src={icons[item]} alt="" aria-hidden="true" />
          {item === "Mail" ? "Email" : item}
        </a>
      ))}
    </div>

    <p className="footer__copy">© {new Date().getFullYear()} Sawyer Diamond</p>
  </footer>
);

export default Footer;
