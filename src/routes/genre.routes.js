const express = require("express");
const {
  createGenreController,
  getAllGenresController,
  getGenreByIdController,
  updateGenreController,
  deleteGenreController,
} = require("../controllers/genre.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authenticate, authorize(["admin"]), createGenreController);

router.get("/", authenticate, getAllGenresController);
router.get("/:id", authenticate, getGenreByIdController);

router.put("/:id", authenticate, authorize(["admin"]), updateGenreController);

router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  deleteGenreController
);

module.exports = router;
