import React, { useState } from "react";
import { Wrap } from "../../wrapper";
import { BlossomCarousel } from "@blossom-carousel/react";
import "@blossom-carousel/react/style.css";
import "./Projects.scss";
import { icons, projects } from "../../constants";
import { motion, AnimatePresence } from "framer-motion";
import Reveal, { RevealGroup } from "../../components/Reveal/Reveal";
import ShapeIcon from "../../components/ShapeIcon/ShapeIcon";

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

          {project.showDescription && project.detailedDescription && (
            <div
              className="modal__detailed-desc"
              dangerouslySetInnerHTML={{ __html: project.detailedDescription }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = React.memo(() => {
  const [selectedProject, setSelectedProject] = useState(null);
  // Two lines, not six: the watermark is clipped to the section box, and at
  // this size — big enough to run off the sides on purpose — three lines
  // stood taller than the section does, so the top and bottom ones only ever
  // rendered as sliced half-lines. Running off the *sides* is fine; that's
  // the point. Getting sliced top and bottom isn't.
  const textArray = Array(2).fill("P R O J E C T S");

  return (
    <section className="project">
      <RevealGroup className="project__container">
        <Reveal className="project__header" id="Projects" distance="column">
          <ShapeIcon name="burst" tone="pink" className="project__header-icon" />
          <h1>Projects</h1>
        </Reveal>

        {/* Blossom enhances the native scroller with drag rather than replacing
            it, so the row keeps real scrolling, keyboard access and momentum.
            The carousel arrives as one block on the header's heels — the cards
            scroll horizontally, so staggering them individually would leave
            whatever is off-screen to pop in later. */}
        <Reveal>
        <BlossomCarousel as="ul" className="pcarousel">
          {projects.map((project, index) => (
            <li
              className="pcarousel__slide"
              data-blossom-slide
              key={project.title ? project.title + index : index}>
              <button
                type="button"
                className="pcard"
                aria-label={`Open ${project.title}`}
                onClick={() => setSelectedProject(project)}>
                <img
                  className="pcard__img"
                  src={project.imgUrl}
                  alt=""
                  loading="lazy"
                />

                <span className="pcard__meta">
                  <span className="pcard__title">{project.title}</span>
                  {project.images?.length > 0 && (
                    <span className="pcard__tools">
                      {project.images.slice(0, 4).map((image, toolIndex) => (
                        <img key={toolIndex} src={image} alt="" />
                      ))}
                    </span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </BlossomCarousel>
        </Reveal>
      </RevealGroup>

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
