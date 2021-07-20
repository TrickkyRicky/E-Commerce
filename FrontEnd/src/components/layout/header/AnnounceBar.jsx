// top of the screen Annouce Bar to signal users of possible sales. Should not show if not on the home page
import React, { Fragment } from "react";
import classes from "./AnnounceBar.module.scss";

const AnnounceBar = (props) => {
  return (
    <Fragment>
      <div className={classes.container}>
        <p>
          First Time Buyer Sale, Get 30% Off. | View Our Other Sales{" "}
          <a href="/">Here</a>
        </p>
      </div>
    </Fragment>
  );
};

export default AnnounceBar;
