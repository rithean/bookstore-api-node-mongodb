const express = require("express");
const {
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} = require("../controllers/user.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);

router.put("/:id", authenticate, authorize(["admin"]), updateUserController);

router.delete("/:id", authenticate, authorize(["admin"]), deleteUserController);

module.exports = router;
