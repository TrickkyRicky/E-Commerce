import React from "react";
import classes from "./ProductCard.module.scss";
import IMG from "../../../../assets/ef3-placeholder-image.jpeg";

const ProductCard = (props) => {
  return (
    <div className={classes.container}>
      {/* href will take product to link with product id */}
      <a href="/">
        {/* the img take will take in the props for the image from the array */}
        <img className={classes.image} src={IMG} />
        {/* this div will take in content from the product information in db */}
        <div className={classes.productInfo}>
          <h5>Not Avaible N/A</h5>
          <p>price</p>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
