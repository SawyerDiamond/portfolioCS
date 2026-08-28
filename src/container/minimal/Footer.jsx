import React from "react";
import { motion } from "framer-motion";

import { icons, links } from "../../constants";

const SOCIALS = [
  { tone: "gold", icon: icons.GitHub, label: "GitHub", href: links.GitHub },
  { tone: "blue", icon: icons.LinkedIn, label: "LinkedIn", href: links.LinkedIn },
  { tone: "pink", icon: icons.Resume, label: "Résumé", href: links.Resume },
];

const rise = (delay) => ({
  initial: { y: 16, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const Footer = () => (
  <section className="contact" id="Contact">
    <motion.div {...rise(0)}>
      <h2 className="contact__title">Let's build something.</h2>
      <p className="contact__note">
        Always up for a good problem — a role, a side project, or an interface
        that deserves better.
      </p>
    </motion.div>

    <motion.a className="contact__mail" href={links.Mail} {...rise(0.07)}>
      <span className="contact__mail-icon">
        <img src={icons.Mail} alt="" aria-hidden="true" />
      </span>
      <span className="contact__mail-text">
        <span className="contact__mail-label">Email</span>
        <span className="contact__mail-value">sawyerrdiamond@gmail.com</span>
      </span>
    </motion.a>

    <motion.div className="contact__socials" {...rise(0.14)}>
      {SOCIALS.map((social) => (
        <a
          className={`contact__social contact__social--${social.tone}`}
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer">
          <span className="contact__social-icon">
            <img src={social.icon} alt="" aria-hidden="true" />
          </span>
          <span className="contact__social-label">{social.label}</span>
        </a>
      ))}
    </motion.div>

    <motion.div className="contact__base" {...rise(0.2)}>
      <span>© {new Date().getFullYear()} Sawyer Diamond</span>
      <span className="contact__marks" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </motion.div>
  </section>
);

export default Footer;
