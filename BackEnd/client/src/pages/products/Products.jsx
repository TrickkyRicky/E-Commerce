// View user created products if authenticated and created by the user
import React from "react";
import ProductsLayout from "../../components/layout/products/ProductsLayout";
import classes from "./Products.module.scss";
import IMG from "../../assets/clothing-banner4.jpeg";

const Products = () => {
  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <h4>My Products</h4>
        <img src={IMG} alt="Shop Banner" />
      </div>
      <ProductsLayout />
    </div>
  );
};

export default Products;
