const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator/check");

const User = require("../models/user.js");
const Product = require("../models/product.js");

exports.getUserProduct = async (req, res, next) => {
  const categoryTag = req.query.cat;
  try {
    const result = await Product.find({
      userId: req.userId,
      category: categoryTag,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Products were successfully fetched",
      products: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addUserProduct = async (req, res, next) => {
  if (!req.file) {
    const error = new Error("No image provided");
    error.statusCode = 422;
    throw error;
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const title = req.body.title;
  const price = (+req.body.price).toFixed(2);
  const color = req.body.color;
  const xs = req.body.xs;
  const small = req.body.small;
  const med = req.body.med;
  const large = req.body.large;
  const xl = req.body.xl;
  const category = req.body.category;
  const gender = req.body.gender;
  const description = req.body.description;
  const imageUrl = req.file.path;

  const product = new Product({
    title: title,
    price: price,
    color: color,
    stock: {
      xsmall: xs,
      small: small,
      medium: med,
      large: large,
      xlarge: xl,
    },
    category: category,
    gender: gender,
    description: description,
    imageUrl: imageUrl,
    userId: req.userId,
  });

  try {
    await product.save();
    res.status(201).json({
      message: "Product successfully created",
      product: product,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getEditProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  try {
    const result = await Product.find({ _id: prodId, userId: req.userId });

    res.status(200).json({
      message: "The product to edit was found",
      product: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editUserProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const prodId = req.params.productId;
  const title = req.body.title;
  const price = (+req.body.price).toFixed(2);
  const color = req.body.color;
  const xs = req.body.xs;
  const small = req.body.small;
  const med = req.body.med;
  const large = req.body.large;
  const xl = req.body.xl;
  const category = req.body.category;
  const gender = req.body.gender;
  const description = req.body.description;
  let imageUrl = req.body.image;
  let sale = undefined;
  let salePrice = undefined;

  if (
    req.body.sale !== undefined &&
    req.body.sale > 0 &&
    !isNaN(req.body.sale)
  ) {
    sale = req.body.sale;
    salePrice = (+req.body.sp).toFixed(2);
  }
  if (req.body.sale > 50 || req.body.sale < 0) {
    sale = undefined;
    salePrice = undefined;
  }

  // checks to see if a file was sent meaning image would be change or could be the same
  if (req.file) {
    imageUrl = req.file.path;
  }
  // checks to see if somehow user deleted image in edit mode
  if (!imageUrl) {
    const error = new Error("No file picked");
    error.statusCode = 422;
    throw error;
  }

  try {
    const product = await Product.findById(prodId);

    // double checks if user is the same
    if (product.userId.toString() !== req.userId) {
      const error = new Error("Not Authorized.");
      error.statusCode = 403;
      throw error;
    }
    // checks if the image Url matches the one that is already saved
    if (imageUrl !== product.imageUrl) {
      clearImage(product.imageUrl);
    }

    product.title = title;
    product.color = color;
    product.price = price;
    product.stock.xsmall = xs;
    product.stock.small = small;
    product.stock.medium = med;
    product.stock.large = large;
    product.stock.xlarge = xl;
    product.category = category;
    product.gender = gender;
    product.description = description;
    product.imageUrl = imageUrl;
    product.sale = sale;
    product.salePrice = salePrice;

    const result = await product.save();
    res.status(200).json({
      message: "Product successfully edited",
      result: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteUserProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  try {
    const product = await Product.findById(prodId);

    if (!product) {
      const error = new Error("Could not find product.");
      error.statusCode = 404;
      throw error;
    }

    if (product.userId.toString() !== req.userId) {
      const error = new Error("Not Authorized.");
      error.statusCode = 403;
      throw error;
    }

    const user = await User.findById(req.userId);
    console.log(user);
    await user.removeFromCart(prodId);

    clearImage(product.imageUrl);

    await Product.findByIdAndRemove(prodId);

    res.status(200).json({ message: "Deleted Product" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

exports.getCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate(
      "cart.items.productId"
    );
    const products = user.cart.items;

    let totalPrice = null;
    products.forEach((prod) => {
      console.log(prod);
      if (prod.productId.salePrice) {
        totalPrice += prod.productId.salePrice * prod.quantity;
      } else {
        totalPrice += prod.productId.price * prod.quantity;
      }
    });
    res.status(200).json({
      message: "Cart Retrieved",
      products: products,
      total: totalPrice.toFixed(2),
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.prodId;
  const qty = req.body.qty;
  const size = req.body.size;

  try {
    const product = await Product.findById(prodId);

    if (qty > product.stock[size]) {
      const error = new Error("Quantity is over the limit");
      error.statusCode = 403;
      throw error;
    }

    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Not Authorized");
      error.statusCode = 403;
      throw error;
    }
    user.addToCart(product, qty, size);

    res.status(201).json({ message: "Item added to cart" });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.prodId;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Not Authorized");
      error.statusCode = 403;
      throw error;
    }
    await user.removeFromCart(prodId);
    res.status(201).json({ message: "Item deleted from cart" });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
