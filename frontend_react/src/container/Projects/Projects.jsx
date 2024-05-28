import React, { useState, useEffect } from "react"; // Import useEffect

import { Wrap } from "../../wrapper";
import "./Projects.scss";
import { icons } from "../../constants";
import { motion } from "framer-motion";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { urlFor, client } from "../../client";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  useEffect(() => {
    const query = '*[_type == "projects"]';

    client.fetch(query).then((data) => {
      setProjects(data);
    });
  }, []);

  return (
    <section className="project">
      <div className="project__container">
        <div className="project__header">
          <img src={icons.ProjectsHeader} alt="Header Icon" />
          <h1>Projects</h1>
        </div>
        <div className="project__grid">
          {projects.map((project, index) => (
            <motion.div
              whileInView={{ opacity: 1 }}
              key={project.title + index}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.5, type: "tween" }}
              className="project__profile-item">
              <img src={urlFor(project.imgUrl)} alt={project.title} />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
                className="project__profile-hover">
                <a href={project.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="flex">
                    <img src={icons.Link} alt="View Code" />
                  </motion.div>
                </a>
                <a href={project.codeLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className="flex">
                    <img src={icons.GitHub} alt="View Code" />
                  </motion.div>
                </a>
              </motion.div>
              <h2 className=" project__profile-title">{project.title}</h2>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wrap(Projects, "project");
