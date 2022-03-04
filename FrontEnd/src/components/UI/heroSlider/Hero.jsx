// component Hero carousel to view new store products or sales, etc.
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import MenIMG from "../../../assets/polos_banner-edit.jpeg";
import HeroCard from "../card/heroCard/HeroCard";
import classes from "./Hero.module.scss";

// import DownloadIMG from "../../../assets/D2.jpeg";

const Hero = (props) => {
  let settings = {
    dots: false,
    Infinite: true,
    speed: 500,
    slidesToScroll: 1,
    cssEase: "linear",
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };
  return (
    <div className={classes.container}>
      <Slider {...settings}>
        <HeroCard img={MenIMG} imgName="Men Clothing Banner" />
        {/* <HeroCard img={FashionIMG} imgName="Fashion" /> */}
        {/* <HeroCard img={WomanIMG} imgName="Woman Clothing Banner" /> */}
        {/* <HeroCard img={DownloadIMG} imgName="Download Mobile App Now" /> */}
      </Slider>
    </div>
  );
};

export default Hero;
