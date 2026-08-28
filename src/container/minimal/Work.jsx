import React from "react";
import { motion } from "framer-motion";

import { workHistory } from "../../constants";

const fadeUp = (delay) => ({
  initial: { y: 16, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
});

// Chrome (title row, meta strip) sits on the outer card; the content lives on
// an inset panel one step in front of it.
const Record = ({ entry, tone, bulleted, delay }) => (
  <motion.article className={`xp__record xp__record--${tone}`} {...fadeUp(delay)}>
    <header className="xp__bar">
      <span className={`xp__logo${entry.logoFill ? " xp__logo--fill" : ""}`}>
        {entry.logo && <img src={entry.logo} alt="" loading="lazy" />}
      </span>

      <h3 className="xp__ident">
        <span className="xp__role">{entry.title}</span>
        <span className="xp__at">at</span>
        <span className="xp__org">{entry.company}</span>
      </h3>

      <time className="xp__period">{entry.period}</time>
    </header>

    <div className="xp__panel">
      {bulleted ? (
        <ul className="xp__points">
          {entry.highlights.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      ) : (
        <p className="xp__prose">{entry.highlights.join(" ")}</p>
      )}
    </div>

    <footer className="xp__foot">
      {entry.type && <span className="xp__type">{entry.type}</span>}
      <span className="xp__location">{entry.location}</span>
    </footer>
  </motion.article>
);

const Work = () => {
  const experience = workHistory.filter((entry) => !entry.isEducation);
  const education = workHistory.filter((entry) => entry.isEducation);

  return (
    <section id="Experience">
      <div className="xp">
        <div className="xp__group">
          <h4 className="xp__label">Experience</h4>
          {experience.map((entry, index) => (
            <Record
              key={entry.company}
              entry={entry}
              tone="blue"
              bulleted
              delay={index * 0.07}
            />
          ))}
        </div>

        <div className="xp__group">
          <h4 className="xp__label">Education</h4>
          {education.map((entry, index) => (
            <Record
              key={entry.company}
              entry={entry}
              tone="gold"
              delay={(experience.length + index) * 0.07}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
