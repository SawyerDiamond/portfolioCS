import React from "react";
import { motion } from "framer-motion";
import useDeviceDetect from "../hooks/useDeviceDetect";

const NavDots = ({ active }) => {
  const { isMobile } = useDeviceDetect();

  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      animate={{ y: [-150, 0], opacity: [0, 1] }}
      transition={{ duration: 1 }}
      className="dots">
      {["Home", "Skills", "Projects", "Contact"].map((item, index) => (
        <a
          href={`#${item}`}
          key={item + index}
          className="dots__icon"
          style={active === item ? { background: "var(--pink-gradient)" } : {}}
        />
      ))}
    </motion.div>
  );
};

export default NavDots;
