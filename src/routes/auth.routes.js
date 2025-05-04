const express = require("express");
const {
  registerController,
  loginController,
  refreshController,
} = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh-token", refreshController);

module.exports = router;
