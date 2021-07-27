import { shopActions } from "./shop-slice";

export const getProducts = () => {
  return async (dispatch) => {
    dispatch(
      shopActions.setLoading({
        loading: true,
      })
    );
    const getData = async () => {
      const res = await fetch("http://localhost:8080/shop/products");

      if (res.status !== 200) {
        throw new Error("Failed to fetch products.");
      }
      return res.json();
    };
    try {
      const result = await getData();
    //   console.log(result);
      dispatch(
        shopActions.setAllProd({
          products: result.products,
        })
      );
      dispatch(
        shopActions.setLoading({
          loading: false,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};
