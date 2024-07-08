import React, { useState, useEffect } from "react";
import { Wrap, MotionWrap } from "../../wrapper";

import "./Skills.scss";
import { icons } from "../../constants";
import { motion } from "framer-motion";
import { urlFor, client } from "../../client";
import useDeviceDetect from "../../hooks/useDeviceDetect";

const Skills = () => {
  const { isMobile } = useDeviceDetect();
  const [skills, setSkills] = useState([]);
  const iconArray = Array(skills.length).fill(icons.SkillsBG);
  useEffect(() => {
    const skillsQuery = '*[_type == "skills"]';
    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <section className="skills" id="Skills">
      <div className="skills__container">
        <header className="skills__header">
          <img src={icons.SkillsHeader} alt="Header Icon" />
          <h1>Skills</h1>
        </header>
        <div className={`skills__list ${isMobile ? "tertiary-bg" : ""}`}>
          {skills.map(({ name, icon, order }) => (
            <div
              className={`skills__item ${
                isMobile
                  ? "" // No additional class for mobile, thus no background
                  : order % 2 === 0
                  ? "tertiary-bg"
                  : "primary-bg"
              }`}
              key={name}
              style={{ order }}>
              <motion.img
                src={urlFor(icon)}
                className="skills__item-img"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                loading="lazy"
                alt={name}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="skills__bg">
        {iconArray.map((icon, index) => (
          <img
            src={icon}
            className="skills__bg-icon"
            key={index}
            alt="Background images"
          />
        ))}
      </div>
    </section>
  );
};

export default Wrap(MotionWrap(Skills, "Skills"), "Skills");
