const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController.js");

const isAuth = require("../middleware/isAuth.js");

router.get("/get-product", isAuth, adminController.getUserProduct);
router.post("/add-product", isAuth, adminController.addUserProduct);
router.get("/get-edit-product/:productId", isAuth, adminController.getEditProduct);
router.put("/edit-product/:productId", isAuth, adminController.editUserProduct);
router.delete(
  "/delete-product/:productId",
  isAuth,
  adminController.deleteUserProduct
);

module.exports = router;
