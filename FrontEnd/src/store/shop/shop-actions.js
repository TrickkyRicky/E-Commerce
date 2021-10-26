import { shopActions } from "./shop-slice";
import { dev } from "../../util/dev";
export const getProducts = (location) => {
  return async (dispatch) => {
    dispatch(
      shopActions.setLoading({
        loading: true,
      })
    );
    const getData = async () => {
      const res = await fetch(dev() + "/shop/products");

      if (res.status !== 200) {
        throw new Error("Failed to fetch products.");
      }
      return res.json();
    };
    try {
      const result = await getData();

      if (location === "/home" || location === "/shop") {
        dispatch(
          shopActions.setAllIndividual({
            products: result.products,
          })
        );
        dispatch(
          shopActions.setAllProd({
            products: result.products,
          })
        );
      } else {
        dispatch(
          shopActions.setAllIndividual({
            products: result.products,
          })
        );
      }
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

export const getCatProducts = (cat) => {
  console.log(cat);
  return async (dispatch) => {
    dispatch(
      shopActions.setLoading({
        loading: true,
      })
    );
    const getData = async () => {
      const res = await fetch(dev() + "/shop/cat-products?cat=" + cat);

      if (res.status !== 200) {
        throw new Error("Failed to fetch products.");
      }
      return res.json();
    };
    try {
      const result = await getData();
      dispatch(
        shopActions.setCatProd({
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

export const getProductDetail = (id) => {
  console.log(id);
  return async (dispatch) => {
    dispatch(
      shopActions.setLoading({
        loading: true,
      })
    );
    const getData = async () => {
      const res = await fetch(dev() + "/shop/product-detail/" + id);

      if (res.status !== 200) {
        throw new Error("Failed to fetch products.");
      }
      return res.json();
    };
    try {
      const result = await getData();
      dispatch(
        shopActions.setProduct({
          product: result.product,
        })
      );
      dispatch(
        shopActions.setLoading({
          loading: false,
        })
      );
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
};
