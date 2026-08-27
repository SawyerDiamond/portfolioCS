import React from "react";
import { motion } from "framer-motion";

import { skillGroups } from "../../constants";

const Stack = () => (
  <section className="section" id="Stack">
    <h2 className="section__label">Stack</h2>

    <div className="stack">
      {skillGroups.map((group) => (
        <motion.div
          className="stack__group"
          key={group.label}
          initial={{ y: 14, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}>
          <span className="stack__label">{group.label}</span>
          <div className="stack__icons">
            {group.items.map(({ name, Icon, src, rounded, small }) => (
              <span
                className={`stack__icon${rounded ? " stack__icon--rounded" : ""}`}
                key={name}
                title={name}>
                {Icon ? (
                  <Icon size={small ? 18 : 22} />
                ) : (
                  <img src={src} alt={name} loading="lazy" />
                )}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Stack;
