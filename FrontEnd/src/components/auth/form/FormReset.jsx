import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { HiOutlineMail } from "react-icons/hi";

import { postReset } from "../../../store/auth/auth-actions";
import classes from "./Form.module.scss";

const FormReset = (props) => {
  const [email, setEmail] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const [isFocus2, setIsFocus2] = useState(false);

  const inputChangeHandler = (input) => {
    if (input.target.name === "email") {
      setEmail(input.target.value);
    }
  };

  let line = {
    email: classes.line1,
  };

  const onFocusHandler = (name) => {
    if (name === "email") {
      setIsFocus2(true);
    }
  };
  const onBlueHandler = (name) => {
    if (name === "email") {
      setIsFocus2(false);
    }
  };

  if (email.length !== 0 || isFocus2) {
    line.email = classes.line2;
  }

  const onSubmitHandler = (e, email) => {
    e.preventDefault();
    dispatch(postReset(email));
    // history.replace("/auth");
  };

  return (
    <form
      onSubmit={(e) => onSubmitHandler(e, email)}
      autoComplete="new-off"
      className={classes.container}
    >
      <h2>Forgot Password</h2>
      <div className={classes.content}>
        <p>Email</p>
        <div className={line.email}>
          <HiOutlineMail size="22" className={classes.logo} />
          <input
            type="email"
            name="email"
            placeholder="Type your email"
            required
            autoComplete="new-off"
            onChange={inputChangeHandler}
            value={email}
            onFocus={() => onFocusHandler("email")}
            onBlur={() => onBlueHandler("email")}
          />
        </div>
      </div>
      <button>Send Email</button>
    </form>
  );
};

export default FormReset;
