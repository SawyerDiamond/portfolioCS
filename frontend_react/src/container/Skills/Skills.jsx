import React, { useState, useEffect } from "react";
import { Wrap } from "../../wrapper";

import "./Skills.scss";
import { images, icons } from "../../constants";
import { motion } from "framer-motion";
import { urlFor, client } from "../../client";
import useDeviceDetect from "../../hooks/useDeviceDetect";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const iconArray = Array(5).fill(icons.SkillsBG);
  useEffect(() => {
    const skillsQuery = '*[_type == "skills"]';
    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <section className="skills">
      <div className="skills__container">
        <div className="skills__header">
          <img src={icons.SkillsHeader} alt="Header Icon" />
          <h1>Skills</h1>
        </div>
        <motion.div className="skills__list">
          {skills.map((skill, index) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className={`skills__item ${
                skill.order % 2 === 0 ? "tertiary-bg" : "secondary-bg"
              }`}
              key={skill.name}
              style={{ order: skill.order }}>
              <motion.img
                src={urlFor(skill.icon)}
                className="skills__item-img"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                alt={skill.name}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Wrap(Skills, "Skills");
