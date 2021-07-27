import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { HiOutlineMail } from "react-icons/hi";
import { BiLock } from "react-icons/bi";

import { postLogin } from "../../../store/auth/auth-actions";
import classes from "./Form.module.scss";

const FormLogin = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const isAuth = useSelector((state) => state.auth.isAuth);
  console.log(isAuth);

  const history = useHistory();
  const dispatch = useDispatch();

  const [isFocus2, setIsFocus2] = useState(false);
  const [isFocus3, setIsFocus3] = useState(false);

  const inputChangeHandler = (input) => {
    if (input.target.name === "email") {
      setEmail(input.target.value);
    }
    if (input.target.name === "password") {
      setPass(input.target.value);
    }
  };

  let line = {
    email: classes.line1,
    pass: classes.line1,
  };

  const onFocusHandler = (name) => {
    if (name === "email") {
      setIsFocus2(true);
    }
    if (name === "pass") {
      setIsFocus3(true);
    }
  };
  const onBlueHandler = (name) => {
    if (name === "email") {
      setIsFocus2(false);
    }
    if (name === "pass") {
      setIsFocus3(false);
    }
  };

  if (email.length !== 0 || isFocus2) {
    line.email = classes.line2;
  }
  if (pass.length !== 0 || isFocus3) {
    line.pass = classes.line2;
  }

  const onSubmitHandler = async (e, email, pass) => {
    e.preventDefault();
    const isTrue = await dispatch(postLogin(email, pass));
    if (isTrue) {
      history.replace("/");
    }
  };

  return (
    <form
      onSubmit={(e) => onSubmitHandler(e, email, pass)}
      autoComplete="off"
      className={classes.container}
    >
      <h2>Login</h2>
      <div className={classes.content}>
        <p>Email</p>
        <div className={line.email}>
          <HiOutlineMail size="22" className={classes.logo} />
          <input
            type="email"
            name="email"
            placeholder="Type your email"
            required
            autoComplete="off"
            onChange={inputChangeHandler}
            value={email}
            onFocus={() => onFocusHandler("email")}
            onBlur={() => onBlueHandler("email")}
          />
        </div>
      </div>
      <div className={classes.content}>
        <p>Password</p>
        <div className={line.pass}>
          <BiLock size="22" className={classes.logo} />
          <input
            type="password"
            name="password"
            required
            placeholder="Type your password"
            onChange={inputChangeHandler}
            value={pass}
            onFocus={() => onFocusHandler("pass")}
            onBlur={() => onBlueHandler("pass")}
          />
        </div>
      </div>
      <div className={classes.forgot}>
        <a href="/auth/reset">Forgot Password?</a>
      </div>
      <button>Login</button>

      <div className={classes.signup}>
        <p>
          Don't have an account? <a href="/auth/signup">Sign Up</a>
        </p>
      </div>
    </form>
  );
};

export default FormLogin;
