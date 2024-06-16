import React, { useState } from "react";

import { images } from "../../constants";
import { Wrap } from "../../wrapper";
import { client } from "../../client";

import "./Contact.scss";

const Contact = () => {
  return (
    <>
      <section className="contact" id="contact"></section>
    </>
  );
};

export default Wrap(Contact, "contact");
