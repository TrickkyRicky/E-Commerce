import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { editProduct } from "../../../../store/admin/admin-actions.js";
import { CgSoftwareUpload } from "react-icons/cg";
import { generateBase64FromImage } from "../../../../util/image.js";
import { dev } from "../../../../util/dev.js";
import classes from "./AddProduct.module.scss";

const EditProduct = (props) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [xsmall, setXsmall] = useState("");
  const [small, setSmall] = useState("");
  const [medium, setMedium] = useState("");
  const [xlarge, setXlarge] = useState("");
  const [large, setLarge] = useState("");
  const [sale, setSale] = useState("");
  const [salePrice, setSalePrice] = useState("");

  const [imgVal, setImgVal] = useState("");
  const [imgIconColor, setImgIconColor] = useState("black");

  const jwt = useSelector((state) => state.auth.jwtToken);
  const product = useSelector((state) => state.admin.editProduct[0]);
  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (product !== undefined) {
      setTitle(product.title);
      setPrice(product.price);
      setColor(product.color);
      setGender(product.gender);
      setCategory(product.category);
      setImage(product.imageUrl);
      setImgVal(`${dev()}/${product.imageUrl}`);
      setDescription(product.description);
      setXsmall(product.stock.xsmall);
      setSmall(product.stock.small);
      setMedium(product.stock.medium);
      setLarge(product.stock.large);
      setXlarge(product.stock.xlarge);
      if (product.sale !== undefined && product.sale > 0) {
        setSale(product.sale);
        setSalePrice(product.price - (product.price * product.sale) / 100);
      }
    }
  }, [
    setTitle,
    setPrice,
    setColor,
    setCategory,
    setImage,
    setImgVal,
    setGender,
    setDescription,
    setXsmall,
    setSmall,
    setMedium,
    setLarge,
    setXlarge,
    setSale,
    setSalePrice,
    product,
  ]);
  let equationString = null;
  if (sale > 0) {
    equationString = (
      <Fragment>
        <p>Sales Price: {salePrice}</p>
      </Fragment>
    );
  }
  let options = null;

  if (gender === "Male") {
    options = (
      <Fragment>
        <option value="shirt">Shirt</option>
        <option value="shorts">Shorts</option>
        <option value="pants">Pants</option>
        <option value="hats">Hats</option>
      </Fragment>
    );
  } else if (gender === "Female") {
    options = (
      <Fragment>
        <option value="tops">Tops</option>
        <option value="dresses">Dress</option>
        <option value="skirts">Skirt</option>
        <option value="leggings">Leggings</option>
      </Fragment>
    );
  }

  const inputChangeHandler = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    }
    if (e.target.name === "price") {
      setPrice(e.target.value);
      setSalePrice(e.target.value - (e.target.value * sale) / 100);
    }
    if (e.target.name === "color") {
      setColor(e.target.value);
    }
    if (e.target.name === "gender") {
      setGender(e.target.value);
    }
    if (e.target.name === "category") {
      setCategory(e.target.value);
    }
    if (e.target.name === "image") {
      setImage(e.target.files[0]);
      if (e.target.files) {
        generateBase64FromImage(e.target.files[0])
          .then((res) => {
            setImgVal(res);
          })
          .catch((err) => console.log(err));
      }
    }
    if (e.target.name === "description") {
      setDescription(e.target.value);
    }
    if (e.target.name === "xs") {
      setXsmall(e.target.value);
    }
    if (e.target.name === "small") {
      setSmall(e.target.value);
    }
    if (e.target.name === "medium") {
      setMedium(e.target.value);
    }
    if (e.target.name === "large") {
      setLarge(e.target.value);
    }
    if (e.target.name === "xl") {
      setXlarge(e.target.value);
    }
    if (e.target.name === "sale") {
      setSale(e.target.value);
      setSalePrice((price - (price * e.target.value) / 100).toFixed(2));
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editProduct(
        title,
        color,
        price,
        gender,
        category,
        image,
        description,
        xsmall,
        small,
        medium,
        large,
        xlarge,
        sale,
        salePrice,
        jwt,
        product._id
      )
    );
    window.location.reload();
  };
  return (
    <form className={classes.container} onSubmit={(e) => onSubmitHandler(e)}>
      <h2>Edit Product</h2>
      {/* product title */}
      <div className={classes.row1}>
        <p>Title</p>
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          required
          onChange={inputChangeHandler}
          value={title}
          minLength={5}
        />
      </div>
      {/* product color */}
      <div className={classes.row2}>
        <div>
          <p>Color</p>
          <input
            type="text"
            name="color"
            placeholder="Product Color"
            required
            onChange={inputChangeHandler}
            value={color}
            minLength={3}
          />
        </div>
        {/* price */}
        <div>
          <p>Price</p>
          <input
            type="number"
            name="price"
            placeholder="Product Price"
            required
            onChange={inputChangeHandler}
            value={price}
          />
        </div>
      </div>
      {/* dropDown with the available categories */}
      <div className={classes.row3}>
        {/* gender */}
        <div>
          <p>Gender</p>
          <select
            required
            id="gender"
            name="gender"
            className={classes.edit}
            onChange={inputChangeHandler}
            value={gender}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <p>Category</p>
          <select
            id="category"
            name="category"
            required
            className={classes.edit}
            onChange={inputChangeHandler}
            value={category}
          >
            {options}
          </select>
        </div>
      </div>
      {/* imageUrl */}
      <div className={classes.row4}>
        <div>
          <p>Image</p>
          <label
            htmlFor="file"
            onMouseOver={() => {
              setImgIconColor("white");
            }}
            onMouseLeave={() => {
              setImgIconColor("black");
            }}
          >
            <CgSoftwareUpload
              color={imgIconColor}
              size={25}
              style={{ transition: "all 300ms" }}
            />
            Upload Image
          </label>
        </div>
        <input
          id="file"
          type="file"
          accept=".jpg,.png,.jpeg"
          name="image"
          placeholder="image"
          onChange={inputChangeHandler}
          //   required
        />
        <img src={imgVal} alt="uploaded" />
      </div>
      {/* description */}
      <div className={classes.row5}>
        <p>Description</p>
        <textarea
          name="description"
          placeholder="Type Product Description"
          onChange={inputChangeHandler}
          value={description}
          required
          minLength={5}
          maxLength={400}
        />
      </div>
      <div>
        <p>Product Skews</p>
        <div className={classes.row6}>
          {/* some way to keep scews values for in stock */}
          <input
            type="number"
            name="xs"
            placeholder="X-Small"
            onChange={inputChangeHandler}
            value={xsmall}
            required
          />
          <input
            type="number"
            name="small"
            placeholder="Small"
            onChange={inputChangeHandler}
            value={small}
            required
          />
          <input
            type="number"
            name="medium"
            placeholder="Medium"
            onChange={inputChangeHandler}
            value={medium}
            required
          />
          <input
            type="number"
            name="large"
            placeholder="Large"
            onChange={inputChangeHandler}
            value={large}
            required
          />
          <input
            type="number"
            name="xl"
            placeholder="X-Large"
            onChange={inputChangeHandler}
            value={xlarge}
            required
          />
        </div>
      </div>

      <div className={classes.row7Container}>
        <p>Product Sale</p>
        <div className={classes.row7}>
          {/* input that holds sales */}
          <input
            type="number"
            name="sale"
            placeholder="Sale % Off"
            onChange={inputChangeHandler}
            value={sale}
            min={0}
            max={50}
          />
          {equationString}
        </div>
      </div>

      <button>Edit</button>
    </form>
  );
};

export default EditProduct;
