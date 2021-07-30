import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getEditProduct,
} from "../../../../store/admin/admin-actions";
import { adminActions } from "../../../../store/admin/admin-slice";
import classes from "./DeleteProduct.module.scss";

const DeleteProduct = (props) => {
  const product = useSelector((state) => state.admin.editProduct[0]);

  const jwt = useSelector((state) => state.auth.jwtToken);
  const dispatch = useDispatch();

  const yesClickHandler = () => {
    if (product._id) {
      dispatch(deleteProduct(jwt, product._id));
    }
  };
  const noClickHandler = () => {
    dispatch(adminActions.setModalD(false));
  };

  return (
    <div className={classes.container}>
      <h2>Are You Sure You Wish To Delete This Product?</h2>
      <div className={classes.btnContainer}>
        <button onClick={yesClickHandler}>Yes</button>
        <button onClick={noClickHandler}>No</button>
      </div>
    </div>
  );
};

export default DeleteProduct;
