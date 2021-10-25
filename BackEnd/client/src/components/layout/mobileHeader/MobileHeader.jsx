import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import classes from "./MobileHeader.module.scss";
import { shopActions } from "../../../store/shop/shop-slice";
import { AiOutlineShoppingCart } from "react-icons/ai";
import SideBar from "./SideBar";

const MobileHeader = (props) => {
  const isShow = useSelector((state) => state.shop.hbm);

  const history = useHistory();
  const dispatch = useDispatch();

  const openSideBarHandler = () => {
    if (isShow) {
      dispatch(shopActions.setHBM(false));
    } else {
      dispatch(shopActions.setHBM(true));
    }
  };
  const cartPageHandler = () => {
    history.push("/cart");
  };

  let styles = { l1: null, l2: null, l3: null };
  // if (isShow) {
  //   styles.l1 = { transform: "rotate(-65deg)" };
  //   styles.l2 = { opacity: "0" };
  //   styles.l3 = { transform: "rotate(65deg)" };
  // }
  let isHide = (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.HBMenu} onClick={openSideBarHandler}>
          <div style={styles.l1}></div>
          <div style={styles.l2}></div>
          <div style={styles.l3}></div>
        </div>

        <div className={classes.logoContainer}>
          <a href="/">
            <h1 className={classes.logo}>
              <span>s</span>ense
            </h1>
          </a>
        </div>
        <div className={classes.cart}>
          <AiOutlineShoppingCart size="25" onClick={cartPageHandler} />
        </div>
      </div>
      <div className={classes.relative}>
        <SideBar />
      </div>
    </Fragment>
  );
  if (props.isAuth) {
    isHide = null;
  }
  return isHide;
};

export default MobileHeader;
