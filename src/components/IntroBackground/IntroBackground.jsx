import React from "react";

import bgVideo from "../../assets/pattern.mp4";

import "./IntroBackground.scss";

const IntroBackground = () => (
  <div className="intro-bg" aria-hidden="true">
    <video
      className="intro-bg__video"
      src={bgVideo}
      autoPlay
      loop
      muted
      playsInline
    />
    <div className="intro-bg__fade" />
  </div>
);

export default IntroBackground;
