import React, { Fragment, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { shopActions } from "../../../store/shop/shop-slice";
import { authActions } from "../../../store/auth/auth-slice";
import AnnounceBar from "../header/AnnounceBar.jsx";
import classes from "./SideBar.module.scss";

const SideBar = (props) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isShow = useSelector((state) => state.shop.hbm);
  let expand = {};
  if (isShow) {
    expand = {
      menu: { transform: "translateX(0)" },
      overlay: { opacity: "1", visibility: "visible" },
    };

    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  const filterSales = () => {
    dispatch(shopActions.setHBM(false));
    dispatch(shopActions.setSales(true));
  };

  const closeHBMHandler = () => {
    dispatch(shopActions.setHBM(false));
  };

  let log = (
    <Link
      to="/auth"
      onClick={() => dispatch(shopActions.setHBM(false))}
      className={classes.link}
    >
      Login
    </Link>
  );
  const logoutHandler = useCallback(() => {
    dispatch(shopActions.setHBM(false));
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(
      authActions.unSetAuth({ jwtToken: null, userId: null, isAuth: false })
    );
  }, [dispatch]);

  if (isAuth) {
    log = (
      <Link to="/" onClick={logoutHandler} className={classes.link}>
        Logout
      </Link>
    );
  }

  return (
    <Fragment>
      <nav className={classes.container} style={expand.menu}>
        {/* Announcement bar here */}
        <AnnounceBar mobile={true} />
        <div className={classes.links}>
          {/* links go here shop,men,women,sale,myproducts,login/logout*/}
          <a href="/shop">Shop</a>
          <a href="/shop/?cat=shirt">Men</a>
          <a href="/shop/?cat=tops">Women</a>
          <Link to="/shop" onClick={filterSales}>
            Sales
          </Link>
          <a href="/myProducts?cat=shirt">My Products</a>
          {log}
        </div>
      </nav>
      <div
        className={classes.overlay}
        style={expand.overlay}
        onClick={closeHBMHandler}
      ></div>
    </Fragment>
  );
};

export default SideBar;
