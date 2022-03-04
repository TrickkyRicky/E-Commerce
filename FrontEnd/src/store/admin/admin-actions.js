import { adminActions } from "./admin-slice";
import { dev } from "../../util/dev";

export const getUserProducts = (category, jwt) => {
  return async (dispatch) => {
    const getData = async () => {
      const res = await fetch(dev() + "/admin/get-product?cat=" + category, {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      });

      if (res.status !== 200) {
        throw new Error("Failed to fetch user products");
      }
      return res.json();
    };
    try {
      const result = await getData();
      dispatch(
        adminActions.setUserProducts({
          products: result.products,
        })
      );
      dispatch(adminActions.setLoading(false));
    } catch (err) {
      console.log(err);
      dispatch(adminActions.setLoading(false));
    }
  };
};

export const addProduct = (
  title,
  color,
  price,
  gender,
  category,
  image,
  description,
  xs,
  small,
  med,
  large,
  xl,
  jwt
) => {
  return async (dispatch) => {
    // since im using a file and text i must use formData to pass mixed content into
    // the rest api or the files get to big and CORS errors
    const formData = new FormData();
    formData.append("title", title);
    formData.append("color", color);
    formData.append("price", price);
    formData.append("gender", gender);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("xs", xs);
    formData.append("small", small);
    formData.append("med", med);
    formData.append("large", large);
    formData.append("xl", xl);

    const postData = async () => {
      const res = await fetch(dev() + "/admin/add-product", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + jwt,
        },
        body: formData,
      });
      if (res.status === 409) {
        throw new Error("User was unable to submit data");
      }
      if (res.status !== 201) {
        throw new Error("Could not save data please try again");
      }
      return await res.json();
    };
    try {
      const result = await postData();
      dispatch(
        adminActions.successfulCreation({
          result: result,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(
        adminActions.setErrorMsg("Could not create product please try again")
      );
    }
  };
};

export const getEditProduct = (jwt, id) => {
  return async (dispatch) => {
    const getData = async () => {
      const res = await fetch(dev() + "/admin/get-edit-product/" + id, {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      });

      if (res.status !== 200) {
        throw new Error("Failed to fetch product to edit");
      }
      return res.json();
    };
    try {
      const result = await getData();
      dispatch(
        adminActions.setEditProduct({
          product: result.product,
        })
      );
      dispatch(
        adminActions.setDeleteProduct({
          product: result.product,
        })
      );
      dispatch(adminActions.setLoading(false));
    } catch (err) {
      console.log(err);
      dispatch(adminActions.setLoading(false));
    }
  };
};

export const editProduct = (
  title,
  color,
  price,
  gender,
  category,
  image,
  description,
  xs,
  small,
  med,
  large,
  xl,
  sale,
  salePrice,
  jwt,
  id
) => {
  return async (dispatch) => {
    const formData = new FormData();
    console.log(image);
    formData.append("title", title);
    formData.append("color", color);
    formData.append("price", price);
    formData.append("gender", gender);
    formData.append("category", category);
    if (image instanceof File) {
      formData.append("image", image);
    } else {
      formData.append("image", JSON.stringify(image));
    }
    formData.append("description", description);
    formData.append("xs", xs);
    formData.append("small", small);
    formData.append("med", med);
    formData.append("large", large);
    formData.append("xl", xl);
    formData.append("sale", sale);
    formData.append("sp", salePrice);
    const putData = async () => {
      const res = await fetch(dev() + "/admin/edit-product/" + id, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + jwt,
        },
        body: formData,
      });
      if (res.status === 422) {
        throw new Error("No file picked");
      }
      if (res.status === 403) {
        throw new Error("Not Authorized");
      }
      if (res.status !== 200) {
        throw new Error("Could not edit the product");
      }
      return await res.json();
    };
    try {
      const result = await putData();
      dispatch(
        adminActions.successEdit({
          result: result,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(
        adminActions.setErrorMsg("Could not edit product please try again")
      );
    }
  };
};

export const deleteProduct = (jwt, id) => {
  return async (dispatch) => {
    const deleteData = async () => {
      const res = await fetch(dev() + "/admin/delete-product/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      });

      if (res.status === 404) {
        throw new Error("Product not found");
      }
      if (res.status === 403) {
        throw new Error("Not Authorized");
      }
      if (res.status !== 200) {
        throw new Error("Failed to delete product");
      }
      return res.json();
    };
    try {
      const result = await deleteData();
      dispatch(
        adminActions.successDelete({
          result: result,
        })
      );
      // dispatch(adminActions.setLoading(false));
    } catch (err) {
      console.log(err);
      dispatch(adminActions.setErrorMsg({ error: err }));
      // dispatch(adminActions.setLoading(false));
    }
  };
};

export const getCart = (jwt) => {
  return async (dispatch) => {
    dispatch(adminActions.setLoading(true));

    const getData = async () => {
      const res = await fetch(dev() + "/admin/get-cart", {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      });

      if (res.status !== 200) {
        throw new Error("Failed to fetch user products");
      }
      return res.json();
    };
    try {
      const result = await getData();
      dispatch(
        adminActions.setCart({
          cart: result.products,
        })
      );
      dispatch(
        adminActions.setTotal({
          total: result.total,
        })
      );
      dispatch(adminActions.setLoading(false));
    } catch (err) {
      console.log(err);
      dispatch(adminActions.setLoading(false));
    }
  };
};

export const addCartProduct = (qty, id, jwt, size) => {
  return async (dispatch) => {
    const postData = async () => {
      const res = await fetch(dev() + "/admin/post-cart-item", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + jwt,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qty: qty,
          prodId: id,
          size: size,
        }),
      });
      if (res.status !== 201) {
        throw new Error("Could not add product to cart");
      }
      return await res.json();
    };
    try {
      await postData();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
};

export const deleteCartProduct = (jwt, id) => {
  return async (dispatch) => {
    const deleteData = async () => {
      const res = await fetch(dev() + "/admin/delete-cart-item", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + jwt,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prodId: id,
        }),
      });
      if (res.status !== 201) {
        throw new Error("Could not delete product to cart");
      }
      return await res.json();
    };
    try {
      await deleteData();
    } catch (err) {
      console.log(err);
    }
  };
};
