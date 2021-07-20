// This goes under the hero slider for the new products that get added to the shop
// can only hold an array of 3-5 products based on screen size responsiveness
import React from "react";
import classes from "./NewProducts.module.scss";
import ProductCard from "../../UI/card/productCard/ProductCard";

const NewProducts = (props) => {
  return (
    <section className={classes.container}>
      <div className={classes.heading}>Recently Added</div>
      <div className={classes.content}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
};

export default NewProducts;
