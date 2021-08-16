const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();
const adminController = require("../controllers/adminController.js");

const isAuth = require("../middleware/isAuth.js");

router.get("/get-product", isAuth, adminController.getUserProduct);
router.post(
  "/add-product",
  [
    body("title").trim().isLength({ min: 5 }).not().isEmpty(),
    body("price").isFloat().not().isEmpty(),
    body("color").trim().isLength({ min: 3 }).not().isEmpty(),
    body("xs").trim().isInt().not().isEmpty(),
    body("small").trim().isInt().not().isEmpty(),
    body("med").trim().isInt().not().isEmpty(),
    body("large").trim().isInt().not().isEmpty(),
    body("xl").trim().isInt().not().isEmpty(),
    body("category").trim().not().isEmpty(),
    body("gender").trim().not().isEmpty(),
    body("description").trim().isLength({ min: 5, max: 400 }).not().isEmpty(),
  ],
  isAuth,
  adminController.addUserProduct
);
router.get(
  "/get-edit-product/:productId",
  isAuth,
  adminController.getEditProduct
);
router.put(
  "/edit-product/:productId",
  [
    body("title").trim().isLength({ min: 5 }).not().isEmpty(),
    body("price").isFloat().not().isEmpty(),
    body("color").trim().isLength({ min: 3 }).not().isEmpty(),
    body("xs").trim().isInt().not().isEmpty(),
    body("small").trim().isInt().not().isEmpty(),
    body("med").trim().isInt().not().isEmpty(),
    body("large").trim().isInt().not().isEmpty(),
    body("xl").trim().isInt().not().isEmpty(),
    body("category").trim().not().isEmpty(),
    body("gender").trim().not().isEmpty(),
    body("description").trim().isLength({ min: 5, max: 400 }).not().isEmpty(),
  ],
  isAuth,
  adminController.editUserProduct
);
router.delete(
  "/delete-product/:productId",
  isAuth,
  adminController.deleteUserProduct
);

router.get("/get-cart", isAuth, adminController.getCart);
router.post("/post-cart-item", isAuth, adminController.postCart);
router.delete(
  "/delete-cart-item",
  isAuth,
  adminController.postCartDeleteProduct
);

module.exports = router;
