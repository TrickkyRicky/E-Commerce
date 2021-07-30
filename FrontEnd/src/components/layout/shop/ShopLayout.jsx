import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useQuery } from "../../../hooks/hooks.js";
import ProductCard from "../../UI/card/productCard/ProductCard";

import { getProducts, getCatProducts } from "../../../store/shop/shop-actions";
import classes from "./ShopLayout.module.scss";
import LoadingCard from "../../UI/card/loadingCard/LoadingCard";

const ShopLayout = (props) => {
  const query = useQuery();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.shop.allProducts);
  const catProducts = useSelector((state) => state.shop.catProducts);
  const isLoading = useSelector((state) => state.shop.isLoading);

  const cat = query.get("cat");

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);

  useEffect(() => {
    if (cat) {
      dispatch(getCatProducts(cat));
    } else {
      dispatch(getProducts());
    }
  }, [dispatch, cat]);

  let content = (
    <Fragment>
      <div className={classes.spacing}>
        <LoadingCard />
      </div>
      <div className={classes.spacing}>
        <LoadingCard />
      </div>
      <div className={classes.spacing}>
        <LoadingCard />
      </div>
      <div className={classes.spacing}>
        <LoadingCard />
      </div>
    </Fragment>
  );
  if (!isLoading && cat === null) {
    content = products.map((product) => (
      <div className={classes.spacing} key={product._id}>
        <ProductCard
          img={product.imageUrl}
          title={product.title}
          color={product.color}
          price={product.price}
        />
      </div>
    ));
  }

  if (!isLoading && cat !== null) {
    content = catProducts.map((product) => (
      <div className={classes.spacing} key={product._id}>
        <ProductCard
          id={product._id}
          img={product.imageUrl}
          title={product.title}
          color={product.color}
          price={product.price}
        />
      </div>
    ));
  }

  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}></div>
      <div className={classes.contentContainer}>
        {/* make this nav fixed when the scroll reaches the top of content container */}
        <nav>
          <div>
            <h5>Men's</h5>
            <Link to="/shop?cat=shirt">Shirts</Link>
            <Link to="/shop?cat=shorts">Shorts</Link>
            <Link to="/shop?cat=pants">Pants</Link>
            <Link to="/shop?cat=hats">Hats</Link>
          </div>
          <div>
            <h5>Women's</h5>
            <Link to="/shop?cat=tops">Tops</Link>
            <Link to="/shop?cat=dresses">Dresses</Link>
            <Link to="/shop?cat=skirts">Skirts</Link>
            <Link to="/shop?cat=leggings">Leggings</Link>
          </div>
        </nav>

        <div className={classes.productContainer}>
          {/* this is where the products will show themselves via map function with product card component */}
          {content}
        </div>
      </div>
    </div>
  );
};

export default ShopLayout;
