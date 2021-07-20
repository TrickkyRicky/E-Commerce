// navbar that will turn into a onHover jumbo dropdown for men link and woman link and conditional show my products for a a authenticated user and cart items
import React, { Fragment, useState } from "react";
import classes from "./Header.module.scss";
import AnnouceBar from "./AnnounceBar.jsx";
import Logo from "../../../assets/theLogo.png";
import IMG from "../../../assets/ef3-placeholder-image.jpeg";
// import JumboDropDown from "../../UI/jumboDropDown/JumboDropDown";

const Header = (props) => {
  const [show, setShow] = useState(false);
  const [picker, setPicker] = useState("men");

  const men = ["Shirts", "Shorts", "Pants", "Hats"];
  const woman = ["Tops", "Dresses", "Skirts", "Leggings"];
  // read in product info with useEffect later
  const products = [
    {
      image: IMG,
      name: "N/A",
      color: "N/A",
      id: "N/A",
    },
    {
      image: IMG,
      name: "N/A",
      color: "N/A",
      id: "N/A",
    },
    {
      image: IMG,
      name: "N/A",
      color: "N/A",
      id: "N/A",
    },
    {
      image: IMG,
      name: "N/A",
      color: "N/A",
      id: "N/A",
    },
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
  return (
    // wrapper
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
            }}
            onMouseOut={() => setShow(false)}
            href="/shop"
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
            }}
            onMouseOut={() => setShow(false)}
            href="/shop"
          >
            Woman
            {picker === "woman" ? (
              <u style={expand.underline}></u>
            ) : (
              <u style={expand.line}></u>
            )}
          </a>
        </div>
        <div>
          <a href="/">
            <img src={Logo} alt="Logo" />
          </a>
        </div>
        <div>
          <a href="/" className={classes.link}>
            Login / Logout
          </a>
          {/* Will show my products when Authenticated */}
          {/* <a href="/">My products Link</a> */}
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
            {choice.map((catName) => (
              <a href="/" className={classes.catFont}>
                {catName}
              </a>
            ))}
          </div>
          <div style={expand.prod} className={classes.content}>
            {products.map((product) => {
              return (
                <figure>
                  {/* id will go in href for link to shop */}
                  <a href="/">
                    <img src={product.image} alt={product.name} />
                    <figcaption>
                      <h5>{product.name}</h5>
                      <p>{product.color}</p>
                    </figcaption>
                  </a>
                </figure>
              );
            })}
          </div>
        </div>
        <div className={classes.overlay} style={expand.overlay}></div>
      </div>
    </Fragment>
  );
};

export default Header;
