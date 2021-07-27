const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController.js");

router.put("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/reset", authController.reset);
router.get("/newpass/:token", authController.getNewPass);
router.put("/newpass", authController.updateNewPass);

module.exports = router;
