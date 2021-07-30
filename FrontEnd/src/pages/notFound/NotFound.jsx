// Any route not found relays to this page
import React, { Fragment } from "react";

import roboImg from "../../assets/robot.jpg";
const NotFound = () => {
  return (
    <div className={classes.container}>
      <h2>404 Page Not Found</h2>
      <img src={roboImg} alt="Robot" />
    </div>
  );
};

export default NotFound;
