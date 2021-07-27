import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "../../../../hooks/hooks.js";
import { addProduct } from "../../../../store/admin/admin-actions.js";
// import { generateBase64FromImage } from "../../../../util/image.js";
import classes from "./AddProduct.module.scss";

const AddProduct = (props) => {
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

  const [imgVal, setImgVal] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);
  const [theColor, setTheColor] = useState({});

  const jwt = useSelector((state) => state.auth.jwtToken);
  const dispatch = useDispatch();

  let options = null;

  const onSelectChangeHandler = (e) => {
    if (e.target.name === "gender") {
      setGender(e.target.value);
      setIsDisabled(false);
      setTheColor({ color: "#333" });
    }
  };

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
    }
    if (e.target.name === "color") {
      setColor(e.target.value);
    }
    if (e.target.name === "category") {
      setCategory(e.target.value);
    }
    if (e.target.name === "image") {
      console.log(e.target.files[0]);
      setImgVal(e.target.value);
      setImage(e.target.files[0]);
      //   setB64(e.target.files[0]);
      //   if (e.target.files) {
      //     const fileReader = new FileReader();
      //     fileReader.readAsDataURL(e.target.files[0]);
      //     //   .then((b64) => {
      //     //     setB64(b64);
      //     //   })
      //     //   .catch((e) => {
      //     //     setB64(null);
      //     //   });
      //   }
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
  };

  //   console.log(b64);
  const onSubmitHandler = (
    e,
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
    jwt
  ) => {
    e.preventDefault();
    dispatch(
      addProduct(
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
        jwt
      )
    );
  };
  console.log(jwt);
  return (
    <form
      className={classes.container}
      onSubmit={(e) =>
        onSubmitHandler(
          e,
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
          jwt
        )
      }
    >
      <h2>Create Product</h2>
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
            onChange={(e) => onSelectChangeHandler(e)}
            style={theColor}
            defaultValue="Select a Gender"
          >
            <option disabled hidden>
              Select a Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <p>Category</p>
          <select
            id="category"
            name="category"
            disabled={isDisabled}
            style={theColor}
            required
            onChange={inputChangeHandler}
            defaultValue="Select a Category"
          >
            <option disabled hidden>
              Select a Category
            </option>
            {options}
          </select>
        </div>
      </div>
      {/* imageUrl */}
      <div className={classes.row4}>
        <p>Image</p>
        <input
          type="file"
          accept=".jpg,.png,.jpeg"
          name="image"
          placeholder="image"
          color="blue"
          onChange={inputChangeHandler}
          value={imgVal}
          required
        />
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

      <button>Create</button>
    </form>
  );
};

export default AddProduct;
