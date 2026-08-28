import React from "react";
import { motion } from "framer-motion";

import { skillGroups } from "../../constants";

// Accent cycle shared with the project tiles — blue leads, gold and pink follow.
const TONES = [
  { accent: "var(--blue-gradient)", glow: "rgba(9, 113, 240, 0.85)" },
  { accent: "var(--yellow-gradient)", glow: "rgba(247, 153, 29, 0.7)" },
  { accent: "var(--pink-gradient)", glow: "rgba(233, 56, 192, 0.7)" },
];

const Stack = () => (
  <section id="Stack">
    <div className="stack">
      {skillGroups.map((group, groupIndex) => {
        const tone = TONES[groupIndex % TONES.length];

        return (
          <motion.div
            className="stack__group"
            key={group.label}
            style={{ "--group-accent": tone.accent, "--group-glow": tone.glow }}
            initial={{ y: 14, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: groupIndex * 0.06,
              ease: [0.25, 0.1, 0.25, 1],
            }}>
            <div className="stack__group-head">
              <span className="stack__group-tick" aria-hidden="true" />
              <h3 className="stack__group-label">{group.label}</h3>
              <span className="stack__group-rule" aria-hidden="true" />
            </div>

            <ul className="stack__pills">
              {group.items.map(({ name, Icon, src, rounded, small }) => (
                <li className="stack__pill" key={name}>
                  <span className="stack__pill-icon">
                    {Icon ? (
                      <Icon size={small ? 15 : 17} />
                    ) : (
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        style={rounded ? { borderRadius: "0.2rem" } : undefined}
                      />
                    )}
                  </span>
                  <span className="stack__pill-label">{name}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  </section>
);

export default Stack;
