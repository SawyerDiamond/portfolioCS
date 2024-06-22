import React, { useState } from "react";

import { icons } from "../../constants";
import { Wrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";

import "./Contact.scss";

const Contact = () => {
  return (
    <>
      <section className="about" id="Contact">
        <div className="about__container">
          <header className="about__header">
            <img src={icons.Contact} alt="About Icon" />
            <h1 className="about__text">Contact</h1>
          </header>
          <div className="content">
            <div className="contact primary-bg">
              <div className="secondary-bg"></div>
            </div>
            <div className="info primary-bg">
              <div className="about__container">
                <div className="about__header primary-bg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="about__bg"></div>
    </>
  );
};

export default MotionWrap(Wrap(Contact, "Contact"), "Contact");
