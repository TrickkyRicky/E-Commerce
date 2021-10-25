import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminActions } from "../../../store/admin/admin-slice";
import classes from "./Modals.module.scss";

const DeleteModal = (props) => {
  const isOpen = useSelector((state) => state.admin.modalD);
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(adminActions.setModalD(false));
  };

  return (
    <Fragment>
      <div className={classes.overlay} onClick={closeModalHandler}></div>
      <div className={classes.container}>
        <div className={classes.contentContainer} style={{ height: "150px" }}>
          {props.children}
        </div>
      </div>
    </Fragment>
  );
};

export default DeleteModal;
