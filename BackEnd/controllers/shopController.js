const Product = require("../models/product.js");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    if (products.length <= 0) {
      const error = new Error("No Products in Db");
      error.statusCode = 204;
      throw error;
    }
    res.status(200).json({
      products: products,
    });
  } catch (err) {
    // checks for statusCode then sends to server.js middleware
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getCatProducts = async (req, res, next) => {
  const cat = req.query.cat;
  try {
    const products = await Product.find({ category: cat }).sort({
      createdAt: -1,
    });
    console.log(products);
    if (products.length <= 0) {
      const error = new Error("No Products in Db");
      error.statusCode = 204;
      throw error;
    }
    res.status(200).json({
      products: products,
    });
  } catch (err) {
    // checks for statusCode then sends to server.js middleware
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProductDetail = async (req, res, next) => {
  const prodId = req.params.productId;
  try {
    const product = await Product.findById(prodId);
    res.status(200).json({
      product: product,
    });
  } catch (err) {
    // checks for statusCode then sends to server.js middleware
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
