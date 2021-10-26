import { authActions } from "./auth-slice";
import { dev } from "../../util/dev";

export const postSignUp = (name, email, pass) => {
  return async (dispatch) => {
    const putData = async () => {
      const res = await fetch(dev() + "/auth/signup", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: pass,
        }),
      });
      if (res.status === 409) {
        return await res.json();
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log("Error!");
        throw new Error("Account creation failed");
      }
      return await res.json();
    };
    try {
      const result = await putData();

      if (result.message) {
        if (result.message === "This email is already in use") {
          dispatch(authActions.setErrorMsg("emailSU"));
          throw new Error("email");
        }
      }

      authActions.setAuth(false);
      dispatch(
        authActions.successfulSignup({
          result: result,
        })
      );
      return true;
    } catch (err) {
      console.log(err);
      authActions.setAuth(false);
    }
  };
};

export const postLogin = (email, pass) => {
  authActions.setLoading(true);
  return async (dispatch) => {
    const postData = async () => {
      const res = await fetch(dev() + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: pass,
        }),
      });

      if (res.status === 401) {
        return await res.json();
      }
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Could not authenticate you!");
      }
      return await res.json();
    };

    try {
      const result = await postData();
      if (result.message) {
        if (result.message === "No user with this email exist") {
          dispatch(authActions.setErrorMsg("email"));
          throw new Error("email");
        } else if (result.message === "Wrong Password") {
          dispatch(authActions.setErrorMsg("pass"));
          throw new Error("pass");
        }
      }
      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.userId);
      dispatch(authActions.setLoading(false));
      dispatch(authActions.setAuth(true));
      dispatch(
        authActions.successLogin({
          jwtToken: result.token,
          userId: result.userId,
        })
      );
      return true;
    } catch (err) {
      dispatch(authActions.setLoading(false));
      dispatch(authActions.setAuth(false));
    }
  };
};

export const postReset = (email) => {
  return async (dispatch) => {
    const postData = async () => {
      const res = await fetch(dev() + "/auth/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (res.status === 401) {
        throw new Error("No account with that email found.");
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log("Error!");
        throw new Error("Account creation failed");
      }
      return res.json();
    };
    try {
      const result = await postData();
      console.log(result);
      authActions.setAuth(false);
      dispatch(
        authActions.successReset({
          result: result,
        })
      );
    } catch (err) {
      console.log(err);
      authActions.setAuth(false);
    }
  };
};

export const getNewPass = (token) => {
  return async (dispatch) => {
    const getData = async () => {
      const res = await fetch(dev() + "/auth/newpass/" + token);
      if (res.status === 401) {
        throw new Error("Token is expired, Please reset again");
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log("Error!");
        throw new Error("Reset failed");
      }
      return res.json();
    };
    try {
      const result = await getData();
      console.log(result);
      authActions.setAuth(false);
      dispatch(
        authActions.setTokenAndUser({
          cryptoToken: result.cryptoToken,
          id: result.userId,
        })
      );
    } catch (err) {
      console.log(err);
      authActions.setAuth(false);
    }
  };
};

export const puthNewPass = (pass, token, id) => {
  return async (dispatch) => {
    const putData = async () => {
      const res = await fetch(dev() + "/auth/newpass", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: pass,
          cryptoToken: token,
          userId: id,
        }),
      });
      if (res.status === 401) {
        throw new Error("Token is expired, Please reset again");
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log("Error!");
        throw new Error("Reset failed");
      }
      return res.json();
    };
    try {
      const result = await putData();
      console.log(result);
      authActions.setAuth(false);
      dispatch(
        authActions.successPassReset({
          result: result,
        })
      );
    } catch (err) {
      console.log(err);
      authActions.setAuth(false);
    }
  };
};
