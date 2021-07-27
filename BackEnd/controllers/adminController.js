const fs = require("fs");
const path = require("path");

const User = require("../models/user.js");
const Product = require("../models/product.js");

exports.getUserProduct = async (req, res, next) => {
  const categoryTag = req.query.cat;
  console.log(categoryTag);
  try {
    const result = await Product.find({
      userId: req.userId,
      category: categoryTag,
    });

    console.log(result);
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
  const title = req.body.title;
  const price = req.body.price;
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

    console.log(result);
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
  const prodId = req.params.productId;
  const title = req.body.title;
  const price = req.body.price;
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
    if (imageUrl !== post.imageUrl) {
      clearImage(post.imageUrl);
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
  const prodId = req.params.postId;
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

    clearImage(product.imageUrl);

    await Product.findByIdAndRemove(prodId);

    // const user = await User.findById(req.userId);
    // user.posts.pull(postId);
    // await user.save();

    res.status(200).json({ message: "Deleted Post" });
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
