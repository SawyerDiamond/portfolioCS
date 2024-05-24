import React from "react";

import "./Skills.scss";
import { images, icons, links } from "../../constants";
import { motion } from "framer-motion";
import useDeviceDetect from "../../hooks/useDeviceDetect";

const Skills = () => {
  return (
    <section className="skills">
      <div className="skills__container">
        <div className="skills__header">
          <img src={icons.SkillsHeader} alt="Header Icon" />
          <h1>Skills</h1>
        </div>
        <div className="skills__list"></div>
      </div>
    </section>
  );
};

export default Skills;
