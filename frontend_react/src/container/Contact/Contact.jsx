import React from "react";

import { icons, links } from "../../constants";
import { Wrap, MotionWrap } from "../../wrapper";
import useDeviceDetect from "../../hooks/useDeviceDetect";

import "./Contact.scss";

/**
 * Renders the Contact component which displays contact information and icons.
 * The component includes a header, a list of contact links, and a background image.
 *
 * @return {JSX.Element} The Contact component.
 */
const Contact = () => {
  const { isMobile } = useDeviceDetect();
  const arrayNum = isMobile ? 9 : 3;
  const iconArray = new Array(arrayNum).fill(icons.ContactBG);

  return (
    <>
      <section className="contact" id="Contact">
        <div className="contact__container">
          <header className="contact__header">
            <img src={icons.ContactHeader} alt="About Icon" />
            <h1 className="about__text">Contact</h1>
          </header>
          <div className="contact__content primary-bg flex--col">
            <h3 className="contact__text">Reach Out to Me 👋</h3>
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

export default Wrap(MotionWrap(Contact, "Contact"), "Contact");
