import { useEffect, useState } from "react";

// Tracks which section anchor currently owns the viewport. The -40% margins
// collapse the root down to a middle band, so a section only counts as active
// once it actually occupies the center of the screen rather than the moment it
// peeks in from the bottom.
const useActiveSection = (sections) => {
  const [active, setActive] = useState(sections[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return active;
};

export default useActiveSection;
