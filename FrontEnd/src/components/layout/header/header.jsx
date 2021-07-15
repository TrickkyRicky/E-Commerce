import React from "react";
import classes from "./Header.module.scss";

const Header = (props) => {
  return (
    // wrapper
    <div>
      {/* content container */}
      <div>
        {/* content */}
        <div>
          <p>Logo / Home Link</p>
          <p>Shop Link</p>
          <p>My Products Link</p>
        </div>
        <div>
          <p>Login Link</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
