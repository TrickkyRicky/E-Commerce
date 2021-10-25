import React from "react";
import classes from "./LoadingCard.module.scss";

const LoadingCard = (props) => {
  return (
    <div className={`${classes.container} ${classes.loading}`}>
      <div className={classes.image}></div>
      <div className={classes.productInfo}>
        <div className={classes.h5Tag}></div>
        <div className={classes.pTag}></div>
      </div>
    </div>
  );
};

export default LoadingCard;
