import React from "react";
import classes from "./Footer.module.scss";

const Footer = (props) => {
  return (
    <div className={classes.container}>
      <div>
        <p>Social media icons here</p>
      </div>
      <div>
        <p>Android and Apple Play Store Here</p>
      </div>
      <div>
        <p>Created by Richard Young and copyright</p>
      </div>
    </div>
  );
};

export default Footer;
