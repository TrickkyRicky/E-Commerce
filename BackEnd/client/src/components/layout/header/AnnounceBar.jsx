// top of the screen Annouce Bar to signal users of possible sales. Should not show if not on the home page
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { shopActions } from "../../../store/shop/shop-slice";
import classes from "./AnnounceBar.module.scss";

const AnnounceBar = (props) => {
  const dispatch = useDispatch();
  const filterSales = () => {
    dispatch(shopActions.setSales(true));
  };
  let content = (
    <div className={classes.container1}>
      <p>
        First Time Buyer Sale, Get 30% Off. | View Our Other Sales{" "}
        <Link to="/shop" onClick={filterSales}>
          Here
        </Link>
      </p>
    </div>
  );
  if (props.mobile) {
    // change for sidebar activity
    content = (
      <div className={classes.container2}>
        <p>
          First Time Buyer Sale, Get 30% Off.
        </p>
      </div>
    );
  }
  return content;
};

export default AnnounceBar;
