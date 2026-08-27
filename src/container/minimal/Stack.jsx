import React from "react";
import { motion } from "framer-motion";

import { skillGroups } from "../../constants";

const RINGS = ["ring--blue", "ring--gold", "ring--pink"];

const Stack = () => (
  <section className="depth panel" id="Stack">
    <div className="panel__head">
      <span className="panel__chip panel__chip--pink" />
      <h2 className="panel__title">Stack</h2>
    </div>

    <div className="stack">
      {skillGroups.map((group, index) => (
        <motion.div
          className={`stack__group ${RINGS[index % RINGS.length]}`}
          key={group.label}
          initial={{ y: 14, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}>
          <span className="stack__label">{group.label}</span>
          <div className="stack__icons">
            {group.items.map(({ name, Icon, src, rounded, small }) => (
              <span
                className={`stack__icon${rounded ? " stack__icon--rounded" : ""}`}
                key={name}
                title={name}>
                {Icon ? (
                  <Icon size={small ? 16 : 20} />
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
