// component to hero slider, this makes up the card that is displayed on the hero slider

import React from "react";
import classes from "./HeroCard.module.scss";

const HeroCard = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.imgContainer}>
        <img src={props.img} alt={props.imgName} />
      </div>
    </div>
  );
};

export default HeroCard;
