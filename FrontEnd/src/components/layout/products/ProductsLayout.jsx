import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  Fragment,
} from "react";
import { Link } from "react-router-dom";
import { useQuery } from "../../../hooks/hooks.js";
import { useDispatch, useSelector } from "react-redux";
import { getUserProducts } from "../../../store/admin/admin-actions.js";
import { adminActions } from "../../../store/admin/admin-slice";

import ProductCard from "../../UI/card/productCard/ProductCard";
import LoadingCard from "../../UI/card/loadingCard/LoadingCard";
import AddModal from "../../modals/productModal/AddModal";
import EditModal from "../../modals/productModal/EditModal";
import DeleteModal from "../../modals/productModal/DeleteModal";
import AddProduct from "./form/AddProduct";
import EditProduct from "./form/EditProduct";
import DeleteProduct from "./form/DeleteProduct.jsx";

import { BiPlusCircle } from "react-icons/bi";
import classes from "./ProductsLayout.module.scss";

const ProductsLayout = (props) => {
  const scrollRef = useRef();
  const bottomRef = useRef();

  // holds the scroll of the window
  const [scroll, setScroll] = useState(0);
  // gets the position from the top of the scroll for the div on load
  const [scrollDiv, setScrollDiv] = useState(0);
  // gets position of bottom div to know when to take off class
  const [scrollDivBottom, setScrollDivBottom] = useState(0);

  const query = useQuery();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.admin.products);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const isOpen = useSelector((state) => state.admin.modal);
  const isME = useSelector((state) => state.admin.modalE);
  const isMD = useSelector((state) => state.admin.modalD);
  const jwt = useSelector((state) => state.auth.jwtToken);

  //   this will be replaced by calling a request to load in all men t-shirt products and then it will change based on clicks
  const cat = query.get("cat");
  useEffect(() => {
    dispatch(adminActions.setLoading(true));
    dispatch(getUserProducts(cat, jwt));
  }, [dispatch, jwt, cat]);

  // effect is needed to use scroll on full component render
  // then on component unmount we remove event listener
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

  // console.log(scrollDivBottom - scrollDiv + 200);
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
    </Fragment>
  );

  if (!isLoading) {
    content = products.map((product) => (
      <div className={classes.spacing} key={product._id}>
        <ProductCard
          id={product._id}
          img={product.imageUrl}
          title={product.title}
          color={product.color}
          price={product.price}
          disabled={false}
        />
      </div>
    ));
  }

  const createProdHandler = () => {
    dispatch(adminActions.setModal(true));
  };

  return (
    <Fragment>
      {isOpen && (
        <AddModal>
          <AddProduct />
        </AddModal>
      )}
      {isME && (
        <EditModal>
          <EditProduct />
        </EditModal>
      )}
      {isMD && (
        <DeleteModal>
          <DeleteProduct />
        </DeleteModal>
      )}
      <div className={classes.container}>
        <div className={classes.createContainer}>
          {/* on click open a modal */}
          <BiPlusCircle
            size="40"
            className={classes.icon}
            onClick={createProdHandler}
          />
        </div>
        <div className={classes.contentContainer} ref={scrollRef}>
          {replaceNav}
          {/* make this nav fixed when the scroll reaches the top of content container */}
          <nav style={style}>
            <div>
              <h5>Men's</h5>
              <Link to="/myProducts?cat=shirt">Shirts</Link>
              <Link to="/myProducts?cat=shorts">Shorts</Link>
              <Link to="/myProducts?cat=pants">Pants</Link>
              <Link to="/myProducts?cat=hats">Hats</Link>
            </div>
            <div>
              <h5>Women's</h5>
              <Link to="/myProducts?cat=tops">Tops</Link>
              <Link to="/myProducts?cat=dresses">Dresses</Link>
              <Link to="/myProducts?cat=skirts">Skirts</Link>
              <Link to="/myProducts?cat=leggings">Leggings</Link>
            </div>
          </nav>

          <div className={classes.productContainer}>
            {/* this is where the products will show themselves via map function with product card component and query params for the selected category*/}
            {content}
          </div>
        </div>
        <div ref={bottomRef}></div>
      </div>
    </Fragment>
  );
};

export default ProductsLayout;
