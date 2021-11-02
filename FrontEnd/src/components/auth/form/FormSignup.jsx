import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { HiOutlineMail } from "react-icons/hi";
import { BiLock } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import { postSignUp } from "../../../store/auth/auth-actions";

import classes from "./Form.module.scss";

const FormSignup = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [valid, setValid] = useState(null);
  const [nChecker, setNChecker] = useState(null);
  const [pChecker, setPChecker] = useState(null);

  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [isFocus3, setIsFocus3] = useState(false);

  const errMsg = useSelector((state) => state.auth.errorMsg);

  let eChecker = null;

  const isValid = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  if (valid === true && email !== "") {
    eChecker = <AiOutlineCheckCircle size="25" className={classes.checked} />;
  } else if (valid === false && email !== "") {
    eChecker = (
      <AiOutlineExclamationCircle size="25" className={classes.danger} />
    );
  }

  if (errMsg === "emailSU") {
    eChecker = (
      <AiOutlineExclamationCircle size="25" className={classes.danger} />
    );
  }

  const inputChangeHandler = (input) => {
    if (input.target.name === "name") {
      setName(input.target.value);
    }
    if (input.target.name === "email") {
      setEmail(input.target.value);
    }
    if (input.target.name === "password") {
      setPass(input.target.value);
    }
  };

  let line = {
    name: classes.line1,
    email: classes.line1,
    pass: classes.line1,
  };

  const onFocusHandler = (name) => {
    if (name === "name") {
      setIsFocus1(true);
    }
    if (name === "email") {
      setIsFocus2(true);
    }
    if (name === "pass") {
      setIsFocus3(true);
    }
  };
  const onBlurHandler = (value) => {
    if (value === "name") {
      setIsFocus1(false);
      if (name !== "" && name.length < 3) {
        setNChecker(
          <AiOutlineExclamationCircle size="25" className={classes.danger} />
        );
      } else if (name.length >= 3) {
        setNChecker(
          <AiOutlineCheckCircle size="25" className={classes.checked} />
        );
      } else {
        setNChecker(null);
      }
    }
    if (value === "email") {
      setIsFocus2(false);
      setValid(isValid(email));
    }
    if (value === "pass") {
      setIsFocus3(false);
      if (pass !== "" && pass.length < 3) {
        setPChecker(
          <AiOutlineExclamationCircle size="25" className={classes.danger} />
        );
      } else if (pass.length >= 3) {
        setPChecker(
          <AiOutlineCheckCircle size="25" className={classes.checked} />
        );
      }
    }
  };

  if (name.length !== 0 || isFocus1) {
    line.name = classes.line2;
  }
  if (email.length !== 0 || isFocus2) {
    line.email = classes.line2;
  }
  if (pass.length !== 0 || isFocus3) {
    line.pass = classes.line2;
  }

  const onSubmitHandler = async (e, name, email, pass) => {
    e.preventDefault();
    const isTrue = await dispatch(postSignUp(name, email, pass));
    if (isTrue) {
      history.replace("/auth");
    }
  };

  return (
    <form
      onSubmit={(e) => onSubmitHandler(e, name, email, pass)}
      autoComplete="off"
      className={classes.container}
    >
      <h2>SignUp</h2>
      <div className={classes.content}>
        <p>Name</p>
        <div className={line.name}>
          <BsPerson size="22" className={classes.logo} />
          <input
            type="text"
            name="name"
            required
            minLength="3"
            placeholder="Type your name"
            autoComplete="falsey"
            onChange={inputChangeHandler}
            value={name}
            onFocus={() => onFocusHandler("name")}
            onBlur={() => onBlurHandler("name")}
          />
          {nChecker}
        </div>
      </div>
      <div className={classes.content} style={{ marginBottom: "2.3rem" }}>
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
            onBlur={() => onBlurHandler("email")}
          />
          {eChecker}
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
            onBlur={() => onBlurHandler("pass")}
          />
          {pChecker}
        </div>
      </div>

      <button>SignUp</button>
    </form>
  );
};

export default FormSignup;
