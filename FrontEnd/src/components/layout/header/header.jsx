import React, { Fragment } from "react";
import classes from "./Header.module.scss";
import AnnouceBar from "./AnnounceBar.jsx";
import Logo from "../../../assets/theLogo.png";

const Header = (props) => {
  return (
    // wrapper
    <Fragment>
      <AnnouceBar />
      {/* content container */}
      <nav className={classes.container}>
        {/* content */}
        <div>
          <a href="/shop">Men Link</a>
          <a href="/shop">Woman Link</a>
        </div>
        <div>
          <a href="/">
            <img src={Logo} alt="Logo" />
          </a>
        </div>
        <div>
          <a href="/">Login / Logout Link</a>
          {/* Will show my products when Authenticated */}
          {/* <a href="/">My products Link</a> */}
          <a href="/">Cart Link</a>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
