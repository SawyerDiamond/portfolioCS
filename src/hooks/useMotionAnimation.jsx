import { useCallback } from "react";

const useMotionAnimation = () => {
  const getAnimationProps = useCallback((type) => {
    switch (type) {
      case "slideRight":
        return {
          whileInView: { x: [-80, 0], opacity: [0, 1] },
          transition: {
            duration: 0.6,
            type: "spring",
            stiffness: 80,
            damping: 18,
          },
          viewport: { once: true, amount: 0.3 },
        };
      case "slideUp":
        return {
          whileInView: { y: [60, 0], opacity: [0, 1] },
          transition: {
            duration: 0.6,
            type: "spring",
            stiffness: 80,
            damping: 18,
          },
          viewport: { once: true, amount: 0.3 },
        };
      default:
        return {};
    }
  }, []);

  return { getAnimationProps };
};

export default useMotionAnimation;
