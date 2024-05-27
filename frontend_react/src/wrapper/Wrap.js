import React from "react";
import { NavDots } from "../components";
const Wrap = (Component, idName, classNames) =>
  function HOC() {
    return (
      <div id={idName} className={`flex ${classNames}`}>
        <NavDots active={idName} />
        <div className="wrapper">
          <Component />
        </div>
      </div>
    );
  };

export default Wrap;
