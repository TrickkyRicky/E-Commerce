// layout compnent keeping the header and footer on each page, with router content coming in between

import React from "react";
import Header from "./header/Header";
import MobileHeader from "./mobileHeader/MobileHeader.jsx";
import Footer from "./footer/Footer";
import classes from "./Layout.module.scss";

import { useLocation } from "react-router-dom";

const Layout = (props) => {
  const location = useLocation();
  let noHeadOrFoot;

  if (location.pathname.includes("/auth")) {
    noHeadOrFoot = true;
  } else {
    noHeadOrFoot = false;
  }

  return (
    <div className={classes.container}>
      <Header isAuth={noHeadOrFoot} />
      <MobileHeader isAuth={noHeadOrFoot} />
      <main>{props.children}</main>
      <Footer isAuth={noHeadOrFoot} />
    </div>
  );
};

export default Layout;
