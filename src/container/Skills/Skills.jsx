import React from "react";
import { Wrap } from "../../wrapper";
import "./Skills.scss";
import { icons, skillGroups, workHistory } from "../../constants";
import Reveal, { RevealGroup } from "../../components/Reveal/Reveal";
import ShapeIcon from "../../components/ShapeIcon/ShapeIcon";

// Cycles the "petal" cards through which corner stays tight, so the column
// doesn't repeat the same pinched corner down its whole length.
const PETAL_CORNERS = ["tl", "tr", "br", "bl"];
const petalClass = (index) => `petal--${PETAL_CORNERS[index % PETAL_CORNERS.length]}`;

const Skills = () => {
  return (
    <section className="skills" id="Experience">
      <div className="skills__container">
        <Reveal as="header" className="skills__header" distance="column">
          <ShapeIcon name="bolt" tone="gold" className="skills__header-icon" />
          <h1>Experience</h1>
        </Reveal>

        <div className="skills__body">
          {/* Left: grouped skill cards */}
          <RevealGroup className="skills__left">
            {skillGroups.map((group, index) => (
              <Reveal
                key={group.label}
                index={index}
                className={`skills__group primary-bg ${petalClass(index)}`}>
                <span className="skills__group-label">{group.label}</span>
                <div className="skills__group-icons">
                  {group.items.map(({ name, Icon, src, rounded, small }) => (
                    <div
                      key={name}
                      className={`skills__group-icon${rounded ? " icon--rounded" : ""}${name === "GMU" ? " icon--uni-logo" : ""}`}
                      data-skill={name}>
                      {Icon
                        ? <Icon size={small ? 19 : 24} />
                        : <img src={src} alt={name} loading="lazy" className={small ? "icon--small" : undefined} />
                      }
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </RevealGroup>

          {/* Right: work / education timeline */}
          <RevealGroup className="skills__right">
            {workHistory.map((entry, index) => (
              <Reveal
                key={index}
                index={index}
                className="skills__tree-node">
                <div className="skills__tree-rail">
                  <div className={`skills__tree-dot${entry.isEducation ? " skills__tree-dot--edu" : ""}`} />
                  {index < workHistory.length - 1 && (
                    <div className="skills__tree-line" />
                  )}
                </div>
                <div className={`skills__tree-card primary-bg ${petalClass(index + 1)}`}>
                  <div className="skills__tree-top">
                    <div
                      className={`skills__tree-logo${
                        entry.company === "George Washington University" ? " skills__tree-logo--padding" : ""
                      }${entry.company === "Integrated Lifecycle Solutions" ? " skills__tree-logo--ils" : ""}`}>
                      {entry.logo && <img src={entry.logo} alt={entry.company} />}
                    </div>
                    <div className="skills__tree-meta">
                      <span className="skills__tree-period">{entry.period}</span>
                      <div className="skills__tree-title-row">
                        <h3 className="skills__tree-title">{entry.title}</h3>
                        <span className="skills__tree-company">{entry.company}</span>
                      </div>
                    </div>
                  </div>
                  {entry.description && (
                    <p className="skills__tree-desc">{entry.description}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </div>

      {/* The same background mark as before, just the one of it, held against
          the right edge instead of repeated across the section. */}
      <img
        src={icons.SkillsBG}
        className="skills__bg-icon"
        alt=""
        aria-hidden="true"
      />
    </section>
  );
};

export default Wrap(Skills, "Experience");
