const express = require("express");
const {
  createAuthorController,
  getAllAuthorsController,
  getAuthorByIdController,
  updateAuthorController,
  deleteAuthorController,
} = require("../controllers/author.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authenticate, authorize(["admin"]), createAuthorController);

router.get("/", authenticate, getAllAuthorsController);
router.get("/:id", authenticate, getAuthorByIdController);

router.put("/:id", authenticate, authorize(["admin"]), updateAuthorController);

router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  deleteAuthorController
);

module.exports = router;
