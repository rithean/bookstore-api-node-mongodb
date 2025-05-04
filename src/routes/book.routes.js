const express = require("express");

const {
  createBookController,
  getAllBooksController,
  getBookByIdController,
  updateBookController,
  deletBookController,
} = require("../controllers/book.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authenticate, authorize(["admin"]), createBookController);

router.get("/", authenticate, getAllBooksController);
router.get("/:id", authenticate, getBookByIdController);

router.put("/:id", authenticate, authorize(["admin"]), updateBookController);

router.delete("/:id", authenticate, authorize(["admin"]), deletBookController);

module.exports = router;
