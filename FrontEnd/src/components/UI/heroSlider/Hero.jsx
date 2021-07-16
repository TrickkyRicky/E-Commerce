import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HeroCard from "../card/heroCard/HeroCard";
import classes from "./Hero.module.scss";

const Hero = (props) => {
  let settings = {
    dots: true,
    Infinite: true,
    speed: 500,
    slidesToScroll: 1,
    cssEase: "linear",
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div>
      <Slider {...settings}>
        <HeroCard imgName="Men Clothing Banner" />
        <HeroCard imgName="Woman Clothing Banner" />
        <HeroCard imgName="Download Mobile App Now" />
      </Slider>
    </div>
  );
};

export default Hero;
