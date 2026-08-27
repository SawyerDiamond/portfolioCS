import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { projects } from "../../constants";
import ProjectModal from "../../components/ProjectModal/ProjectModal";

// Repeating bento rhythm: one large tile, one wide tile, two small ones.
const SIZES = ["bento__tile--lg", "bento__tile--wide", "bento__tile--sm", "bento__tile--sm"];

const Bento = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="section" id="Projects">
      <h2 className="section__label">Projects</h2>

      <div className="bento">
        {projects.map((project, index) => (
          <motion.button
            type="button"
            key={project.title}
            className={`bento__tile ${SIZES[index % SIZES.length]}`}
            aria-label={`Open ${project.title}`}
            onClick={() => setSelected(project)}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}>
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
