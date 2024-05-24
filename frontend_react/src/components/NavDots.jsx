import React from "react";

const NavDots = ({ active, setToggle }) => {
  return (
    <div className="nav-dots">
      {["Home", "Skills", "Projects", "Experience"].map((item, index) => (
        <a
          href={`#${item}`}
          onClick={() => setToggle(false)}
          key={item + index}
          className="nav-dots__dot"
          style={active === item ? { backgroundColor: "#072" } : {}}>
          {item}
        </a>
      ))}
    </div>
  );
};

export default NavDots;
