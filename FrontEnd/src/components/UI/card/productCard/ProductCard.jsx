import React, { useState, Fragment } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEditProduct } from "../../../../store/admin/admin-actions.js";
import { adminActions } from "../../../../store/admin/admin-slice.js";
import classes from "./ProductCard.module.scss";
import IMG from "../../../../assets/ef3-placeholder-image.jpeg";

const ProductCard = (props) => {
  // if location includes myProducts we change the hover menu
  const location = useLocation();
  const dispatch = useDispatch();

  const jwt = useSelector((state) => state.auth.jwtToken);
  const id = props.id;

  const [btn, setBtn] = useState({});

  const hoverHandler = () => {
    setBtn({ opacity: "1" });
  };

  const editHandler = () => {
    dispatch(getEditProduct(jwt, id));
    dispatch(adminActions.setModalE(true));
  };
  const deleteHandler = () => {
    dispatch(getEditProduct(jwt, id));
    dispatch(adminActions.setModalD(true));
  };

  let hover = null;
  let href = `http://localhost:8080/productDetails/${props.id}`;
  let buttons = null;

  if (location.pathname.includes("myProducts") && props.disabled === false) {
    hover = classes.hover;
    href = null;
 
    buttons = (
      <Fragment>
        <button style={btn} onClick={editHandler}>
          Edit
        </button>
        <button style={btn} onClick={deleteHandler}>
          Delete
        </button>
      </Fragment>
    );
  }

  let saleTag = null;
  if (props.price) {
    saleTag = <p className={classes.price}>${props.price.toFixed(2)}</p>;
  }
  if (props.sale) {
    saleTag = (
      <div className={classes.sale}>
        <p className={classes.price}>${props.salePrice.toFixed(2)}</p>
        <p className={classes.price}>${props.price.toFixed(2)} </p>
        <span>{props.sale}% off</span>
      </div>
    );
  }

  // use the params to get the id of product so we can view the product details
  return (
    <div className={classes.container}>
      {/* href will take product to link with product id */}
      {/* dont nest a tags fix later to clear warning */}
      <a href={href}>
        <div
          className={hover}
          onMouseOver={hoverHandler}
          onMouseLeave={() => {
            setBtn({});
          }}
        >
          <div className={classes.btnContainer}>{buttons}</div>
          {/* the img take will take in the props for the image from the array */}
          <img
            className={classes.image}
            src={"http://localhost:8080/" + props.img}
            alt={props.title}
          />
        </div>
      </a>
      {/* this div will take in content from the product information in db */}
      <a href={`http://localhost:8080/productDetails/${props.id}`}>
        <div className={classes.productInfo}>
          <h5>{props.title}</h5>
          <p>in {props.color}</p>
          {saleTag}
        </div>
      </a>
    </div>
  );
};

export default ProductCard;

// "title":"Dummy Shirt",
// "price":"21",
// "color":"Red",
// "stock":{"xsmall":"4","small":"3","medium":"2","large":"3","xlarge":"2"},
// "category":"shirt",
// "gender":"M",
// "description":"A cool red dummy shirt for clifford",
// "imageUrl":"https://www.lrt-sports.com/blog/app/uploads/2019/10/Screen-Shot-2019-10-13-at-1.25.02-PM-768x619.png"
