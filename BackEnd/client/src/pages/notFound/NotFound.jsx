// Any route not found relays to this page
import React, { Fragment } from "react";
import classes from "./NotFound.module.scss";
import roboImg from "../../assets/robot.jpg";
import roboImg2 from "../../assets/Bots.jpeg";
const NotFound = () => {
  return (
    <div className={classes.container}>
      <h2>404 Page Not Found</h2>
      <img src={roboImg2} alt="Robot" />
    </div>
  );
};

export default NotFound;
