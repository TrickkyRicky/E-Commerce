// View the price and stats on the product screen
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ProductItem from "../../components/product/ProductItem.jsx";
import { getProductDetail } from "../../store/shop/shop-actions";
import classes from "./productDetail.module.scss";

const ProductDetail = () => {
  const history = useHistory();
  const { productId } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.shop.productDetail);

  useEffect(() => {
    if (productId !== undefined) {
      dispatch(getProductDetail(productId)).then((isTrue) => {
        if (!isTrue) {
          history.replace("/*");
        } else {
          return;
        }
      });
    }
  }, [dispatch, productId, history]);

  // put loading component later
  return (
    <div className={classes.container}>
      <ProductItem
        id={product._id}
        price={product.price}
        img={product.imageUrl}
        image={product.image}
        description={product.description}
        title={product.title}
        color={product.color}
        stock={product.stock}
        sale={product.sale}
        salePrice={product.salePrice}
      />
    </div>
  );
};

export default ProductDetail;
