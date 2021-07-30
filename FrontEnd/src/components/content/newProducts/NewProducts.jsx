// This goes under the hero slider for the new products that get added to the shop
// can only hold an array of 3-5 products based on screen size responsiveness
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../../UI/card/productCard/ProductCard";
import LoadingCard from "../../UI/card/loadingCard/LoadingCard";

import { getProducts } from "../../../store/shop/shop-actions";
import classes from "./NewProducts.module.scss";

const NewProducts = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shop.recentItems);
  const isLoading = useSelector((state) => state.shop.isLoading);

  let content = (
    <Fragment>
      <LoadingCard /> <LoadingCard /> <LoadingCard /> <LoadingCard />
    </Fragment>
  );
  if (!isLoading) {
    content = products.map((product) => (
      <ProductCard
        key={product._id}
        id={product._id}
        title={product.title}
        img={product.imageUrl}
        price={product.price}
        color={product.color}
      />
    ));
  }

  return (
    <section className={classes.container}>
      <div className={classes.heading}>Recently Added</div>
      <div className={classes.content}>{content}</div>
    </section>
  );
};

export default NewProducts;
