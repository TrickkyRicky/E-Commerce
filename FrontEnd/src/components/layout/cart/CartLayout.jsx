import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../../store/admin/admin-actions.js";
import Spinner from "../../UI/spinner/Spinner.jsx";
import CartCard from "../../UI/card/cartCard/CartCard";
import classes from "./CartLayout.module.scss";

const CartLayout = (props) => {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.auth.jwtToken);
  const cart = useSelector((state) => state.admin.cart);
  const total = useSelector((state) => state.admin.total);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    dispatch(getCart(jwt));
  }, [dispatch, jwt]);

  let emptyContent = null;
  if (isLoading) {
    emptyContent = <Spinner />;
  }
  if (!isAuth) {
    emptyContent = (
      <div className={classes.emptyMsg}>
        <h3>Your cart is empty please login to add products to your cart</h3>
      </div>
    );
  }
  if (isAuth && cart.length === 0 && isLoading === false) {
    emptyContent = (
      <div className={classes.emptyMsg}>
        <Spinner />
        {/* <h3>
          Your cart is empty please add a product to your cart for checkout
        </h3> */}
      </div>
    );
  }
  let content = null;
  content = cart.map((prod) => {
    let checkPrice = null;
    if (prod.productId.salePrice) {
      checkPrice = prod.productId.salePrice;
    } else {
      checkPrice = prod.productId.price;
    }
    return (
      <CartCard
        key={prod._id}
        id={prod.productId._id}
        imageUrl={prod.productId.imageUrl}
        image={prod.productId.image}
        title={prod.productId.title}
        price={checkPrice}
        color={prod.productId.color}
        size={prod.size}
        qty={prod.quantity}
      />
    );
  });
  return (
    <div className={classes.container}>
      <div className={classes.cardContainer}>
        {emptyContent}
        {content}
      </div>
      {isAuth && cart.length !== 0 && (
        <div className={classes.checkOutContainer}>
          <p>Total: {total}</p>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartLayout;
