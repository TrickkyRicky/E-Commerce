const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const authController = require("../controllers/authController.js");

router.put(
  "/signup",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").trim().isLength({ min: 3 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);
router.post("/login", authController.login);
router.post("/reset", authController.reset);
router.get("/newpass/:token", authController.getNewPass);
router.put(
  "/newpass",
  [body("password").trim().isLength({ min: 3 })],
  authController.updateNewPass
);

module.exports = router;
