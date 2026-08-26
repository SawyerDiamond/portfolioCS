import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { projects } from "../../constants";
import ProjectModal from "../../components/ProjectModal/ProjectModal";

// Drives every size change in the stack. Soft enough to read as gliding rather
// than snapping, stiff enough not to feel laggy on a fast scroll.
const glide = { type: "spring", stiffness: 220, damping: 30, mass: 0.9 };

// One wheel notch (or swipe) advances one card; the lock swallows the rest of
// the inertia burst a trackpad emits so it can't skip the whole list.
const STEP_LOCK_MS = 360;
const WHEEL_THRESHOLD = 12;
const SWIPE_THRESHOLD = 40;

// How long each card holds before the stack advances on its own.
const DWELL_MS = 4200;

const Projects = () => {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const [paused, setPaused] = useState(false);
  const locked = useRef(false);
  const touchStart = useRef(null);

  const step = useCallback((direction) => {
    setActive((current) => {
      const next = current + direction;
      return next < 0 || next > projects.length - 1 ? current : next;
    });
  }, []);

  const guardedStep = useCallback(
    (direction) => {
      if (locked.current) return;
      locked.current = true;
      step(direction);
      setTimeout(() => {
        locked.current = false;
      }, STEP_LOCK_MS);
    },
    [step]
  );

  // Keyed on `active`, so any manual step restarts the dwell rather than the
  // card being yanked forward by a timer that was already part-way through.
  useEffect(() => {
    if (paused || selected) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const id = setTimeout(() => {
      setActive((current) => (current + 1) % projects.length);
    }, DWELL_MS);

    return () => clearTimeout(id);
  }, [active, paused, selected]);

  const onWheel = (event) => {
    if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;
    guardedStep(event.deltaY > 0 ? 1 : -1);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      guardedStep(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      guardedStep(-1);
    }
  };

  const onTouchStart = (event) => {
    touchStart.current = event.touches[0].clientY;
  };

  const onTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - event.changedTouches[0].clientY;
    if (Math.abs(delta) > SWIPE_THRESHOLD) guardedStep(delta > 0 ? 1 : -1);
    touchStart.current = null;
  };

  return (
    <section id="Projects" className="pstack-wrap">
      <div
        className="pstack"
        role="listbox"
        aria-label="Projects"
        tabIndex={0}
        onWheel={onWheel}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}>
        {projects.map((project, index) => {
          const isActive = index === active;

          return (
            <motion.div
              key={project.title}
              className={`pstack__card${isActive ? " is-active" : ""}`}
              // flex-grow rather than height: flexbox recomputes the real
              // layout each frame, so nothing gets transform-squashed.
              animate={{ flexGrow: isActive ? 1 : 0 }}
              transition={glide}>
              <button
                type="button"
                className="pstack__hit"
                role="option"
                aria-selected={isActive}
                aria-label={
                  isActive ? `Open ${project.title}` : `Show ${project.title}`
                }
                onClick={() =>
                  isActive ? setSelected(project) : setActive(index)
                }>
                <img
                  className="pstack__img"
                  src={project.imgUrl}
                  alt=""
                  loading="lazy"
                />

                <AnimatePresence initial={false}>
                  {!isActive && (
                    <motion.span
                      className="pstack__preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}>
                      <span className="pstack__preview-title">
                        {project.title}
                      </span>
                      {project.images?.length > 0 && (
                        <span className="pstack__preview-tools">
                          {project.images.slice(0, 4).map((image, toolIndex) => (
                            <img key={toolIndex} src={image} alt="" />
                          ))}
                        </span>
                      )}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
