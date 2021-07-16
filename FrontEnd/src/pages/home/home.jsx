import React from "react";
import classes from "./Home.module.scss";
import Hero from "../../components/UI/heroSlider/Hero";

const Home = () => {
  return (
    <div className={classes.container}>
      <Hero />
    </div>
  );
};

export default Home;
