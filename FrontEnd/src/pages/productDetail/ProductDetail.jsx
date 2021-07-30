// View the price and stats on the product screen
import React, { useEffect } from "react";
import ProductItem from "../../components/product/ProductItem";
import classes from "./productDetail.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getProductDetail } from "../../store/shop/shop-actions";

const ProductDetail = () => {
  const history = useHistory();
  const { productId } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.shop.productDetail);
  const isLoading = useSelector((state) => state.shop.isLoading);

  useEffect(() => {
    if (productId !== undefined) {
      dispatch(getProductDetail(productId));
    } else {
      history.replace("/notFound");
    }
  }, [dispatch, productId, history]);

  // put loading component later
  let content = "kaappa";
  if (!isLoading) {
    content = (
      <ProductItem
        id={product._id}
        price={product.price}
        img={product.imageUrl}
        description={product.description}
        title={product.title}
        color={product.color}
        stock={product.stock}
        sale={product.sale}
        salePrice={product.salePrice}
      />
    );
  }
  return <div className={classes.container}>{content}</div>;
};

export default ProductDetail;
