import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useQuery } from "../../../hooks/hooks.js";
import ProductCard from "../../UI/card/productCard/ProductCard";

import { getProducts, getCatProducts } from "../../../store/shop/shop-actions";
import { shopActions } from "../../../store/shop/shop-slice.js";
import classes from "./ShopLayout.module.scss";
import LoadingCard from "../../UI/card/loadingCard/LoadingCard";

const ShopLayout = (props) => {
  const [a1, setA1] = useState(null);
  const [a2, setA2] = useState(null);
  const [a3, setA3] = useState(null);
  const [a4, setA4] = useState(null);
  const [a5, setA5] = useState(null);
  const [a6, setA6] = useState(null);
  const [a7, setA7] = useState(null);
  const [a8, setA8] = useState(null);

  const query = useQuery();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.shop.allProducts);
  const catProducts = useSelector((state) => state.shop.catProducts);
  const checkSale = useSelector((state) => state.shop.viewSales);
  const isLoading = useSelector((state) => state.shop.isLoading);

  const cat = query.get("cat");

  useEffect(() => {
    const categories = [
      "shirt",
      "shorts",
      "pants",
      "hats",
      "tops",
      "dresses",
      "skirts",
      "leggings",
    ];
    if (location.pathname === "/shop" && location.search === "") {
      dispatch(getProducts());
    } else if (categories.includes(cat)) {
      dispatch(getCatProducts(cat));
    } else {
      history.replace("/*");
    }
  }, [dispatch, cat, location, history]);

  let content = (
    <Fragment>
      <div className={classes.spacing}>
        <LoadingCard />
      </div>
    </Fragment>
  );
  if (!isLoading && cat === null) {
    content = products.map((product) => (
      <div className={classes.spacing} key={product._id}>
        <ProductCard
          id={product._id}
          img={product.imageUrl}
          image={product.image}
          title={product.title}
          color={product.color}
          price={product.price}
          sale={product.sale}
          salePrice={product.salePrice}
        />
      </div>
    ));
  }

  if (!isLoading && cat !== null && catProducts) {
    content = catProducts.map((product) => (
      <div className={classes.spacing} key={product._id}>
        <ProductCard
          id={product._id}
          img={product.imageUrl}
          image={product.image}
          title={product.title}
          color={product.color}
          price={product.price}
          sale={product.sale}
          salePrice={product.salePrice}
        />
      </div>
    ));
  }
  if (products.length === 0 && cat === null && isLoading === false) {
    content = (
      <div className={classes.emptyMessage}>
        <h3>Sorry there are currently no products within the store</h3>
      </div>
    );
  }

  if (catProducts.length === 0 && cat !== null && isLoading === false) {
    content = (
      <div className={classes.emptyMessage}>
        <h3>Sorry there are currently no {cat} products within the store</h3>
      </div>
    );
  }

  const clearActive = () => {
    setA1(null);
    setA2(null);
    setA3(null);
    setA4(null);
    setA5(null);
    setA6(null);
    setA7(null);
    setA8(null);
  };

  useEffect(() => {
    clearActive();
    switch (cat) {
      case "shirt":
        setA1(classes.selected);
        break;
      case "shorts":
        setA2(classes.selected);
        break;
      case "pants":
        setA3(classes.selected);
        break;
      case "hats":
        setA4(classes.selected);
        break;
      case "tops":
        setA5(classes.selected);
        break;
      case "dresses":
        setA6(classes.selected);
        break;
      case "skirts":
        setA7(classes.selected);
        break;
      case "leggings":
        setA8(classes.selected);
        break;
      default:
        clearActive();
    }
  }, [cat]);

  const filterChangeHandler = (e) => {
    dispatch(shopActions.setSales(false));
    if (cat === null) {
      if (e.target.value === "date") {
        dispatch(shopActions.filterAllProd("date"));
      }
      if (e.target.value === "sale") {
        dispatch(shopActions.filterAllProd("sale"));
      }
      if (e.target.value === "low") {
        dispatch(shopActions.filterAllProd("low"));
      }
      if (e.target.value === "high") {
        dispatch(shopActions.filterAllProd("high"));
      }
    } else {
      if (e.target.value === "date") {
        dispatch(shopActions.filterCatProd("date"));
      }
      if (e.target.value === "sale") {
        dispatch(shopActions.filterCatProd("sale"));
      }
      if (e.target.value === "low") {
        dispatch(shopActions.filterCatProd("low"));
      }
      if (e.target.value === "high") {
        dispatch(shopActions.filterCatProd("high"));
      }
    }
  };

  if (checkSale) {
    dispatch(shopActions.filterAllProd("sale"));
  }

  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}>
        <select onChange={filterChangeHandler} defaultValue={"date"}>
          <option value="date">Featured</option>
          <option value="sale">Sales</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>
      <div className={classes.contentContainer}>
        {/* make this nav fixed when the scroll reaches the top of content container */}
        <nav>
          <div>
            <h5>Men's</h5>
            <NavLink to="/shop?cat=shirt" activeClassName={a1}>
              Shirts<span>|</span>
            </NavLink>
            <NavLink activeClassName={a2} to="/shop?cat=shorts">
              Shorts<span>|</span>
            </NavLink>
            <NavLink activeClassName={a3} to="/shop?cat=pants">
              Pants<span>|</span>
            </NavLink>
            <NavLink activeClassName={a4} to="/shop?cat=hats">
              Hats
            </NavLink>
          </div>
          <div>
            <h5>Women's</h5>
            <NavLink activeClassName={a5} to="/shop?cat=tops">
              Tops<span>|</span>
            </NavLink>
            <NavLink activeClassName={a6} to="/shop?cat=dresses">
              Dresses<span>|</span>
            </NavLink>
            <NavLink activeClassName={a7} to="/shop?cat=skirts">
              Skirts<span>|</span>
            </NavLink>
            <NavLink activeClassName={a8} to="/shop?cat=leggings">
              Leggings
            </NavLink>
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
