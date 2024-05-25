import React from "react";
import { NavDots } from "../components";
const Wrap = (Component, idName, classNames) =>
  function HOC() {
    return (
      <div id={idName} className={`${classNames}`}>
        <div className="wrapper">
          <Component />
        </div>
        <NavDots active={idName} />
      </div>
    );
  };

export default Wrap;
