import React, { Fragment } from "react";
import classes from "./AnnounceBar.module.scss";

const AnnounceBar = (props) => {
  return (
    <Fragment>
      <div className={classes.container}>
        <p>First Time Buyer Sale, Get 30% Off. | View Our Other Sales Here</p>
      </div>
    </Fragment>
  );
};

export default AnnounceBar;
