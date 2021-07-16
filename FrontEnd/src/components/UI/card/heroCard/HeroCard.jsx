import React from "react";
import classes from "./HeroCard.module.scss";

const HeroCard = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.imgContainer}>
        <h3>{props.imgName}</h3>
      </div>
    </div>
  );
};

export default HeroCard;
