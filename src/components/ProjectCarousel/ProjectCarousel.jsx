import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Icon from "../Icon/Icon";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import "./ProjectCarousel.scss";

const AUTOPLAY_MS = 6500;

const slideVariants = {
  enter: (dir) => ({ y: dir > 0 ? "100%" : "-100%", opacity: 0.4 }),
  center: { y: 0, opacity: 1 },
  exit: (dir) => ({ y: dir > 0 ? "-100%" : "100%", opacity: 0.4 }),
};

const transition = { duration: 0.62, ease: [0.32, 0.72, 0, 1] };

/**
 * The vertical project carousel — one portrait slide at a time inside the
 * tallest box in the grid. Advance by drag, by the glass arrow buttons, by the
 * dot rail, or by autoplay (paused while the pointer is inside, and off under
 * reduced motion). Selecting a slide opens the case-study modal.
 */
const ProjectCarousel = ({ projects, onOpen }) => {
  const reduced = usePrefersReducedMotion();
  const [[index, direction], setState] = useState([0, 1]);
  const [paused, setPaused] = useState(false);
  const count = projects.length;

  const go = useCallback(
    (step) => {
      setState(([i]) => [(i + step + count) % count, step > 0 ? 1 : -1]);
    },
    [count]
  );

  const jumpTo = useCallback(
    (next) => setState(([i]) => [next, next > i ? 1 : -1]),
    []
  );

  // Autoplay. Reset the timer whenever the slide changes so a manual advance
  // gets a full dwell rather than the remainder of the previous interval.
  const goRef = useRef(go);
  goRef.current = go;
  useEffect(() => {
    if (reduced || paused) return undefined;
    const id = setInterval(() => goRef.current(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduced, paused, index]);

  const project = projects[index];

  return (
    <div
      className="carousel"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}>
      <div className="carousel__stage">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.article
            key={project.title}
            className="carousel__slide"
            custom={direction}
            variants={reduced ? undefined : slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            drag={reduced ? false : "y"}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.14}
            onDragEnd={(e, { offset, velocity }) => {
              const power = offset.y + velocity.y * 0.12;
              if (power < -60) go(1);
              else if (power > 60) go(-1);
            }}>
            <img
              src={project.imgUrl}
              alt=""
              className="carousel__image"
              draggable="false"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <span className="carousel__scrim" aria-hidden="true" />

            <div className="carousel__body">
              <span className="carousel__index t-meta">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(count).padStart(2, "0")}
              </span>
              <h3 className="carousel__title">{project.title}</h3>
              <p className="carousel__desc">{project.description}</p>

              <div className="carousel__actions">
                <button
                  type="button"
                  className="gbtn gbtn--blue glass"
                  onClick={() => onOpen(project)}
                  aria-haspopup="dialog">
                  Case study
                  <Icon name="arrowUpRight" size={17} />
                </button>
                {project.projectLink && (
                  <a
                    className="gbtn gbtn--icon glass"
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title}`}>
                    <Icon name="link" size={19} />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className="carousel__rail glass" role="tablist" aria-label="Projects">
        {projects.map((p, i) => (
          <button
            key={p.title}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={p.title}
            className={`carousel__dot ${i === index ? "is-active" : ""}`.trim()}
            onClick={() => jumpTo(i)}
          />
        ))}
      </div>

      <div className="carousel__nav">
        <button
          type="button"
          className="gbtn gbtn--icon gbtn--sm glass"
          onClick={() => go(-1)}
          aria-label="Previous project">
          <Icon name="arrowUp" size={18} />
        </button>
        <button
          type="button"
          className="gbtn gbtn--icon gbtn--sm glass"
          onClick={() => go(1)}
          aria-label="Next project">
          <Icon name="arrowDown" size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProjectCarousel;
