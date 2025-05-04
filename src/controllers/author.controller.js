const HttpStatus = require("http-status");
const { successResponse, errorResponse } = require("../utils/response");
const {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../services/author.service");
const {
  createAuthorSchema,
  updateAuthorSchema,
} = require("../validations/author.validation");

const createAuthorController = async (req, res) => {
  try {
    const { error } = createAuthorSchema.validate(req.body);
    if (error) {
      return errorResponse(
        res,
        HttpStatus.BAD_REQUEST,
        "Validation failed",
        error.details
      );
    }

    const authorData = req.body;
    await createAuthor(authorData);

    successResponse(res, HttpStatus.CREATED, "Author created successfully.");
  } catch (error) {
    errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message ||
        "An unexpected error occurred while creating the author.",
      error
    );
  }
};

const getAllAuthorsController = async (req, res) => {
  try {
    const authors = await getAllAuthors();
    successResponse(res, HttpStatus.OK, authors);
  } catch (error) {
    errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message ||
        "An unexpected error occurred while fetching the authors.",
      error
    );
  }
};

const getAuthorByIdController = async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await getAuthorById(authorId);
    successResponse(res, HttpStatus.OK, author);
  } catch (error) {
    errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message ||
        "An unexpected error occurred while fetching the author.",
      error
    );
  }
};

const updateAuthorController = async (req, res) => {
  try {
    const { error } = updateAuthorSchema.validate(req.body);
    if (error) {
      return errorResponse(
        res,
        HttpStatus.BAD_REQUEST,
        "Validation failed",
        error.details
      );
    }

    const authorId = req.params.id;
    const authorData = req.body;
    await updateAuthor(authorId, authorData);

    successResponse(res, HttpStatus.OK, "Author updated successfully.");
  } catch (error) {
    errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message ||
        "An unexpected error occurred while updating the author.",
      error
    );
  }
};

const deleteAuthorController = async (req, res) => {
  try {
    const authorId = req.params.id;
    await deleteAuthor(authorId);

    successResponse(res, HttpStatus.OK, "Author deleted successfully.");
  } catch (error) {
    errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      error.message ||
        "An unexpected error occurred while deleting the author.",
      error
    );
  }
};

module.exports = {
  createAuthorController,
  getAllAuthorsController,
  getAuthorByIdController,
  updateAuthorController,
  deleteAuthorController,
};
