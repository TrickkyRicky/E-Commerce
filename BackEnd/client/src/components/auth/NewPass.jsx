import React from "react";
import classes from "./Helper.module.scss";
import FormNewPass from "./form/FormNewPass.jsx";

const NewPass = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.contentWrapper}>
        <FormNewPass />
      </div>
    </div>
  );
};

export default NewPass;
