import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminActions } from "../../../store/admin/admin-slice";
import classes from "./Modals.module.scss";

const EditModal = (props) => {
  const isOpen = useSelector((state) => state.admin.modalE);
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch(adminActions.setModalE(false));
  };

  return (
    <Fragment>
      <div className={classes.overlay} onClick={closeModalHandler}></div>
      <div className={classes.container}>
        <div className={classes.contentContainer}>{props.children}</div>
      </div>
    </Fragment>
  );
};

export default EditModal;
