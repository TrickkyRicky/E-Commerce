import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import classes from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <div className={classes.container}>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
