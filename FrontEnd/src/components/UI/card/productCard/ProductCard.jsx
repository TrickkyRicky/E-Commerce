import React from "react";
import { useLocation } from "react-router-dom";
import classes from "./ProductCard.module.scss";
import IMG from "../../../../assets/ef3-placeholder-image.jpeg";

const ProductCard = (props) => {
  // if location includes myProducts we change the hover menu
  const location = useLocation();
  // use the params to get the id of product so we can view the product details
  return (
    <div className={classes.container}>
      {/* href will take product to link with product id */}
      <a href="/">
        {/* the img take will take in the props for the image from the array */}
        <img
          className={classes.image}
          src={"http://localhost:8080/" + props.img}
          alt={props.title}
        />
        {/* this div will take in content from the product information in db */}
        <div className={classes.productInfo}>
          <h5>{props.title}</h5>
          <p>in {props.color}</p>
          <p>${props.price}</p>
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
