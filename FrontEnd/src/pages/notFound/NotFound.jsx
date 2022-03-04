// Any route not found relays to this page
import React from "react";
import classes from "./NotFound.module.scss";
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
