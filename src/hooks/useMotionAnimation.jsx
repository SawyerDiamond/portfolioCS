import { useCallback } from "react";

const useMotionAnimation = () => {
  const getAnimationProps = useCallback((type) => {
    switch (type) {
      case "slideRight":
        return {
          whileInView: { x: [-100, 0], opacity: [0, 1] },
          transition: { duration: 0.5, type: "tween" },
        };
      case "slideUp":
        return {
          whileInView: { y: [100, 0], opacity: [0, 1] },
          transition: { duration: 0.5, type: "tween" },
        };
      default:
        return {};
    }
  }, []);

  return { getAnimationProps };
};

export default useMotionAnimation;
