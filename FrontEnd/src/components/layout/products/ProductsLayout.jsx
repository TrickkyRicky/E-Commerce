import React, { useEffect, useState, Fragment } from "react";
import { NavLink, useHistory } from "react-router-dom";
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
import ErrorModal from "../../modals/errorModal/ErrorModal.jsx";

const ProductsLayout = (props) => {
  const query = useQuery();
  const history = useHistory();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.admin.products);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const isOpen = useSelector((state) => state.admin.modal);
  const isME = useSelector((state) => state.admin.modalE);
  const isMD = useSelector((state) => state.admin.modalD);
  const isError = useSelector((state) => state.admin.modalError);

  const jwt = useSelector((state) => state.auth.jwtToken);

  const [a1, setA1] = useState(null);
  const [a2, setA2] = useState(null);
  const [a3, setA3] = useState(null);
  const [a4, setA4] = useState(null);
  const [a5, setA5] = useState(null);
  const [a6, setA6] = useState(null);
  const [a7, setA7] = useState(null);
  const [a8, setA8] = useState(null);

  //   this will be replaced by calling a request to load in all men t-shirt products and then it will change based on clicks
  const cat = query.get("cat");
  useEffect(() => {
    dispatch(adminActions.setLoading(true));
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
    if (categories.includes(cat)) {
      dispatch(getUserProducts(cat, jwt));
    } else {
      history.replace("/*");
    }
  }, [dispatch, jwt, cat, history]);

  let content = (
    <Fragment>
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
          image={product.image}
          title={product.title}
          color={product.color}
          price={product.price}
          sale={product.sale}
          salePrice={product.salePrice}
          disabled={false}
        />
      </div>
    ));
  }

  if (products.length === 0 && isLoading === false) {
    content = (
      <div className={classes.emptyMessage}>
        <h3>
          You currently have no {cat} products, please create a product by
          clicking the plus button.
        </h3>
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
    if (e.target.value === "date") {
      dispatch(adminActions.filterCatProd("date"));
    }
    if (e.target.value === "sale") {
      dispatch(adminActions.filterCatProd("sale"));
    }
    if (e.target.value === "low") {
      dispatch(adminActions.filterCatProd("low"));
    }
    if (e.target.value === "high") {
      dispatch(adminActions.filterCatProd("high"));
    }
  };
  const createProdHandler = () => {
    dispatch(adminActions.setModal(true));
  };

  return (
    <Fragment>
      {isError && <ErrorModal />}
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
              <NavLink activeClassName={a1} to="/myProducts?cat=shirt">
                Shirts<span>|</span>
              </NavLink>
              <NavLink activeClassName={a2} to="/myProducts?cat=shorts">
                Shorts<span>|</span>
              </NavLink>
              <NavLink activeClassName={a3} to="/myProducts?cat=pants">
                Pants<span>|</span>
              </NavLink>
              <NavLink activeClassName={a4} to="/myProducts?cat=hats">
                Hats
              </NavLink>
            </div>
            <div>
              <h5>Women's</h5>
              <NavLink activeClassName={a5} to="/myProducts?cat=tops">
                Tops<span>|</span>
              </NavLink>
              <NavLink activeClassName={a6} to="/myProducts?cat=dresses">
                Dresses<span>|</span>
              </NavLink>
              <NavLink activeClassName={a7} to="/myProducts?cat=skirts">
                Skirts<span>|</span>
              </NavLink>
              <NavLink activeClassName={a8} to="/myProducts?cat=leggings">
                Leggings
              </NavLink>
            </div>
          </nav>

          <div className={classes.productContainer}>
            {/* this is where the products will show themselves via map function with product card component and query params for the selected category*/}
            {content}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsLayout;
