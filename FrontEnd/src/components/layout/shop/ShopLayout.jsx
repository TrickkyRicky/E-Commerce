import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  Fragment,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../UI/card/productCard/ProductCard";

import { getProducts } from "../../../store/shop/shop-actions";
import classes from "./ShopLayout.module.scss";
import LoadingCard from "../../UI/card/loadingCard/LoadingCard";

const ShopLayout = (props) => {
  const scrollRef = useRef();
  const bottomRef = useRef();
  // holds the scroll of the window
  const [scroll, setScroll] = useState(0);
  // gets the position from the top of the scroll for the div on load
  const [scrollDiv, setScrollDiv] = useState(0);
  // gets position of bottom div to know when to take off class
  const [scrollDivBottom, setScrollDivBottom] = useState(0);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.shop.allProducts);
  const isLoading = useSelector((state) => state.shop.isLoading);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // effect is needed to use scroll on full component render
  // then on component unmount we remove event listerner
  useEffect(() => {
    window.addEventListener("scroll", function (e) {
      setScroll(e.target.scrollingElement.scrollTop);
    });

    return () => {
      window.removeEventListener("scroll", function (e) {
        setScroll(e.target.scrollingElement.scrollTop);
      });
    };
  }, [setScroll]);

  // try using use callback to stop error
  const getScrollHandler = useCallback(() => {
    setScrollDiv(scrollRef.current.getBoundingClientRect().y);
    setScrollDivBottom(bottomRef.current.getBoundingClientRect().y);
  }, []);

  // i dont set a dependcy here because i only want this function to run one time everytime the component renders
  useEffect(() => {
    const timer = setTimeout(() => {
      // need this to reset scroll positioning so that the if condition can execute clearly
      window.scrollTo(0, 0);
      getScrollHandler();
    }, 0);
    return () => clearTimeout(timer);
  }, [getScrollHandler]);

  let style = {};
  let replaceNav = null;

  console.log(scrollDivBottom - scrollDiv + 200);
  if (scroll > scrollDivBottom - scrollDiv + 225) {
    style = { alignSelf: "flex-end" };
    replaceNav = null;
  } else if (scroll > scrollDiv - 10) {
    style = { position: "fixed", top: "10px" };
    replaceNav = <div></div>;
  }

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
  if (!isLoading) {
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

  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}></div>
      <div className={classes.contentContainer} ref={scrollRef}>
        {replaceNav}
        {/* make this nav fixed when the scroll reaches the top of content container */}
        <nav style={style}>
          <div>
            <h5>Men's</h5>
            <a href="/">Shirts</a>
            <a href="/">Shorts</a>
            <a href="/">Pants</a>
            <a href="/">Hats</a>
          </div>
          <div>
            <h5>Women's</h5>
            <a href="/">Tops</a>
            <a href="/">Dresses</a>
            <a href="/">Skirts</a>
            <a href="/">Leggings</a>
          </div>
        </nav>

        <div className={classes.productContainer}>
          {/* this is where the products will show themselves via map function with product card component */}
          {content}
        </div>
      </div>
      <div ref={bottomRef}></div>
    </div>
  );
};

export default ShopLayout;
