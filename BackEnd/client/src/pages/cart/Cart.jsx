// page with hero image slider and recently added products
import React from "react";
import classes from "./Cart.module.scss";
import CartLayout from "../../components/layout/cart/CartLayout.jsx";

const Cart = () => {
  return (
    <div className={classes.container}>
      <CartLayout />
    </div>
  );
};

export default Cart;
