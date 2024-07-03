import React, { useState, useEffect, useRef, useCallback } from "react";

import { Wrap, MotionWrap } from "../../wrapper";
import "./Projects.scss";
import { icons } from "../../constants";
import { motion } from "framer-motion";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { urlFor, client } from "../../client";

const Projects = React.memo(() => {
  const { isMobile, isTablet } = useDeviceDetect();

  //Sets logic for clicking on project items
  const itemRef = useRef();
  const textArray = Array(6).fill("P R O J E C T S");

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
        <div className="project__header" id="Projects">
          <img src={icons.ProjectsHeader} alt="Header Icon" />
          <h1>Projects</h1>
        </div>
        <div className="project__grid">
          {projects.map((project, index) => (
            <motion.a
              href={isMobile ? project.codeLink : undefined}
              ref={itemRef}
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              key={project.title ? project.title + index : index}
              className={`${getItemClass(project)} project__item`}>
              <img
                src={urlFor(project.imgUrl)}
                alt={
                  project.title ? project.title : "Placeholder Project Image"
                }
              />
              <div className="project__shelf">
                <div className={` ${project.codeLink ? "project__link" : ""}`}>
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noreferrer"
                    className="project__link-site tertiary-bg">
                    <img src={icons.Link} alt="View Code" />
                  </a>
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noreferrer"
                    className="project__link-github tertiary-bg">
                    <img src={icons.GitHub} alt="View Code" />
                  </a>
                </div>
                <h2 className="project__title">{project.title}</h2>
              </div>
            </motion.a>
          ))}
          {Array(5 - projects.length)
            .fill()
            .map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className={
                  isMobile || isTablet
                    ? "hidden"
                    : `project__item ${
                        index % 4 === 0
                          ? "blue-glass"
                          : index % 4 === 1
                          ? "primary-bg"
                          : index % 4 === 2
                          ? "gold-glass"
                          : "pink-glass"
                      }`
                }></div>
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

export default Wrap(MotionWrap(Projects, "Projects"), "Projects");
