import React, { useState } from "react";

import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { BiLock } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import { puthNewPass } from "../../../store/auth/auth-actions";
import classes from "./Form.module.scss";

const FormNewPass = (props) => {
  const [pass, setPass] = useState("");
  const id = useSelector((state) => state.auth.userIdReset);

  const { token } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [pChecker, setPChecker] = useState(null);
  const [isFocus3, setIsFocus3] = useState(false);

  const inputChangeHandler = (input) => {
    if (input.target.name === "password") {
      setPass(input.target.value);
    }
  };

  let line = {
    pass: classes.line1,
  };

  const onFocusHandler = (name) => {
    if (name === "pass") {
      setIsFocus3(true);
    }
  };
  const onBlueHandler = (name) => {
    if (name === "pass") {
      setIsFocus3(false);
      if (pass !== "" && pass.length < 3) {
        setPChecker(
          <AiOutlineExclamationCircle size="25" className={classes.danger} />
        );
      } else if (pass.length >= 3) {
        setPChecker(
          <AiOutlineCheckCircle size="25" className={classes.checked} />
        );
      } else {
        setPChecker(null);
      }
    }
  };

  if (pass.length !== 0 || isFocus3) {
    line.pass = classes.line2;
  }

  // use useEffect to fetch getNewPass data from action
  // useEffect(() => {
  //   dispatch(getNewPass(token));
  // }, [dispatch, token]);

  const onSubmitHandler = (e, pass, token, id) => {
    e.preventDefault();
    dispatch(puthNewPass(pass, token, id));
    history.replace("/auth");
  };

  return (
    <form
      // add token and id back later
      onSubmit={(e) => onSubmitHandler(e, pass, token, id)}
      autoComplete="off"
      className={classes.container}
    >
      <h2>New Password</h2>
      <div className={classes.content}>
        <p>New Password</p>
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
          {pChecker}
        </div>
      </div>
      <button>Reset</button>
    </form>
  );
};

export default FormNewPass;
