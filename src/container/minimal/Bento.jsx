import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { projects } from "../../constants";
import ProjectModal from "../../components/ProjectModal/ProjectModal";

// Repeating bento rhythm: one large tile, one wide tile, two small ones.
const SIZES = ["bento__tile--lg", "bento__tile--wide", "bento__tile--sm", "bento__tile--sm"];
// Accent cycle — blue leads, gold and pink follow.
const TONES = ["bento__tile--blue", "bento__tile--gold", "bento__tile--pink", "bento__tile--blue"];

const Bento = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="projects" id="Projects">
      <div className="projects__head">
        <span className="panel__chip panel__chip--blue" />
        <h2 className="panel__title">Projects</h2>
        <span className="panel__count">{projects.length} selected</span>
      </div>

      <div className="bento">
        {projects.map((project, index) => (
          <motion.button
            type="button"
            key={project.title}
            className={`bento__tile ${SIZES[index % SIZES.length]} ${TONES[index % TONES.length]}`}
            aria-label={`Open ${project.title}`}
            onClick={() => setSelected(project)}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}>
            <img src={project.imgUrl} alt={project.title} loading="lazy" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Bento;
