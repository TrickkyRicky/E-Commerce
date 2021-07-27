import React from "react";
import classes from "./Helper.module.scss";
import FormLogin from "./form/FormLogin.jsx";

const Login = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.contentWrapper}>
        <FormLogin />
      </div>
    </div>
  );
};

export default Login;
