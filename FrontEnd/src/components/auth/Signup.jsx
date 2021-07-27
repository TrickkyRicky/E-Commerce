import React from "react";
import classes from "./Helper.module.scss";
import FormSignup from "./form/FormSignup.jsx";

const Signup = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.contentWrapper}>
        <FormSignup />
      </div>
    </div>
  );
};

export default Signup;
