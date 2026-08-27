import React from "react";

import { icons, images, links } from "../../constants";

const Footer = () => (
  <footer className="depth footer" id="Contact">
    <div className="footer__glow" />

    <img className="footer__logo" src={images.logo2} alt="Sawyer Diamond" />

    <h2 className="footer__title">Let's build something.</h2>
    <p className="footer__note">
      Always up for a good problem — whether that's a role, a side project, or
      an interface that deserves better.
    </p>

    <div className="footer__actions">
      <a className="btn btn--primary" href={links.Mail}>
        <img src={icons.Mail} alt="" aria-hidden="true" />
        sawyerrdiamond@gmail.com
      </a>
      <a
        className="btn btn--icon"
        href={links.GitHub}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub">
        <img src={icons.GitHub} alt="" aria-hidden="true" />
      </a>
      <a
        className="btn btn--icon"
        href={links.LinkedIn}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn">
        <img src={icons.LinkedIn} alt="" aria-hidden="true" />
      </a>
      <a
        className="btn btn--icon"
        href={links.Resume}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Résumé">
        <img src={icons.Resume} alt="" aria-hidden="true" />
      </a>
    </div>

    <div className="footer__base">
      <span>© {new Date().getFullYear()} Sawyer Diamond</span>
      <span className="footer__marks">
        <span />
        <span />
        <span />
      </span>
    </div>
  </footer>
);

export default Footer;
