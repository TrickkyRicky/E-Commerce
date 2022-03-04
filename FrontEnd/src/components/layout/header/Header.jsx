// navbar that will turn into a onHover jumbo dropdown for men link and woman link and conditional show my products for a a authenticated user and cart items
import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import classes from "./Header.module.scss";
import AnnouceBar from "./AnnounceBar.jsx";
import ProductCard from "../../UI/card/productCard/ProductCard.jsx";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { authActions } from "../../../store/auth/auth-slice";
import { getProducts } from "../../../store/shop/shop-actions";

const Header = (props) => {
  const [show, setShow] = useState(false);
  const [picker, setPicker] = useState("men");
  const [content, setContent] = useState(null);
  const [mDisplay, setMDisplay] = useState({ display: "none" });
  const [wDisplay, setWDisplay] = useState({ display: "none" });
  const [active1, setActive1] = useState(null);
  const [active2, setActive2] = useState(null);
  const [active3, setActive3] = useState(null);
  const [active4, setActive4] = useState(null);

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

  const logoutHandler = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(
      authActions.unSetAuth({ jwtToken: null, userId: null, isAuth: false })
    );
  }, [dispatch]);

  let log = (
    <Link to="/auth" className={classes.link}>
      Login
    </Link>
  );
  if (isAuth) {
    log = (
      <Link to="/" onClick={logoutHandler} className={classes.link}>
        Logout
      </Link>
    );
  }

  useEffect(() => {
    dispatch(getProducts(location.pathname));
  }, [location, dispatch]);

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

  const clearActive = () => {
    setActive1(null);
    setActive2(null);
    setActive3(null);
    setActive4(null);
  };

  const mouseHoverEvent = (cat) => {
    clearActive();
    if (cat === "Shirts") {
      setActive1({ color: "#b5aa8f" });
      setContent(
        tShirts.map((product) => (
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
              disabled={true}
            />
          </div>
        ))
      );
    }

    if (cat === "Shorts") {
      setActive2({ color: "#b5aa8f" });
      setContent(
        shorts.map((product) => (
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
              disabled={true}
            />
          </div>
        ))
      );
    }
    if (cat === "Pants") {
      setActive3({ color: "#b5aa8f" });
      setContent(
        pants.map((product) => (
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
              disabled={true}
            />
          </div>
        ))
      );
    }
    if (cat === "Hats") {
      setActive4({ color: "#b5aa8f" });
      setContent(
        hats.map((product) => (
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
              disabled={true}
            />
          </div>
        ))
      );
    }
    if (cat === "Tops") {
      setActive1({ color: "#b5aa8f" });
      setContent(
        tops.map((product) => (
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
              disabled={true}
            />
          </div>
        ))
      );
    }
    if (cat === "Dresses") {
      setActive2({ color: "#b5aa8f" });
      setContent(
        dresses.map((product) => (
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
              disabled={true}
            />
          </div>
        ))
      );
    }
    if (cat === "Skirts") {
      setActive3({ color: "#b5aa8f" });
      setContent(
        skirts.map((product) => (
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
              disabled={true}
            />
          </div>
        ))
      );
    }
    if (cat === "Leggings") {
      setActive4({ color: "#b5aa8f" });
      setContent(
        leggings.map((product) => (
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
        <div className={classes.logoContainer}>
          <a href="/">
            <h1 className={classes.logo}>
              <span>s</span>ense
            </h1>
            {/* <img src={Logo} alt="Logo" /> */}
          </a>
        </div>
        <nav className={classes.container}>
          {/* content */}
          <div>
            <a
              onMouseOver={() => {
                setWDisplay({ display: "none" });
                setMDisplay({ display: "flex" });
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
                setMDisplay({ display: "none" });
                setWDisplay({ display: "flex" });
                setPicker("woman");
                setShow(true);
                mouseHoverEvent("Tops");
              }}
              onMouseOut={() => setShow(false)}
              href="/shop/?cat=tops"
            >
              Women
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
            {log}
            {/* Will show my products when Authenticated */}
            {isAuth === true ? (
              <a href="/myProducts?cat=shirt" className={classes.link}>
                My Products
              </a>
            ) : null}
            <a href="/cart" className={`${classes.link} ${classes.bubble}`}>
              <AiOutlineShoppingCart size="22" />
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
              <div style={mDisplay} className={classes.cat}>
                <a
                  style={active1}
                  href="/shop?cat=shirt"
                  onMouseOver={() => mouseHoverEvent("Shirts")}
                  className={classes.catFont}
                >
                  Shirts
                </a>
                <a
                  style={active2}
                  href="/shop?cat=shorts"
                  onMouseOver={() => mouseHoverEvent("Shorts")}
                  className={classes.catFont}
                >
                  Shorts
                </a>
                <a
                  style={active3}
                  href="/shop?cat=pants"
                  onMouseOver={() => mouseHoverEvent("Pants")}
                  className={classes.catFont}
                >
                  Pants
                </a>
                <a
                  style={active4}
                  href="/shop?cat=hats"
                  onMouseOver={() => mouseHoverEvent("Hats")}
                  className={classes.catFont}
                >
                  Hats
                </a>
              </div>
              <div style={wDisplay} className={classes.cat}>
                <a
                  style={active1}
                  href="/shop?cat=tops"
                  onMouseOver={() => mouseHoverEvent("Tops")}
                  className={classes.catFont}
                >
                  Tops
                </a>
                <a
                  style={active2}
                  href="/shop?cat=dresses"
                  onMouseOver={() => mouseHoverEvent("Dresses")}
                  className={classes.catFont}
                >
                  Dresses
                </a>
                <a
                  style={active3}
                  href="/shop?cat=skirts"
                  onMouseOver={() => mouseHoverEvent("Skirts")}
                  className={classes.catFont}
                >
                  Skirts
                </a>
                <a
                  style={active4}
                  href="/shop?cat=leggings"
                  onMouseOver={() => mouseHoverEvent("Leggings")}
                  className={classes.catFont}
                >
                  Leggings
                </a>
              </div>
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
