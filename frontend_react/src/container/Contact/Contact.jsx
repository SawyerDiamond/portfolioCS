import React from "react";

import { icons, links } from "../../constants";
import { Wrap, MotionWrap } from "../../wrapper";

import "./Contact.scss";

const Contact = () => {
  const iconArray = Array(Object.keys(icons.ContactBG).length).fill(
    icons.ContactBG
  );

  return (
    <>
      <section className="contact" id="Contact">
        <div className="contact__container">
          <header className="contact__header">
            <img src={icons.ContactHeader} alt="About Icon" />
            <h1 className="about__text">Contact</h1>
          </header>
          <div className="contact__content primary-bg">
            <div className="contact__card flex--col">
              <h3 className="contact__text" style={{ marginTop: "14rem" }}>
                {" "}
                Reach Out to Me 👋
              </h3>
              <ul
                className={`shelf tertiary-bg flex--h`}
                style={{ marginLeft: "0", marginTop: "10rem" }}>
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
            </div>
          </div>
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

export default MotionWrap(Wrap(Contact, "Contact"), "Contact");
