import React from "react";
import { Wrap } from "../../wrapper";
import "./Skills.scss";
import { icons, skillGroups, workHistory } from "../../constants";
import { motion } from "framer-motion";
import useMotionAnimation from "../../hooks/useMotionAnimation";
import { WordReveal } from "../../components";

const Skills = () => {
  const { getAnimationProps } = useMotionAnimation();
  const iconArray = Array(6).fill(icons.SkillsBG);

  return (
    <section className="skills" id="Experience">
      <div className="skills__container">
        <motion.header
          className="skills__header"
          {...getAnimationProps("slideRight")}>
          <img src={icons.SkillsHeader} alt="Header Icon" />
          <WordReveal as="h1" inView stagger={0.06}>
            Experience
          </WordReveal>
        </motion.header>

        <div className="skills__body">
          {/* Left: grouped skill cards */}
          <div className="skills__left">
            {skillGroups.map((group) => (
              <motion.div
                key={group.label}
                className="skills__group primary-bg"
                {...getAnimationProps("slideRight")}>
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
              </motion.div>
            ))}
          </div>

          {/* Right: work / education timeline */}
          <div className="skills__right">
            {workHistory.map((entry, index) => (
              <motion.div
                key={index}
                className="skills__tree-node"
                {...getAnimationProps("slideUp")}>
                <div className="skills__tree-rail">
                  <div className={`skills__tree-dot${entry.isEducation ? " skills__tree-dot--edu" : ""}`} />
                  {index < workHistory.length - 1 && (
                    <div className="skills__tree-line" />
                  )}
                </div>
                <div className="skills__tree-card primary-bg">
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="skills__bg">
        {iconArray.map((icon, index) => (
          <img
            src={icon}
            className="skills__bg-icon"
            key={index}
            alt=""
            aria-hidden="true"
          />
        ))}
      </div>
    </section>
  );
};

export default Wrap(Skills, "Experience");
