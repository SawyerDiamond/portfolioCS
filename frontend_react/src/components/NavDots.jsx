import React from "react";
import useDeviceDetect from "../hooks/useDeviceDetect";

const NavDots = ({ active }) => {
  const { isMobile } = useDeviceDetect();

  if (isMobile) {
    return null;
  }

  return (
    <div className="dots">
      {["hero", "skills", "project", "Contact"].map((item, index) => (
        <a
          href={`#${item}`}
          key={item + index}
          className="dots__icon"
          style={active === item ? { background: "var(--pink-gradient)" } : {}}
        />
      ))}
    </div>
  );
};

export default NavDots;
