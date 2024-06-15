import React, { useState, useEffect, useRef, useCallback } from "react";

import { Wrap } from "../../wrapper";
import "./Projects.scss";
import { icons } from "../../constants";
import { motion } from "framer-motion";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { urlFor, client } from "../../client";

const Projects = React.memo(() => {
  const { isMobile } = useDeviceDetect();

  //Sets logic for clicking on project items
  const itemRef = useRef();
  const [isActive, setIsActive] = useState(false);
  const textArray = Array(6).fill("P R O J E C T S");
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (itemRef.current && !itemRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //Sets logic for inputs into the projects grid and removes filler from mobile site.
  const [projects, setProjects] = useState([]);
  const getItemClass = useCallback(
    (project) => {
      return isMobile && !project.projectLink ? "hidden" : "project__item";
    },
    [isMobile]
  );
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
            <div
              ref={itemRef}
              whileInView={{ opacity: 1 }}
              key={project.title ? project.title + index : index}
              className={`${getItemClass(project)} project__item
              }`}>
              <img
                src={urlFor(project.imgUrl)}
                alt={
                  project.title ? project.title : "Placeholder Project Image"
                }
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                whileHover={{ opacity: 1 }}
                whileTap={{ opacity: 1 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.5,
                  staggerChildren: 0.5,
                }}
                onClick={() => setIsActive(!isActive)}
                className={project.codeLink ? "project__item--hover" : ""}>
                <a href={project.projectLink} target="_blank" rel="noreferrer">
                  <div className="project__item--hover-link secondary-bg">
                    <img src={icons.Link} alt="View Code" />
                  </div>
                </a>
                <a href={project.codeLink} target="_blank" rel="noreferrer">
                  <div className="project__item--hover-github secondary-bg">
                    <img src={icons.GitHub} alt="View Code" />
                  </div>
                </a>
              </motion.div>
              <h2 className="project__title">{project.title}</h2>
            </div>
          ))}
          {Array(5 - projects.length)
            .fill()
            .map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className="project__item primary-bg"></div>
            ))}
        </div>
      </div>
      <div className="project__bg">
        {textArray.map((text, index) => (
          <span className="project__bg-text" key={index}>
            {text}
          </span>
        ))}
      </div>
    </section>
  );
});

export default Wrap(Projects, "Projects");
