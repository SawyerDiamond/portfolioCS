import React, { useRef, useState, useCallback } from "react";
import { Wrap } from "../../wrapper";
import "./Projects.scss";
import { icons, projects } from "../../constants";
import { motion, AnimatePresence } from "framer-motion";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import useMotionAnimation from "../../hooks/useMotionAnimation";

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      className="modal__overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}>
      <motion.div
        className="modal__content secondary-bg"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          ✕
        </button>

        <div className="modal__image-wrapper">
          <img
            src={project.imgUrl}
            alt={project.title}
            className="modal__image"
          />
        </div>

        <div className="modal__body">
          <div className="modal__header">
            <div className="modal__header-left">
              <h2 className="modal__title">{project.title}</h2>
              {project.images && project.images.length > 0 && (
                <div className="modal__tools">
                  {project.images.map((image, index) => (
                    <img
                      className="modal__tools-img primary-bg"
                      key={index}
                      src={image}
                      alt={`${project.title} tool ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="modal__links">
              {project.codeLink && (
                <a
                  href={project.codeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="modal__link-btn modal__link-btn--github">
                  <img src={icons.GitHub} alt="GitHub" />
                  <span>View Code</span>
                </a>
              )}
              {project.projectLink && (
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noreferrer"
                  className="modal__link-btn modal__link-btn--site">
                  <img src={icons.Link} alt="Live Site" />
                  <span>Live Site</span>
                </a>
              )}
            </div>
          </div>

          <p className="modal__description">{project.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = React.memo(() => {
  const { getAnimationProps } = useMotionAnimation();
  const { isMobile, isTablet } = useDeviceDetect();
  const [selectedProject, setSelectedProject] = useState(null);

  const itemRef = useRef();
  const textArray = Array(6).fill("P R O J E C T S");

  const getItemClass = useCallback(
    (project) => {
      return isMobile && !project.projectLink ? "hidden" : "project__item";
    },
    [isMobile],
  );

  return (
    <section className="project">
      <div className="project__container">
        <motion.div
          className="project__header"
          id="Projects"
          {...getAnimationProps("slideRight")}>
          <img src={icons.ProjectsHeader} alt="Header Icon" />
          <h1>Projects</h1>
        </motion.div>
        <div className="project__grid">
          {projects.map((project, index) => (
            <motion.div
              onClick={() => setSelectedProject(project)}
              ref={itemRef}
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              key={project.title ? project.title + index : index}
              className={`${getItemClass(project)} project__item primary-bg`}>
              <img
                src={project.imgUrl}
                loading="lazy"
                className="project__item-img"
                alt={
                  project.title ? project.title : "Placeholder Project Image"
                }
              />
              <motion.div
                className="project__item-info"
                {...getAnimationProps("slideRight")}>
                <div className="project__shelf">
                  <div className="project__shelf-block">
                    <h2 className="project__title">{project.title}</h2>
                    {project.images && project.images.length > 0 && (
                      <div className="project__tools ">
                        {project.images.map((image, index) => (
                          <img
                            className="project__tools-img primary-bg"
                            key={index}
                            src={image}
                            alt={`${project.title} - Image ${index + 1}`}
                            loading="lazy"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <p className="project__description">{project.description}</p>
              </motion.div>
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

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
});

export default Wrap(Projects, "Projects");
