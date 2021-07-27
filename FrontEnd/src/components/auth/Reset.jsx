import React from "react";
import classes from "./Helper.module.scss";
import FormReset from "./form/FormReset.jsx";

const Reset = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.contentWrapper}>
        <FormReset />
      </div>
    </div>
  );
};

export default Reset;
