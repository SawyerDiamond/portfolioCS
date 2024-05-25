import React from "react";

const NavDots = ({ active }) => {
  return (
    <div className="dots">
      {["Home", "Skills", "Projects", "Experience", "Contact"].map(
        (item, index) => (
          <a
            href={`#${item}`}
            key={item + index}
            className="dots__icon"
            style={active === item ? { backgroundColor: "#313BAC" } : {}}
          />
        )
      )}
    </div>
  );
};

export default NavDots;
