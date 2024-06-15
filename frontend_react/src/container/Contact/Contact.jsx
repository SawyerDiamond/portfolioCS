import React, { useState } from "react";

import { images } from "../../constants";
import { Wrap } from "../../wrapper";
import { client } from "../../client";

import "./Contact.scss";

const Contact = () => {
  return (
    <>
      <div className="contact" id="contact"></div>
    </>
  );
};

export default Wrap(Contact, "contact");
