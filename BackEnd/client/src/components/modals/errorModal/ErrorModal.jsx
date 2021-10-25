import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminActions } from "../../../store/admin/admin-slice";
import classes from "./ErrorModal.module.scss";

const ErrorModal = (props) => {
  const errorMsg = useSelector((state) => state.admin.errorMsg);
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(adminActions.setModalError(false));
  };

  const okClickHandler = () => {
    dispatch(adminActions.setModalError(false));
  };

  return (
    <Fragment>
      <div className={classes.overlay} onClick={closeModalHandler}></div>
      <div className={classes.container}>
        <div className={classes.contentContainer} style={{ height: "150px" }}>
          <div className={classes.containerInfo}>
            <h2>{errorMsg}</h2>
            <div className={classes.btnContainer}>
              <button onClick={okClickHandler}>Ok</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ErrorModal;
