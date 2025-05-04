const HttpStatus = require("http-status");
const {
  createGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
} = require("../services/genre.service");
const { successResponse, errorResponse } = require("../utils/response");
const {
  createGenreSchema,
  updateGenreSchema,
} = require("../validations/genre.validation");

const createGenreController = async (req, res) => {
  try {
    const { error } = createGenreSchema.validate(req.body);
    if (error) {
      return errorResponse(
        res,
        HttpStatus.BAD_REQUEST,
        "Validation failed",
        error.details
      );
    }

    const genreData = req.body;
    await createGenre(genreData);

    return successResponse(
      res,
      HttpStatus.CREATED,
      "Genre created successfully."
    );
  } catch (error) {
    return errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message || "An unexpected error occurred while creating the genre.",
      error
    );
  }
};

const getAllGenresController = async (req, res) => {
  try {
    const genres = await getAllGenres();
    return successResponse(res, HttpStatus.OK, genres);
  } catch (error) {
    return errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message ||
        "An unexpected error occurred while fetching the genres.",
      error
    );
  }
};

const getGenreByIdController = async (req, res) => {
  try {
    const genreId = req.params.id;
    const genre = await getGenreById(genreId);

    return successResponse(res, HttpStatus.OK, genre);
  } catch (error) {
    return errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message || "An unexpected error occurred while fetching the genre.",
      error
    );
  }
};

const updateGenreController = async (req, res) => {
  try {
    const { error } = updateGenreSchema.validate(req.body);
    if (error) {
      return errorResponse(
        res,
        HttpStatus.BAD_REQUEST,
        "Validation failed",
        error.details
      );
    }

    const genreId = req.params.id;
    const genreData = req.body;

    await updateGenre(genreId, genreData);

    return successResponse(res, HttpStatus.OK, "Genre updated successfully.");
  } catch (error) {
    return errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message || "An unexpected error occurred while updating the genre.",
      error
    );
  }
};

const deleteGenreController = async (req, res) => {
  try {
    const genreId = req.params.id;
    await deleteGenre(genreId);

    return successResponse(res, HttpStatus.OK, "Genre deleted successfully.");
  } catch (error) {
    return errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message || "An unexpected error occurred while deleting the genre.",
      error
    );
  }
};

module.exports = {
  createGenreController,
  getAllGenresController,
  getGenreByIdController,
  updateGenreController,
  deleteGenreController,
};
