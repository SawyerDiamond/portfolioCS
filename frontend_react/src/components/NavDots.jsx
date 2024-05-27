import React from "react";

const NavDots = ({ active }) => {
  return (
    <div className="dots">
      {["hero", "skills", "project", "Experience", "Contact"].map(
        (item, index) => (
          <a
            href={`#${item}`}
            key={item + index}
            className="dots__icon"
            style={
              active === item ? { background: "var(--pink-gradient)" } : {}
            }
          />
        )
      )}
    </div>
  );
};

export default NavDots;
