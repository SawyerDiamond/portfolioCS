import React from "react";
import { motion } from "framer-motion";

const MotionWrap = (Component, classNames) =>
  function HOC() {
    return (
      <motion.div
        whileInView={{ y: [250, 100, 0], opacity: [0, 0, 1] }}
        transition={{ duration: 0.45, type: "tween" }}
        className={`${classNames} app__flex`}>
        <Component />
      </motion.div>
    );
  };

export default MotionWrap;
