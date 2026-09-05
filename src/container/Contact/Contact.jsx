import React from "react";

import { icons, links } from "../../constants";
import { Wrap } from "../../wrapper";
import Reveal, { RevealGroup } from "../../components/Reveal/Reveal";
import ShapeIcon from "../../components/ShapeIcon/ShapeIcon";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import "./Contact.scss";

// Bento: four tiles, four footprints, laid into a 3x3. The big square leads,
// the résumé runs tall beside it, and the two socials split the bottom row
// unevenly, so the block never resolves back into a plain 2x2.
const ACTIONS = [
  {
    name: "Email me",
    tone: "primary",
    icon: icons.Mail,
    href: links.Mail,
    value: links.Mail.replace("mailto:", ""),
    size: "lead",
  },
  {
    name: "Résumé",
    tone: "gold",
    icon: icons.Resume,
    href: links.Resume,
    external: true,
    size: "tall",
  },
  {
    name: "GitHub",
    tone: "pink",
    icon: icons.GitHub,
    href: links.GitHub,
    external: true,
    size: "small",
  },
  {
    name: "LinkedIn",
    tone: "navy",
    icon: icons.LinkedIn,
    href: links.LinkedIn,
    external: true,
    size: "wide",
  },
];

// Cycles which corner gets the petal pinch — same pattern as Skills.
const PETAL_CORNERS = ["tl", "tr", "br", "bl"];
const petalClass = (index) => `petal--${PETAL_CORNERS[index % PETAL_CORNERS.length]}`;

const Contact = () => {
  const { isMobile } = useDeviceDetect();
  const arrayNum = isMobile ? 9 : 3;
  const iconArray = new Array(arrayNum).fill(icons.ContactBG);

  return (
    <section className="contact" id="Contact">
      <div className="contact__container">
        <Reveal as="header" className="contact__header" distance="column">
          <ShapeIcon name="mail" tone="electric" className="contact__header-icon" />
          <h1>Contact</h1>
        </Reveal>

        <RevealGroup className="contact__layout">
          <div className="contact__lead">
            <Reveal as="h2" className="contact__title" distance="headline">
              <span className="contact__title-line">Got something</span>
              <span className="contact__title-line">
                <span className="contact__title-word">you're</span>{" "}
                <span className="contact__title-word">building?</span>
              </span>
            </Reveal>

            <Reveal as="p" className="contact__lede">
              Frontend work, data-heavy interfaces, maps, or just a question about
              how something on this page was put together. I read everything and
              I'll get back to you.
            </Reveal>
          </div>

          {/* Each tile takes its own stagger slot rather than the grid
              arriving as one block — frame.io reveals bento cells the same
              way, and it's the whole reason the cells are different sizes. */}
          <div className="contact__grid">
            {ACTIONS.map(
              ({ name, tone, icon, href, external, value, size }, index) => (
                <div
                  key={name}
                  className={`contact__cell contact__cell--${size}`}>
                  <Reveal
                    as="a"
                    index={index + 1}
                    className={`btn contact__tile contact__tile--${size}${
                      tone ? ` btn--${tone}` : ""
                    } ${petalClass(index)}`}
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}>
                    <img
                      className="contact__tile-icon"
                      src={icon}
                      alt=""
                      aria-hidden="true"
                    />
                    <span className="contact__tile-text">
                      <span className="contact__tile-name">{name}</span>
                      {value && (
                        <span className="contact__tile-value">{value}</span>
                      )}
                    </span>
                  </Reveal>
                </div>
              ),
            )}
          </div>
        </RevealGroup>
      </div>

      {/* The repeated background mark from before the redesign, just clipped
          against the full panel now instead of this section's own (shorter)
          content box. */}
      <div className="contact__bg">
        {iconArray.map((icon, index) => (
          <img
            src={icon}
            className="contact__bg-icon"
            key={index}
            alt=""
            aria-hidden="true"
          />
        ))}
      </div>
    </section>
  );
};

export default Wrap(Contact, "Contact");
