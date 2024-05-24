import { useState, useEffect } from "react";

const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 767px)").matches
  );
  const [isTablet, setIsTablet] = useState(
    window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches
  );
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 1025px)").matches
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
      setIsTablet(
        window.matchMedia("(min-width: 768px) and (max-width: 1024px)").matches
      );
      setIsDesktop(window.matchMedia("(min-width: 1025px)").matches);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, isTablet, isDesktop };
};

export default useDeviceDetect;
