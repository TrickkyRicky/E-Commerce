// login and signup page
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import classes from "./Auth.module.scss";
import Signup from "../../components/auth/Signup.jsx";
import Login from "../../components/auth/Login.jsx";
import Reset from "../../components/auth/Reset.jsx";
import NewPass from "../../components/auth/NewPass.jsx";
import { getNewPass } from "../../store/auth/auth-actions";

const Auth = (props) => {
  const location = useLocation();
  const { token } = useParams();
  const dispatch = useDispatch();
  const cToken = useSelector((state) => state.auth.cryptoToken);

  useEffect(() => {
    if (token !== undefined) {
      dispatch(getNewPass(token));
    }
  }, [dispatch, token]);

  let auth = <Login />;
  if (location.pathname === "/auth/signup") {
    auth = <Signup />;
  }
  if (location.pathname === "/auth/reset") {
    auth = <Reset />;
  }
  if (
    location.pathname === "/auth/newpass/" + token &&
    location.pathname === "/auth/newpass/" + cToken
  ) {
    auth = <NewPass />;
  }
  return (
    <div className={classes.container}>
      <li></li>
      <li></li>
      <li></li>
      {auth}
    </div>
  );
};

export default Auth;
