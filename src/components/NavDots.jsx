import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import useDeviceDetect from "../hooks/useDeviceDetect";

const sections = ["Home", "Skills", "Projects", "Contact"];

const NavDots = () => {
  const { isDesktop } = useDeviceDetect();
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const observers = [];
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    sections.forEach((section) => {
      const el = document.getElementById(section);
      if (el) {
        const observer = new IntersectionObserver(
          handleIntersect,
          observerOptions,
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleClick = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (!isDesktop) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="dots">
      {sections.map((item) => (
        <button
          key={item}
          onClick={() => handleClick(item)}
          className="dots__icon"
          aria-label={`Navigate to ${item}`}
          style={
            activeSection === item
              ? { background: "var(--pink-gradient)", transform: "scale(1.3)" }
              : {}
          }
        />
      ))}
    </motion.div>
  );
};

export default NavDots;
