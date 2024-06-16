import React, { useState } from "react";

import { images, icons } from "../../constants";
import { Wrap } from "../../wrapper";
import { client } from "../../client";

import "./Contact.scss";

const Contact = () => {
  return (
    <>
      <section className="contact" id="contact">
        <div className="contact__container">
          <header className="contact__header">
            <img src={icons.Contact} alt="Contact Icon" />
            <h1>Contact Me</h1>
          </header>
        </div>
      </section>
    </>
  );
};

export default Wrap(Contact, "contact");
