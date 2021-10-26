// page with hero image slider and recently added products
import React from "react";
import classes from "./Home.module.scss";
import Hero from "../../components/UI/heroSlider/Hero";
import NewProducts from "../../components/content/newProducts/NewProducts";

const Home = () => {
  
  return (
    <div className={classes.container}>
      <Hero />
      <div className={classes.line}></div>
      <NewProducts />
    </div>
  );
};

export default Home;
