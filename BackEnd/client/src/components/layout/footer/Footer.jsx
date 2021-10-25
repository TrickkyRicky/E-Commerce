import React from "react";
import classes from "./Footer.module.scss";
import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineFacebook,
} from "react-icons/ai";
import { FaSnapchatGhost, FaPinterestP } from "react-icons/fa";

import asb from "../../../assets/appleBadge.svg";
import gpb from "../../../assets/googleBadge.svg";

const Footer = (props) => {
  let isHide;
  if (!props.isAuth) {
    isHide = (
      <div className={classes.container}>
        <div className={classes.icons}>
          <a href="/">
            <AiOutlineTwitter size="27" color="white" />
          </a>
          <a href="/">
            <AiOutlineInstagram size="27" color="white" />
          </a>
          <a href="/">
            <AiOutlineFacebook size="27" color="white" />
          </a>
          <a href="/">
            <FaSnapchatGhost size="25" color="white" />
          </a>
          <a href="/">
            <FaPinterestP size="25" color="white" />
          </a>
        </div>
        <div className={classes.download}>
          <a href="/">
            <img src={asb} alt="apple store download icon" />
          </a>
          <a href="/">
            <img src={gpb} alt="google play download icon" />
          </a>
        </div>
        <div className={classes.terms}>
          <p>
            Terms &#38; Conditions | Integration | &copy; 2021 By Richard Young.
            All rights reserved.
          </p>
        </div>
      </div>
    );
  } else {
    isHide = null;
  }
  return isHide;
};

export default Footer;
