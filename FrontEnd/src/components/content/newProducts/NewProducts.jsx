// This goes under the hero slider for the new products that get added to the shop
// can only hold an array of 3-5 products based on screen size responsiveness
import { Fragment } from "react";
import { useSelector } from "react-redux";
import LoadingCard from "../../UI/card/loadingCard/LoadingCard";
import ProductCard from "../../UI/card/productCard/ProductCard";
import classes from "./NewProducts.module.scss";

const NewProducts = (props) => {
  const products = useSelector((state) => state.shop.recentItems);
  const isLoading = useSelector((state) => state.shop.isLoading);

  let content = (
    <Fragment>
      <LoadingCard /> <LoadingCard /> <LoadingCard /> <LoadingCard />
    </Fragment>
  );

  if (!isLoading) {
    content = products.map((product) => (
      <div key={product._id}>
        {console.log(product)}
        <ProductCard
          key={product._id}
          id={product._id}
          title={product.title}
          img={product.imageUrl}
          image={product.image}
          price={product.price}
          color={product.color}
          sale={product.sale}
          salePrice={product.salePrice}
        />
      </div>
    ));
  }

  return (
    <section className={classes.container}>
      <div className={classes.heading}>Recently Added</div>
      <div className={classes.content}>{content}</div>
    </section>
  );
};

export default NewProducts;
