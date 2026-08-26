import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import { icons } from "../../constants";
import "./ProjectModal.scss";

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!project) return null;

  // Portalled out of the shell: the tab panel is transformed and clipped, which
  // would otherwise trap the fixed overlay.
  return createPortal(
    <motion.div
      className="modal__overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}>
      <motion.div
        className="modal__content"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
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
                      className="modal__tools-img"
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
    </motion.div>,
    document.body
  );
};

export default ProjectModal;
