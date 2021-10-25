import React, { useState, useRef, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { addCartProduct } from "../../store/admin/admin-actions";
import Spinner from "../UI/spinner/Spinner";
import classes from "./ProductItem.module.scss";

const ProductItem = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [sale, setSale] = useState(null);
  const isLoading = useSelector((state) => state.shop.isLoading);
  const zoomRef = useRef();
  const imgRef = useRef();
  const selectRef = useRef();

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.auth.jwtToken);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const moveLens = () => {
    let ratio = 2;

    zoomRef.current.style.backgroundImage = `url(${imgRef.current.src})`;
    zoomRef.current.style.backgroundSize =
      imgRef.current.width * ratio +
      "px " +
      imgRef.current.height * ratio +
      "px";

    let pos = getCursor();
    let pL = pos.x - zoomRef.current.offsetWidth / 2;
    let pT = pos.y - zoomRef.current.offsetHeight / 2;

    // checks bounds to see if
    if (pL < 0) {
      pL = 0;
    }
    if (pT < 0) {
      pT = 0;
    }
    if (pL > imgRef.current.width - zoomRef.current.offsetWidth / 3) {
      pL = imgRef.current.width - zoomRef.current.offsetWidth / 3;
    }
    if (pT > imgRef.current.height - zoomRef.current.offsetHeight / 3) {
      pT = imgRef.current.height - zoomRef.current.offsetHeight / 3;
    }

    zoomRef.current.style.left = pL + "px";
    zoomRef.current.style.top = pT + "px";

    zoomRef.current.style.backgroundPosition =
      "-" + pos.x * ratio + "px -" + pos.y * ratio + "px";
  };
  function getCursor() {
    let e = window.event;
    let bounds = imgRef.current.getBoundingClientRect();

    let x = e.pageX - bounds.left;
    let y = e.pageY - bounds.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }

  let option = [{ value: null }];
  const options = [
    {
      oVal: "xsmall",
      text: `X-Small (${props.stock.xsmall}) in stock`,
      val: props.stock.xsmall,
    },
    {
      oVal: "small",
      text: `Small (${props.stock.small}) in stock`,
      val: props.stock.small,
    },
    {
      oVal: "medium",
      text: `Medium (${props.stock.medium}) in stock`,
      val: props.stock.medium,
    },
    {
      oVal: "large",
      text: `Large (${props.stock.large}) in stock`,
      val: props.stock.large,
    },
    {
      oVal: "xlarge",
      text: `X-Large (${props.stock.xlarge}) in stock`,
      val: props.stock.xlarge,
    },
  ];

  const newArray = options.filter(function (option) {
    return option.val > 0;
  });
  if (props.stock) {
    option = newArray.map((itm, index) => {
      return (
        <option key={index} value={itm.oVal}>
          {itm.text}
        </option>
      );
    });
  }

  const inputChangeHandler = (e) => {
    if (e.target.name === "quantity") {
      setQuantity(e.target.value);
    }

    if (e.target.name === "size") {
      console.log(e.target.value);
      console.log(selectRef.current.value);
    }
  };

  useEffect(() => {
    if (props.sale && props.salePrice) {
      setSale(props.salePrice);
    }
  }, [setSale, props.salePrice, props.sale]);
  let saleTag = null;
  if (props.price) {
    saleTag = <p className={classes.price}>${props.price.toFixed(2)}</p>;
  }
  if (props.sale) {
    saleTag = (
      <div className={classes.sale}>
        <p className={classes.price}>${props.salePrice.toFixed(2)}</p>
        <p className={classes.price}>${props.price.toFixed(2)} </p>
        <span>{props.sale}% off</span>
      </div>
    );
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isAuth) {
      const isTrue = await dispatch(
        addCartProduct(quantity, props.id, jwt, selectRef.current.value)
      );
      console.log(isTrue);
      if (isTrue) {
        history.push("/cart");
      }
    } else {
      history.push({
        pathname: "/auth",
        state: {
          from: location.pathname,
        },
      });
    }
  };

  //   will disable later due to quantity conditions
  let content = <Spinner />;
  if (!isLoading) {
    content = (
      <Fragment>
        <div className={classes.imgContainer}>
          <div
            className={classes.lens}
            ref={zoomRef}
            onMouseMove={moveLens}
          ></div>
          <img
            src={`https://sense-clothing.herokuapp.com/${props.img}`}
            ref={imgRef}
            onMouseMove={moveLens}
            onTouchMove={moveLens}
            alt={props.title}
          />
        </div>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <h2>{props.title}</h2>
          {/* <p className={classes.price}>${props.price}</p> */}
          {saleTag}
          <p className={classes.description}>{props.description}</p>
          <div>
            <p>Size:</p>
            <select
              value={option.oVal}
              onChange={inputChangeHandler}
              name="size"
              ref={selectRef}
            >
              {option}
            </select>
          </div>
          <div>
            <p>Quantity:</p>
            <input
              type="number"
              value={quantity}
              name="quantity"
              onChange={inputChangeHandler}
            />
          </div>
          <button>{isAuth ? "Add To Cart" : "Login"}</button>
        </form>
      </Fragment>
    );
  }

  return <div className={classes.itemContainer}>{content}</div>;
};

export default ProductItem;
