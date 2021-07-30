const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shopController.js");

router.get("/products", shopController.getProducts);
router.get("/cat-products", shopController.getCatProducts);
router.get("/product-detail/:productId", shopController.getProductDetail);

module.exports = router;
