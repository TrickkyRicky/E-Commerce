// navbar that will turn into a onHover jumbo dropdown for men link and woman link and conditional show my products for a a authenticated user and cart items
import React, { Fragment, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import classes from "./Header.module.scss";
import AnnouceBar from "./AnnounceBar.jsx";
import Logo from "../../../assets/theLogo.png";
import IMG from "../../../assets/ef3-placeholder-image.jpeg";
import ProductCard from "../../UI/card/productCard/ProductCard.jsx";
import LoadingCard from "../../UI/card/loadingCard/LoadingCard.jsx";
import { authActions } from "../../../store/auth/auth-slice";
import { getProducts } from "../../../store/shop/shop-actions";

const Header = (props) => {
  const [show, setShow] = useState(false);
  const [picker, setPicker] = useState("men");
  const [content, setContent] = useState(null);
  const [selected, setSelected] = useState(null);

  const isAuth = useSelector((state) => state.auth.isAuth);
  const tShirts = useSelector((state) => state.shop.tShirts);
  const shorts = useSelector((state) => state.shop.shorts);
  const pants = useSelector((state) => state.shop.pants);
  const hats = useSelector((state) => state.shop.hats);
  const tops = useSelector((state) => state.shop.tops);
  const dresses = useSelector((state) => state.shop.dresses);
  const skirts = useSelector((state) => state.shop.skirts);
  const leggings = useSelector((state) => state.shop.leggings);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    dispatch(getProducts(location.pathname));
  }, [location, dispatch]);

  const men = [
    { val: "Shirts", href: "/shop?cat=shirt" },
    { val: "Shorts", href: "/shop?cat=shorts" },
    { val: "Pants", href: "/shop?cat=pants" },
    { val: "Hats", href: "/shop?cat=hats" },
  ];
  const woman = [
    { val: "Tops", href: "/shop?cat=tops" },
    { val: "Dresses", href: "/shop?cat=dresses" },
    { val: "Skirts", href: "/shop?cat=skirts" },
    { val: "Leggings", href: "/shop?cat=leggings" },
  ];

  let choice;
  if (picker === "woman") {
    choice = woman;
  } else {
    choice = men;
  }

  let expand = {};
  if (show) {
    expand = {
      menu: { transform: "scaleY(1)" },
      overlay: { opacity: "1", visibility: "visible" },
      underline: { transform: "scaleX(1)" },
      line: { transform: "scaleX(0)" },
      prod: {
        opacity: "1",
        transform: "translateY(0px)",
        transitionDelay: ".4s",
        transitionDuration: ".4s",
      },
    };
  }

  let isHide;

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(
      authActions.unSetAuth({ jwtToken: null, userId: null, isAuth: false })
    );
  };

  useEffect(() => {
    setContent(
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
  }, []);

  const mouseHoverEvent = (cat) => {
    if (cat === "Shirts") {
      setSelected("red");
      setContent(
        tShirts.map((product) => (
          <div className={classes.spacing} key={product._id}>
            <ProductCard
              id={product._id}
              img={product.imageUrl}
              title={product.title}
              color={product.color}
              price={product.price}
              disabled={true}
            />
          </div>
        ))
      );
    }

    if (cat === "Shorts") {
      setSelected("green");
      setContent(
        shorts.map((product) => (
          <div className={classes.spacing} key={product._id}>
            <ProductCard
              id={product._id}
              img={product.imageUrl}
              title={product.title}
              color={product.color}
              price={product.price}
              disabled={true}
            />
          </div>
        ))
      );
    }
    if (cat === "Pants") {
      setContent(
        pants.map((product) => (
          <div className={classes.spacing} key={product._id}>
            <ProductCard
              id={product._id}
              img={product.imageUrl}
              title={product.title}
              color={product.color}
              price={product.price}
              disabled={true}
            />
          </div>
        ))
      );
    }
    if (cat === "Hats") {
      setContent(
        hats.map((product) => (
          <div className={classes.spacing} key={product._id}>
            <ProductCard
              id={product._id}
              img={product.imageUrl}
              title={product.title}
              color={product.color}
              price={product.price}
              disabled={true}
            />
          </div>
        ))
      );
    }
    if (cat === "Tops") {
      setContent(
        tops.map((product) => (
          <div className={classes.spacing} key={product._id}>
            <ProductCard
              id={product._id}
              img={product.imageUrl}
              title={product.title}
              color={product.color}
              price={product.price}
              disabled={true}
            />
          </div>
        ))
      );
    }
    if (cat === "Dresses") {
      setContent(
        dresses.map((product) => (
          <div className={classes.spacing} key={product._id}>
            <ProductCard
              id={product._id}
              img={product.imageUrl}
              title={product.title}
              color={product.color}
              price={product.price}
              disabled={true}
            />
          </div>
        ))
      );
    }
    if (cat === "Skirts") {
      setContent(
        skirts.map((product) => (
          <div className={classes.spacing} key={product._id}>
            <ProductCard
              id={product._id}
              img={product.imageUrl}
              title={product.title}
              color={product.color}
              price={product.price}
              disabled={true}
            />
          </div>
        ))
      );
    }
    if (cat === "Leggings") {
      setContent(
        leggings.map((product) => (
          <div className={classes.spacing} key={product._id}>
            <ProductCard
              id={product._id}
              img={product.imageUrl}
              title={product.title}
              color={product.color}
              price={product.price}
              disabled={true}
            />
          </div>
        ))
      );
    }
  };

  // this if statement checks if the header has auth in it to disable header
  if (!props.isAuth) {
    isHide = (
      <Fragment>
        <AnnouceBar />
        {/* content container */}
        <nav className={classes.container}>
          {/* content */}
          <div>
            <a
              onMouseOver={() => {
                setPicker("men");
                setShow(true);
                mouseHoverEvent("Shirts");
              }}
              onMouseOut={() => setShow(false)}
              href="/shop/?cat=shirt"
            >
              Men
              {picker === "men" ? (
                <u style={expand.underline}></u>
              ) : (
                <u style={expand.line}></u>
              )}
            </a>
            <a
              onMouseOver={() => {
                setPicker("woman");
                setShow(true);
                mouseHoverEvent("Tops");
              }}
              onMouseOut={() => setShow(false)}
              href="/shop/?cat=tops"
            >
              Woman
              {picker === "woman" ? (
                <u style={expand.underline}></u>
              ) : (
                <u style={expand.line}></u>
              )}
            </a>
            <a href="/shop" className={classes.link}>
              Shop
            </a>
          </div>
          <div>
            <a href="/">
              <img src={Logo} alt="Logo" />
            </a>
          </div>
          <div>
            {isAuth ? (
              <Link to="/" onClick={logoutHandler} className={classes.link}>
                Logout
              </Link>
            ) : (
              <Link to="/auth" className={classes.link}>
                Login
              </Link>
            )}
            {/* Will show my products when Authenticated */}
            <a href="/myProducts?cat=shirt" className={classes.link}>
              My Products
            </a>
            <a href="/" className={classes.link}>
              Cart
            </a>
          </div>
        </nav>
        <div className={classes.relative}>
          <div
            onMouseOut={() => setShow(false)}
            onMouseOver={() => setShow(true)}
            className={classes.contain}
            style={expand.menu}
          >
            {/* product categories : based on the category hovered then we will display proper content*/}
            <div style={expand.prod} className={classes.categories}>
              <h4>Categories</h4>
              {choice.map((catName, index) => (
                <Link
                  key={index}
                  to={catName.href}
                  onMouseOver={() => mouseHoverEvent(catName.val)}
                  className={classes.catFont}
                >
                  {catName.val}
                </Link>
              ))}
            </div>
            <div style={expand.prod} className={classes.content}>
              {content}
            </div>
          </div>
          <div className={classes.overlay} style={expand.overlay}></div>
        </div>
      </Fragment>
    );
  } else {
    isHide = null;
  }
  return isHide;
};

export default Header;
