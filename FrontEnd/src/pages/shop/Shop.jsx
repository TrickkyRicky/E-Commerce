// shop for the e-commerce store that will filter and categories products
import React from "react";
import ShopLayout from "../../components/layout/shop/ShopLayout";
import classes from "./Shop.module.scss";
import IMG from "../../assets/clothing-banner2.jpg";

const Shop = () => {
  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <h4>Shop</h4>
        <img src={IMG} alt="Shop Banner" />
      </div>
      <ShopLayout />
    </div>
  );
};

export default Shop;
