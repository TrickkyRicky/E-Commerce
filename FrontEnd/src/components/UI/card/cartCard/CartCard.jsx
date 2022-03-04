import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCartProduct } from "../../../../store/admin/admin-actions";
import { dev } from "../../../../util/dev";

import classes from "./CartCard.module.scss";

const CartCard = (props) => {
  const jwt = useSelector((state) => state.auth.jwtToken);
  const dispatch = useDispatch();
  const deleteCartProductHandler = () => {
    dispatch(deleteCartProduct(jwt, props.id));
    window.location.reload();
  };

  return (
    <div className={classes.container}>
      <img
        src={
          props.imageUrl
            ? `${dev()}/${props.imageUrl}`
            : `data:${props.image.contentType};base64,${Buffer.from(
                props.image.data.data
              ).toString("base64")}`
        }
        alt={props.title}
      />
      <div className={classes.content}>
        <h5>{props.title}</h5>
        <p>Price: ${props.price.toFixed(2)}</p>
        <p>Color: {props.color}</p>
        <p>Size: {props.size}</p>
        <div>
          <label>Qty:</label>
          <input type="number" value={props.qty} readOnly placeholder="Qty" />
        </div>
        <button onClick={deleteCartProductHandler}>Delete</button>
      </div>
    </div>
  );
};

export default CartCard;
