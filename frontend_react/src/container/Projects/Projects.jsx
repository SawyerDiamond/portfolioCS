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
            <motion.div
              onClick={() => {
                if (isMobile && project.codeLink) {
                  window.location.href = project.codeLink;
                }
              }}
              ref={itemRef}
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              key={project.title ? project.title + index : index}
              className={`${getItemClass(project)} project__item primary-bg`}>
              {" "}
              <div className={` ${project.codeLink ? "project__link" : ""}`}>
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="project__link-github secondary-bg">
                  <img src={icons.GitHub} alt="View Github" />
                </a>
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noreferrer"
                  className="project__link-site secondary-bg">
                  <img src={icons.Link} alt="View Live Site" />
                </a>
              </div>
              <img
                src={urlFor(project.imgUrl)}
                loading="lazy"
                className="project__item-img"
                alt={
                  project.title ? project.title : "Placeholder Project Image"
                }
              />
              <>
                <div className="project__shelf">
                  <div className="project__shelf-block">
                    <h2 className="project__title">{project.title}</h2>
                    {project.images && project.images.length > 0 && (
                      <div className="project__tools ">
                        {project.images.map((image, index) => (
                          <img
                            className="project__tools-img primary-bg"
                            key={index}
                            src={urlFor(image)}
                            alt={`${project.title} - Image ${index + 1}`}
                            loading="lazy"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <p className="project__description">{project.description}</p>
              </>
            </motion.div>
          ))}
          {Array(4 - projects.length)
            .fill()
            .map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className={
                  isMobile || isTablet
                    ? "hidden"
                    : `project__item ${
                        (index + 1) % 3 === 0 ? "primary-bg" : "tertiary-bg"
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
