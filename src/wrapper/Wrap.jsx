import React from "react";
const Wrap = (Component, idName, classNames) =>
  function HOC() {
    return (
      <div id={idName} className={`flex ${classNames}`}>
        <div className="wrapper">
          <Component />
        </div>
      </div>
    );
  };

export default Wrap;
