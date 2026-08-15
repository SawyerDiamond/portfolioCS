import React, { useEffect } from "react";
import { motion } from "framer-motion";

import { useScrollContext } from "../../context/ScrollContext";
import { icons } from "../../constants";
import "./ProjectModal.scss";

const ProjectModal = ({ project, onClose }) => {
  const { lenisRef } = useScrollContext();

  // Freeze page scroll behind the modal; Escape closes. data-lenis-prevent on
  // the scrollable content lets wheel events scroll the case study natively.
  useEffect(() => {
    const lenis = lenisRef.current;
    lenis?.stop();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [lenisRef, onClose]);

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
        className="modal__content card"
        data-lenis-prevent
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}>
        <button className="modal__close pill" onClick={onClose} aria-label="Close">
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
                      className="modal__tools-img pill"
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
                  className="modal__link-btn modal__link-btn--github pill t-btn-sm">
                  <img src={icons.GitHub} alt="" />
                  <span>View Code</span>
                </a>
              )}
              {project.projectLink && (
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noreferrer"
                  className="modal__link-btn modal__link-btn--site pill t-btn-sm">
                  <img src={icons.Link} alt="" />
                  <span>Live Site</span>
                </a>
              )}
            </div>
          </div>

          <p className="modal__description t-body">{project.description}</p>

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

export default ProjectModal;
