import React from "react";
import { motion } from "framer-motion";

import { workHistory } from "../../constants";

const Work = () => (
  <section className="depth panel" id="Experience">
    <div className="panel__head">
      <span className="panel__chip panel__chip--gold" />
      <h2 className="panel__title">Work &amp; Education</h2>
    </div>

    <ul className="work">
      {workHistory.map((entry) => (
        <motion.li
          className={`work__row ${entry.isEducation ? "ring--pink" : "ring--blue"}`}
          key={`${entry.company}-${entry.title}`}
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}>
          <div className="work__logo">
            {entry.logo && <img src={entry.logo} alt={entry.company} loading="lazy" />}
          </div>

          <div className="work__body">
            <div className="work__head">
              <h3 className="work__title">{entry.title}</h3>
              <span className="work__period">{entry.period}</span>
            </div>
            <p className="work__company">
              {entry.company} <span>· {entry.location}</span>
            </p>
            {entry.description && <p className="work__desc">{entry.description}</p>}
          </div>
        </motion.li>
      ))}
    </ul>
  </section>
);

export default Work;
